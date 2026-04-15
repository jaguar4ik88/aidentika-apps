import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <section className="flex flex-col items-center justify-center gap-6 py-16 text-center">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
        404 · Страница не найдена
      </p>
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold text-slate-50 sm:text-4xl">
          Ничего не нашли по этому адресу
        </h1>
        <p className="max-w-md text-sm text-slate-300">
          Возможно, страница была перемещена или URL введён с опечаткой.
          Вернитесь на главную и начните с описания вашего продукта.
        </p>
      </div>
      <Link
        to="/"
        className="inline-flex items-center gap-2 rounded-full bg-indigo-500 px-5 py-2.5 text-xs font-medium text-white shadow-lg shadow-indigo-500/50 transition hover:bg-indigo-400"
      >
        На главную
      </Link>
    </section>
  )
}

