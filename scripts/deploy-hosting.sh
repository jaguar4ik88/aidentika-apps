#!/usr/bin/env bash
# Деплой Aidentika Apps: сборка фронта и синхронизация с сервером по SSH/rsync.
# Настройте переменные ниже или передайте через окружение перед запуском.
#
# Пример:
#   export DEPLOY_SSH="user@your-server.example"
#   export DEPLOY_REMOTE_ROOT="/var/www/aidentika"
#   export VITE_API_URL="https://api.example.com/api"
#   ./scripts/deploy-hosting.sh

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

DEPLOY_SSH="${DEPLOY_SSH:-}"
DEPLOY_REMOTE_ROOT="${DEPLOY_REMOTE_ROOT:-}"
VITE_API_URL="${VITE_API_URL:-}"

if [[ -z "${DEPLOY_SSH}" || -z "${DEPLOY_REMOTE_ROOT}" ]]; then
  echo "Задайте DEPLOY_SSH и DEPLOY_REMOTE_ROOT (см. DEPLOY.example.md или DEPLOY.md)." >&2
  exit 1
fi

echo "==> Сборка фронтенда"
cd "$ROOT/frontend"
if [[ -n "${VITE_API_URL}" ]]; then
  export VITE_API_URL
fi
if [[ ! -f .env ]]; then
  echo "Нет frontend/.env — создайте из .env.example и задайте VITE_API_URL для продакшена." >&2
  exit 1
fi
npm ci
npm run build

echo "==> Загрузка статики фронта (dist -> ${DEPLOY_SSH}:${DEPLOY_REMOTE_ROOT}/frontend)"
rsync -avz --delete \
  -e ssh \
  "$ROOT/frontend/dist/" \
  "${DEPLOY_SSH}:${DEPLOY_REMOTE_ROOT}/frontend/"

echo "==> Синхронизация бэкенда (без vendor, .env, node_modules)"
rsync -avz \
  -e ssh \
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
  "${DEPLOY_SSH}:${DEPLOY_REMOTE_ROOT}/backend/"

echo "==> Готово. На сервере выполните (один раз после первого деплоя и при обновлениях):"
cat <<EOF

  ssh ${DEPLOY_SSH}
  cd ${DEPLOY_REMOTE_ROOT}/backend
  composer install --no-dev --optimize-autoloader
  php artisan migrate --force
  php artisan storage:link
  php artisan config:cache
  php artisan route:cache
  php artisan view:cache
  chmod -R ug+rwx storage bootstrap/cache

EOF
