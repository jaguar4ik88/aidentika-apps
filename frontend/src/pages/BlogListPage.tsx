import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { usePosts } from '../hooks/usePosts'
import { useLocalePrefix } from '../hooks/useLocalePrefix'

export function BlogListPage() {
  const { t } = useTranslation()
  const prefix = useLocalePrefix()
  const { data, loading, error } = usePosts()

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
          {t('blog.listEyebrow')}
        </p>
        <h1 className="text-2xl font-semibold text-slate-50 sm:text-3xl">
          {t('blog.listTitle')}
        </h1>
        <p className="max-w-2xl text-sm text-slate-300">
          {t('blog.listSubtitle')}
        </p>
      </header>
      {loading && (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="h-20 animate-pulse rounded-2xl border border-white/10 bg-slate-950/60"
            />
          ))}
        </div>
      )}
      {!loading && error && (
        <p className="text-sm text-amber-300">{t(error)}</p>
      )}
      {!loading && !error && (!data || data.length === 0) && (
        <div className="rounded-2xl border border-dashed border-white/15 bg-slate-950/60 p-5 text-sm text-slate-300">
          {t('blog.empty')}
        </div>
      )}
      {!loading && !error && data && data.length > 0 && (
        <div className="space-y-4">
          {data.map((post) => (
            <article
              key={post.id}
              className="rounded-2xl border border-white/10 bg-slate-950/70 p-4 transition hover:border-indigo-400/70"
            >
              <Link
                to={`${prefix}/blog/${post.slug}`}
                className="space-y-2"
              >
                <h2 className="text-sm font-semibold text-slate-50">
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="text-xs text-slate-300">{post.excerpt}</p>
                )}
              </Link>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
