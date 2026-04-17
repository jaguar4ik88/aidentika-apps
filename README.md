## Aidentika Apps – AI‑Driven Mobile & SaaS Studio Website

Monorepo with a **Laravel 11 API backend** and a **React 18 + Vite + Tailwind frontend** for the Aidentika Apps corporate site.

### Backend (Laravel 11)

- **Tech**: PHP 8.2+, Laravel 11, SQLite (dev by default).
- **API endpoints**:
  - `GET /api/products` – список продуктов со статусами (active / coming_soon).
  - `GET /api/about` – контент блока «О студии».
  - `GET /api/posts` – список опубликованных постов блога.
  - `GET /api/posts/{slug}` – отдельный пост по slug.
  - `POST /api/contact` – контактная форма (валидация + отправка email).
- **Модели и миграции**:
  - `Product` – title, slug, subtitle, status, short_description, meta (JSON).
  - `Post` – title, slug, excerpt, content (markdown), published_at, is_published.
  - `Category` – name, slug, description, pivot `category_post`.
  - `About` – headline, subheadline, content (markdown), meta (JSON).
- **Фичи**:
  - FormRequest‑валидация для `ContactRequest`.
  - Rate limiting: общий `throttle:60,1` на API и `throttle:10,1` для контакта.
  - CORS для путей `api/*` (по умолчанию `allowed_origins: ['*']`).

#### Backend – запуск

```bash
cd backend
cp .env.example .env
php artisan key:generate
# по умолчанию используется SQLite database/database.sqlite
php artisan migrate
php artisan serve --host=127.0.0.1 --port=8000
```

### Frontend (React 18 + Vite + Tailwind)

- **Tech**: React 18, Vite, TypeScript, Tailwind, Axios, React Router.
- **Структура**:
  - `src/components/layout/Layout.tsx` – общий лейаут, навигация, переключатель темы.
  - `src/pages/HomePage.tsx` – лендинг: Hero, Services, Products, About, Blog preview, Contact.
  - `src/pages/BlogListPage.tsx` – список статей блога.
  - `src/pages/BlogPostPage.tsx` – отдельная статья (markdown‑рендеринг).
  - `src/pages/NotFoundPage.tsx` – 404.
  - `src/api/client.ts` – Axios‑клиент с базовым URL из env.
  - `src/hooks/useProducts.ts`, `useAbout.ts`, `usePosts.ts` – хуки для работы с API.
- **UI / UX**:
  - Современный тёмный дизайн, стеклянные панели, крупная типографика.
  - Все ключевые цвета/радиусы/тени вынесены в CSS‑переменные в `src/index.css`.
  - Переключение **dark/light** через класс `.dark` на `<html>`.
  - Лоадеры / skeleton‑ы и сообщения об ошибках на ключевых экранах.

#### Frontend – запуск

```bash
cd frontend
cp .env.example .env
# при необходимости отредактируйте VITE_API_URL
npm install
npm run dev -- --host
```

По умолчанию фронт ожидает API по адресу:

```env
VITE_API_URL=http://127.0.0.1:8000/api
```

### Admin (Filament)

- Установлен **Filament 3** и панель `AdminPanelProvider`.
- CRUD‑ресурсы:
  - `ProductResource` – управление продуктами.
  - `PostResource` – посты блога (markdown‑контент, published_at, is_published).
  - `CategoryResource` – категории блога.
  - `AboutResource` – редактирование блока «О студии».
- Доступ в админку:
  - Создайте пользователя и отметьте его как Filament‑пользователя.
  - Затем заходите по стандартному пути панели (например, `/admin`).

### Деплой на хостинг

- Скрипт: **`scripts/deploy-hosting.sh`** — rsync по SSH после `npm run build`.
- **GitHub Actions:** workflow **`.github/workflows/deploy.yml`** — запускается при пуше в **`main`** и вручную (**Actions → Deploy → Run workflow**). Добавьте в репозиторий **Secrets**:
  - `DEPLOY_USER`, `DEPLOY_HOST`, `DEPLOY_PATH`, `DEPLOY_SSH_KEY` (PEM целиком);
  - **`VITE_API_URL`** — URL продакшен API для сборки (например `https://aidentika.com.ua/api`). Локальный `frontend/.env` **в CI не виден** — задайте тот же URL в **GitHub → Settings → Secrets and variables** как **Secret** `VITE_API_URL` или **Variable** `VITE_API_URL`.
- Локально в `DEPLOY_SSH_KEY` можно указать путь к файлу ключа.
- Подробности: **`DEPLOY.md`** (если копируете локально — файл может быть в `.gitignore`).

### Будущее расширение

- Лёгкое добавление аутентификации (Laravel Breeze / Sanctum, защищённые маршруты).
- Личный кабинет клиентов и SaaS‑модули поверх существующего API.
- Подключение мобильных приложений (React Native / нативные) к тому же API.
- Интеграция AI‑микросервисов (через отдельные endpoints или очереди) без изменений фронта.

