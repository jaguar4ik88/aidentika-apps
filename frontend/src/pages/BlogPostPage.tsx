import { useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { useTranslation } from 'react-i18next'
import { usePost } from '../hooks/usePosts'

export function BlogPostPage() {
  const { t } = useTranslation()
  const { slug } = useParams<{ slug: string }>()
  const { data, loading, error } = usePost(slug)

  return (
    <section className="space-y-6">
      {loading && (
        <div className="space-y-3">
          <div className="h-8 w-2/3 animate-pulse rounded bg-slate-800" />
          <div className="space-y-2">
            <div className="h-3 w-full animate-pulse rounded bg-slate-800" />
            <div className="h-3 w-11/12 animate-pulse rounded bg-slate-800" />
            <div className="h-3 w-10/12 animate-pulse rounded bg-slate-800" />
          </div>
        </div>
      )}
      {!loading && error && (
        <p className="text-sm text-amber-300">{t(error)}</p>
      )}
      {!loading && !error && data && (
        <>
          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
              {t('blog.postEyebrow')}
            </p>
            <h1 className="text-2xl font-semibold text-slate-50 sm:text-3xl">
              {data.title}
            </h1>
            {data.excerpt && (
              <p className="text-sm text-slate-300">{data.excerpt}</p>
            )}
          </div>
          <article className="prose prose-invert max-w-none prose-headings:text-slate-50 prose-p:text-slate-200 prose-strong:text-slate-50 prose-a:text-indigo-300">
            <ReactMarkdown>{data.content}</ReactMarkdown>
          </article>
        </>
      )}
    </section>
  )
}
