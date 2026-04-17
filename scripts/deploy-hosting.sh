#!/usr/bin/env bash
# Деплой Aidentika Apps: сборка фронта и rsync по SSH.
#
# Рекомендуемые переменные (CI/GitHub Actions secrets → env):
#   DEPLOY_USER      — SSH user (например ubuntu, deploy)
#   DEPLOY_HOST      — хост или IP сервера
#   DEPLOY_PATH      — корень на сервере (например /var/www/aidentika)
#   DEPLOY_SSH_KEY   — приватный ключ (PEM целиком) ИЛИ путь к файлу ключа на диске
#
# Опционально:
#   VITE_API_URL     — для продакшен-сборки фронта (если не задан в frontend/.env)
#
# Устаревшие имена (всё ещё работают):
#   DEPLOY_SSH         = user@host (если не заданы DEPLOY_USER + DEPLOY_HOST)
#   DEPLOY_REMOTE_ROOT = то же, что DEPLOY_PATH
#
# Пример локально:
#   export DEPLOY_USER=deploy DEPLOY_HOST=example.com DEPLOY_PATH=/var/www/app
#   export DEPLOY_SSH_KEY=~/.ssh/id_ed25519
#   ./scripts/deploy-hosting.sh

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

VITE_API_URL="${VITE_API_URL:-}"

# --- SSH target и путь на сервере ---
if [[ -n "${DEPLOY_USER:-}" && -n "${DEPLOY_HOST:-}" && -n "${DEPLOY_PATH:-}" ]]; then
  RSYNC_TARGET="${DEPLOY_USER}@${DEPLOY_HOST}"
  REMOTE_ROOT="${DEPLOY_PATH}"
elif [[ -n "${DEPLOY_SSH:-}" && -n "${DEPLOY_REMOTE_ROOT:-}" ]]; then
  RSYNC_TARGET="${DEPLOY_SSH}"
  REMOTE_ROOT="${DEPLOY_REMOTE_ROOT}"
else
  echo "Задайте либо: DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH" >&2
  echo "либо (legacy): DEPLOY_SSH и DEPLOY_REMOTE_ROOT" >&2
  exit 1
fi

# --- rsync через ssh: опционально ключ из DEPLOY_SSH_KEY ---
RSYNC_RSH=(ssh -o StrictHostKeyChecking=accept-new -o IdentitiesOnly=yes)
_cleanup_key() { [[ -n "${_DEPLOY_KEY_TMP:-}" && -f "${_DEPLOY_KEY_TMP:-}" ]] && rm -f "${_DEPLOY_KEY_TMP}"; }
trap _cleanup_key EXIT

if [[ -n "${DEPLOY_SSH_KEY:-}" ]]; then
  if [[ -f "${DEPLOY_SSH_KEY}" ]]; then
    RSYNC_RSH+=( -i "${DEPLOY_SSH_KEY}" )
  else
    _DEPLOY_KEY_TMP="$(mktemp "${TMPDIR:-/tmp}/deploy_key.XXXXXX")"
    chmod 600 "${_DEPLOY_KEY_TMP}"
    printf '%s\n' "${DEPLOY_SSH_KEY}" > "${_DEPLOY_KEY_TMP}"
    RSYNC_RSH+=( -i "${_DEPLOY_KEY_TMP}" )
  fi
fi

echo "==> Сборка фронтенда"
cd "$ROOT/frontend"
if [[ -n "${VITE_API_URL}" ]]; then
  export VITE_API_URL
fi
if [[ ! -f .env ]]; then
  if [[ -z "${VITE_API_URL:-}" ]]; then
    echo "Нет frontend/.env и не задан VITE_API_URL — создайте .env из .env.example или экспортируйте VITE_API_URL (в CI добавьте secret)." >&2
    exit 1
  fi
  echo "(CI) сборка без frontend/.env, используется VITE_API_URL из окружения"
fi
npm ci
npm run build

echo "==> Загрузка статики фронта (dist -> ${RSYNC_TARGET}:${REMOTE_ROOT}/frontend)"
rsync -avz --delete \
  -e "${RSYNC_RSH[*]}" \
  "$ROOT/frontend/dist/" \
  "${RSYNC_TARGET}:${REMOTE_ROOT}/frontend/"

echo "==> Синхронизация бэкенда (без vendor, .env, node_modules)"
rsync -avz \
  -e "${RSYNC_RSH[*]}" \
  --exclude 'vendor' \
  --exclude 'node_modules' \
  --exclude '.env' \
  --exclude 'storage/logs/*' \
  --exclude 'storage/framework/cache/*' \
  --exclude 'storage/framework/sessions/*' \
  --exclude 'storage/framework/views/*' \
  --exclude 'bootstrap/cache/*.php' \
  --exclude 'database/*.sqlite*' \
  "$ROOT/backend/" \
  "${RSYNC_TARGET}:${REMOTE_ROOT}/backend/"

echo "==> Готово. На сервере выполните (после деплоя при необходимости):"
cat <<EOF

  ssh ${RSYNC_TARGET}
  cd ${REMOTE_ROOT}/backend
  composer install --no-dev --optimize-autoloader
  php artisan migrate --force
  php artisan storage:link
  php artisan config:cache
  php artisan route:cache
  php artisan view:cache
  chmod -R ug+rwx storage bootstrap/cache

EOF
