import {
  ArrowRight,
  Brain,
  Code2,
  LineChart,
  Sparkles,
  Smartphone,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useProducts } from '../hooks/useProducts'
import { useAbout } from '../hooks/useAbout'
import { apiClient } from '../api/client'
import { useLocalePrefix } from '../hooks/useLocalePrefix'
import { useState } from 'react'
import type { FormEvent } from 'react'

export function HomePage() {
  return (
    <div className="space-y-24">
      <HeroSection />
      <ServicesSection />
      <ProductsSection />
      <AboutSection />
      <BlogPreviewSection />
      <ContactSection />
    </div>
  )
}

function HeroSection() {
  const { t } = useTranslation()
  const company = t('companyName')

  return (
    <section className="grid gap-10 md:grid-cols-[3fr,2fr] md:items-center">
      <div className="space-y-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/70 px-3 py-1 text-xs text-slate-300 shadow-sm shadow-black/40">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500/80 text-[10px] font-semibold text-white">
            AI
          </span>
          <span className="font-medium tracking-wide">
            {t('home.hero.badge', { company })}
          </span>
        </div>
        <div className="space-y-5">
          <h1 className="text-balance text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl lg:text-5xl">
            {t('home.hero.title')}
          </h1>
          <p className="max-w-xl text-pretty text-sm leading-relaxed text-slate-300 sm:text-base">
            {t('home.hero.subtitle')}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-indigo-500 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-indigo-500/50 transition hover:bg-indigo-400"
          >
            {t('home.hero.ctaPrimary')}
            <ArrowRight size={16} />
          </a>
          <a
            href="#products"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-slate-900/70 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-indigo-400/70 hover:text-indigo-300"
          >
            {t('home.hero.ctaSecondary')}
          </a>
        </div>
        <div className="flex flex-wrap gap-4 text-xs text-slate-400">
          <FeaturePill>{t('home.hero.pill1')}</FeaturePill>
          <FeaturePill>{t('home.hero.pill2')}</FeaturePill>
          <FeaturePill>{t('home.hero.pill3')}</FeaturePill>
        </div>
      </div>

      <div className="relative">
        <div className="glass-surface relative overflow-hidden p-6">
          <div className="mb-6 flex items-center justify-between gap-4 text-xs text-slate-300">
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-900/80 px-3 py-1">
              <Sparkles size={14} className="text-indigo-300" />
              {t('home.hero.cardPipeline')}
            </span>
            <span className="text-[11px] text-slate-400">
              {t('home.hero.cardStack')}
            </span>
          </div>
          <div className="grid gap-4 text-xs text-slate-200">
            <div className="card-elevated flex items-center justify-between gap-4 p-4">
              <div className="space-y-1">
                <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
                  {t('home.hero.discovery')}
                </p>
                <p className="text-sm font-medium">{t('home.hero.discoveryTitle')}</p>
              </div>
              <div className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-300">
                {t('home.hero.live')}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="card-elevated space-y-3 p-4">
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-300">
                  <Smartphone size={18} />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-slate-100">
                    {t('home.hero.mobileTitle')}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    {t('home.hero.mobileDesc')}
                  </p>
                </div>
              </div>
              <div className="card-elevated space-y-3 p-4">
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-fuchsia-500/15 text-fuchsia-300">
                  <Brain size={18} />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-slate-100">
                    {t('home.hero.aiTitle')}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    {t('home.hero.aiDesc')}
                  </p>
                </div>
              </div>
            </div>
            <div className="card-elevated flex items-center justify-between gap-4 p-4">
              <div className="space-y-1">
                <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
                  {t('home.hero.growth')}
                </p>
                <p className="text-xs text-slate-200">
                  {t('home.hero.growthDesc')}
                </p>
              </div>
              <LineChart size={20} className="text-emerald-300" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function FeaturePill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-slate-900/50 px-3 py-1">
      <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-indigo-400 to-fuchsia-400" />
      <span>{children}</span>
    </span>
  )
}

function ServicesSection() {
  const { t } = useTranslation()
  const icons = [Smartphone, Code2, Brain, Sparkles]
  const items = t('home.services.items', {
    returnObjects: true,
  }) as { title: string; description: string }[]

  return (
    <section id="services" className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-50 sm:text-xl">
            {t('home.services.title')}
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            {t('home.services.subtitle')}
          </p>
        </div>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {items.map((service, index) => {
          const Icon = icons[index] ?? Smartphone
          return (
            <article
              key={service.title}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/60 p-[1px] transition hover:border-indigo-400/70"
            >
              <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-indigo-500/25 via-transparent to-fuchsia-500/20 opacity-0 transition group-hover:opacity-100" />
              <div className="relative flex h-full flex-col gap-4 rounded-[1rem] bg-slate-950/80 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-indigo-500/15 text-indigo-300">
                    <Icon size={18} />
                  </div>
                  <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-[11px] font-medium text-emerald-300">
                    {t('home.services.badge')}
                  </span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-slate-50">
                    {service.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-slate-300">
                    {service.description}
                  </p>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

function ProductsSection() {
  const { t } = useTranslation()
  const company = t('companyName')
  const { data, loading, error } = useProducts()

  return (
    <section id="products" className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-50 sm:text-xl">
            {t('home.products.title', { company })}
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            {t('home.products.subtitle')}
          </p>
        </div>
      </div>
      {loading && (
        <div className="grid gap-5 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="h-40 animate-pulse rounded-2xl border border-white/10 bg-slate-950/60"
            />
          ))}
        </div>
      )}
      {!loading && error && (
        <p className="text-xs text-amber-300">{t(error)}</p>
      )}
      {!loading && !error && data && (
        <div className="grid gap-5 md:grid-cols-3">
          {data.map((product) => (
            <article
              key={product.id}
              className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-slate-950/70 p-4 shadow-[0_18px_40px_rgba(15,23,42,0.7)] transition hover:-translate-y-1 hover:border-indigo-400/70 hover:shadow-[0_24px_60px_rgba(30,64,175,0.85)]"
            >
              <div className="space-y-3">
                <p className="text-xs font-medium text-indigo-300">
                  {product.subtitle || t('home.products.subtitleFallback')}
                </p>
                <h3 className="text-sm font-semibold text-slate-50">
                  {product.title}
                </h3>
                {product.short_description && (
                  <p className="text-xs leading-relaxed text-slate-300">
                    {product.short_description}
                  </p>
                )}
              </div>
              <div className="mt-4 flex items-center justify-between text-xs">
                <StatusBadge
                  status={
                    product.status === 'coming_soon' ? 'coming_soon' : 'active'
                  }
                />
                <span className="text-[11px] text-slate-400">
                  {t('home.products.apiTag')}
                </span>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

function StatusBadge({ status }: { status: 'active' | 'coming_soon' }) {
  const { t } = useTranslation()
  if (status === 'active') {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-300">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        {t('home.products.statusActive')}
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-1 text-[11px] font-medium text-amber-300">
      <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
      {t('home.products.statusSoon')}
    </span>
  )
}

function AboutSection() {
  const { t } = useTranslation()
  const company = t('companyName')
  const { data, loading, error } = useAbout()

  return (
    <section id="about" className="grid gap-8 md:grid-cols-[3fr,2fr] md:items-center">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-50 sm:text-xl">
          {data?.headline || t('home.about.headlineFallback')}
        </h2>
        <p className="text-sm leading-relaxed text-slate-300">
          {data?.subheadline ||
            t('home.about.subheadlineFallback', { company })}
        </p>
        {data?.content && (
          <p className="text-sm leading-relaxed text-slate-300">
            {data.content}
          </p>
        )}
        <div className="grid gap-3 text-xs text-slate-300 sm:grid-cols-3">
          <Kpi label={t('home.about.kpi1Label')} value={t('home.about.kpi1Value')} />
          <Kpi label={t('home.about.kpi2Label')} value={t('home.about.kpi2Value')} />
          <Kpi label={t('home.about.kpi3Label')} value={t('home.about.kpi3Value')} />
        </div>
      </div>
      <div className="card-elevated space-y-4 p-5">
        <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
          {t('home.about.approach')}
        </p>
        {loading && (
          <p className="text-xs text-slate-400">{t('home.about.loading')}</p>
        )}
        {!loading && error && (
          <p className="text-xs text-amber-300">{t(error)}</p>
        )}
        {!loading && !error && (
          <ul className="space-y-3 text-xs text-slate-300">
            <li>{t('home.about.bullet1')}</li>
            <li>{t('home.about.bullet2')}</li>
            <li>{t('home.about.bullet3')}</li>
            <li>{t('home.about.bullet4')}</li>
          </ul>
        )}
      </div>
    </section>
  )
}

function Kpi({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-950/70 p-3">
      <p className="text-[11px] text-slate-400">{label}</p>
      <p className="mt-1 text-xs font-semibold text-slate-50">{value}</p>
    </div>
  )
}

function BlogPreviewSection() {
  const { t } = useTranslation()
  const prefix = useLocalePrefix()

  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-50 sm:text-xl">
            {t('home.blogPreview.title')}
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            {t('home.blogPreview.subtitle')}
          </p>
        </div>
        <Link
          to={`${prefix}/blog`}
          className="hidden items-center gap-2 text-xs font-medium text-indigo-300 hover:text-indigo-200 md:inline-flex"
        >
          {t('home.blogPreview.link')}
          <ArrowRight size={14} />
        </Link>
      </div>
      <div className="rounded-2xl border border-dashed border-white/15 bg-slate-950/60 p-5 text-xs text-slate-400">
        {t('home.blogPreview.placeholder')}
      </div>
    </section>
  )
}

function ContactSection() {
  const { t } = useTranslation()

  return (
    <section id="contact" className="grid gap-8 md:grid-cols-[3fr,2fr] md:items-start">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-50 sm:text-xl">
          {t('home.contact.title')}
        </h2>
        <p className="text-sm text-slate-300">
          {t('home.contact.subtitle')}
        </p>
        <ContactForm />
      </div>
      <div className="space-y-3 text-xs text-slate-300">
        <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
          {t('home.contact.format')}
        </p>
        <ul className="space-y-2">
          <li>{t('home.contact.format1')}</li>
          <li>{t('home.contact.format2')}</li>
          <li>{t('home.contact.format3')}</li>
        </ul>
      </div>
    </section>
  )
}

function ContactForm() {
  const { t } = useTranslation()
  const company = t('companyName')
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setSubmitting(true)
    setSuccess(null)
    setError(null)

    try {
      const response = await apiClient.post<{ message?: string }>('/contact', form)
      setSuccess(
        response.data?.message ?? t('home.contact.success'),
      )
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Failed to send contact form', err)
      setError(t('home.contact.error'))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form
      className="space-y-3 rounded-2xl border border-white/10 bg-slate-950/70 p-4 shadow-[0_18px_40px_rgba(15,23,42,0.7)]"
      onSubmit={handleSubmit}
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label htmlFor="name" className="text-xs text-slate-200">
            {t('home.contact.formName')}
          </label>
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="h-9 w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 text-xs text-slate-100 outline-none ring-0 transition placeholder:text-slate-500 focus:border-indigo-400/80"
            placeholder={t('home.contact.placeholderName')}
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="email" className="text-xs text-slate-200">
            {t('home.contact.formEmail')}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className="h-9 w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 text-xs text-slate-100 outline-none ring-0 transition placeholder:text-slate-500 focus:border-indigo-400/80"
            placeholder="founder@company.com"
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <label htmlFor="message" className="text-xs text-slate-200">
          {t('home.contact.formMessage')}
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2 text-xs text-slate-100 outline-none ring-0 transition placeholder:text-slate-500 focus:border-indigo-400/80"
          placeholder={t('home.contact.placeholderMessage', { company })}
        />
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-indigo-500 px-4 py-2.5 text-xs font-medium text-white shadow-lg shadow-indigo-500/50 transition hover:bg-indigo-400"
      >
        {submitting ? t('home.contact.submitting') : t('home.contact.submit')}
        <ArrowRight size={14} />
      </button>
      {success && (
        <p className="text-[11px] text-emerald-300">
          {success}
        </p>
      )}
      {error && (
        <p className="text-[11px] text-amber-300">
          {error}
        </p>
      )}
    </form>
  )
}
