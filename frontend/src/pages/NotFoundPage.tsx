import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useLocalePrefix } from '../hooks/useLocalePrefix'

export function NotFoundPage() {
  const { t } = useTranslation()
  const prefix = useLocalePrefix()
  const homePath = prefix || '/'

  return (
    <section className="flex flex-col items-center justify-center gap-6 py-16 text-center">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
        {t('notFound.eyebrow')}
      </p>
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold text-slate-50 sm:text-4xl">
          {t('notFound.title')}
        </h1>
        <p className="max-w-md text-sm text-slate-300">
          {t('notFound.subtitle')}
        </p>
      </div>
      <Link
        to={homePath}
        className="inline-flex items-center gap-2 rounded-full bg-indigo-500 px-5 py-2.5 text-xs font-medium text-white shadow-lg shadow-indigo-500/50 transition hover:bg-indigo-400"
      >
        {t('notFound.cta')}
      </Link>
    </section>
  )
}
