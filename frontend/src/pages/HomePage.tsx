import {
  ArrowRight,
  Brain,
  Code2,
  LineChart,
  Sparkles,
  Smartphone,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useProducts } from '../hooks/useProducts'
import { useAbout } from '../hooks/useAbout'
import { apiClient } from '../api/client'
import { useState } from 'react'
import type { FormEvent } from 'react'

const COMPANY_NAME = 'Aidentika Apps'

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
  return (
    <section className="grid gap-10 md:grid-cols-[3fr,2fr] md:items-center">
      <div className="space-y-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/70 px-3 py-1 text-xs text-slate-300 shadow-sm shadow-black/40">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500/80 text-[10px] font-semibold text-white">
            AI
          </span>
          <span className="font-medium tracking-wide">
            {COMPANY_NAME} · Product Studio
          </span>
        </div>
        <div className="space-y-5">
          <h1 className="text-balance text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl lg:text-5xl">
            AI‑Driven Mobile & SaaS Development
          </h1>
          <p className="max-w-xl text-pretty text-sm leading-relaxed text-slate-300 sm:text-base">
            Мы помогаем технологичным компаниям запускать мобильные продукты, SaaS‑платформы
            и AI‑решения — от первого скоупа до масштабирования на десятки тысяч пользователей.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-indigo-500 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-indigo-500/50 transition hover:bg-indigo-400"
          >
            Начать проект
            <ArrowRight size={16} />
          </a>
          <a
            href="#products"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-slate-900/70 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-indigo-400/70 hover:text-indigo-300"
          >
            Посмотреть продукты
          </a>
        </div>
        <div className="flex flex-wrap gap-4 text-xs text-slate-400">
          <FeaturePill>AI‑асистированные мобильные команды</FeaturePill>
          <FeaturePill>Встроенная аналитика и монетизация</FeaturePill>
          <FeaturePill>Готовность к мультиплатформенности</FeaturePill>
        </div>
      </div>

      <div className="relative">
        <div className="glass-surface relative overflow-hidden p-6">
          <div className="mb-6 flex items-center justify-between gap-4 text-xs text-slate-300">
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-900/80 px-3 py-1">
              <Sparkles size={14} className="text-indigo-300" />
              AI product pipeline
            </span>
            <span className="text-[11px] text-slate-400">
              Mobile · SaaS · AI
            </span>
          </div>
          <div className="grid gap-4 text-xs text-slate-200">
            <div className="card-elevated flex items-center justify-between gap-4 p-4">
              <div className="space-y-1">
                <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
                  DISCOVERY
                </p>
                <p className="text-sm font-medium">Product strategy & UX flow</p>
              </div>
              <div className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-300">
                Live
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="card-elevated space-y-3 p-4">
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-300">
                  <Smartphone size={18} />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-slate-100">
                    Mobile & cross‑platform
                  </p>
                  <p className="text-[11px] text-slate-400">
                    React Native, Swift, Kotlin, Expo, Capacitor.
                  </p>
                </div>
              </div>
              <div className="card-elevated space-y-3 p-4">
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-fuchsia-500/15 text-fuchsia-300">
                  <Brain size={18} />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-slate-100">
                    AI‑сценарии по‑умолчанию
                  </p>
                  <p className="text-[11px] text-slate-400">
                    LLM‑агенты, персонализация, генерация контента.
                  </p>
                </div>
              </div>
            </div>
            <div className="card-elevated flex items-center justify-between gap-4 p-4">
              <div className="space-y-1">
                <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
                  GROWTH
                </p>
                <p className="text-xs text-slate-200">
                  А/Б‑тесты, ретеншн, монетизация и метрики.
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
  const services = [
    {
      title: 'Mobile App Development',
      description:
        'Нативные и кросс‑платформенные приложения с продуманным онбордингом, аналитикой и ретеншном.',
      icon: Smartphone,
    },
    {
      title: 'SaaS Platforms',
      description:
        'B2B и B2C SaaS‑продукты с биллингом, ролями, дашбордами и API для партнеров.',
      icon: Code2,
    },
    {
      title: 'AI Integrations',
      description:
        'Интеграция LLM‑моделей, персональных ассистентов и генеративных сценариев в существующие продукты.',
      icon: Brain,
    },
    {
      title: 'E‑commerce Automation',
      description:
        'Автоматизация витрин, ценообразования, UGC‑контента и маркетинга на базе AI‑инструментов.',
      icon: Sparkles,
    },
  ]

  return (
    <section id="services" className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-50 sm:text-xl">
            Что мы делаем
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Концентрируемся на продуктах, где AI и мобильность — ядро, а не надстройка.
          </p>
        </div>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {services.map((service) => (
          <article
            key={service.title}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/60 p-[1px] transition hover:border-indigo-400/70"
          >
            <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-indigo-500/25 via-transparent to-fuchsia-500/20 opacity-0 transition group-hover:opacity-100" />
            <div className="relative flex h-full flex-col gap-4 rounded-[1rem] bg-slate-950/80 p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-indigo-500/15 text-indigo-300">
                  <service.icon size={18} />
                </div>
                <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-[11px] font-medium text-emerald-300">
                  Product‑ready
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
        ))}
      </div>
    </section>
  )
}

function ProductsSection() {
  const { data, loading, error } = useProducts()

  return (
    <section id="products" className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-50 sm:text-xl">
            Продукты {COMPANY_NAME}
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Собственные продукты, которые демонстрируют наш подход к дизайну, AI и мобильным сценариям.
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
        <p className="text-xs text-amber-300">{error}</p>
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
                  {product.subtitle || 'Internal product'}
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
                  API‑first · Multi‑platform
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
  if (status === 'active') {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-300">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        Active product
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-1 text-[11px] font-medium text-amber-300">
      <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
      Coming soon
    </span>
  )
}

function AboutSection() {
  const { data, loading, error } = useAbout()

  return (
    <section id="about" className="grid gap-8 md:grid-cols-[3fr,2fr] md:items-center">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-50 sm:text-xl">
          {data?.headline || 'Студия продуктового уровня'}
        </h2>
        <p className="text-sm leading-relaxed text-slate-300">
          {data?.subheadline ||
            `${COMPANY_NAME} — это небольшая, но опытная команда продакт‑менеджеров, дизайнеров и инженеров, которые работали с международными стартапами и корпоративными командами.`}
        </p>
        {data?.content && (
          <p className="text-sm leading-relaxed text-slate-300">
            {data.content}
          </p>
        )}
        <div className="grid gap-3 text-xs text-slate-300 sm:grid-cols-3">
          <Kpi label="Time‑to‑market" value="6–12 недель" />
          <Kpi label="Platforms" value="Web · iOS · Android" />
          <Kpi label="Focus" value="AI · SaaS · Mobile" />
        </div>
      </div>
      <div className="card-elevated space-y-4 p-5">
        <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
          ПОДХОД
        </p>
        {loading && <p className="text-xs text-slate-400">Загружаем описание...</p>}
        {!loading && error && (
          <p className="text-xs text-amber-300">{error}</p>
        )}
        {!loading && !error && (
          <ul className="space-y-3 text-xs text-slate-300">
            <li>· API‑first архитектура для масштабирования и интеграций.</li>
            <li>· Единый дизайн‑язык между сайтом, админкой и продуктом.</li>
            <li>· Набор готовых модулей: аутентификация, биллинг, админ‑панель, аналитика.</li>
            <li>· Работа по спринтам с прозрачными демо и метриками.</li>
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
  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-50 sm:text-xl">
            Из блога
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Разборы продуктовых запусков, AI‑кейсы и инфраструктура под мобильные продукты.
          </p>
        </div>
        <Link
          to="/blog"
          className="hidden items-center gap-2 text-xs font-medium text-indigo-300 hover:text-indigo-200 md:inline-flex"
        >
          Читать блог
          <ArrowRight size={14} />
        </Link>
      </div>
      <div className="rounded-2xl border border-dashed border-white/15 bg-slate-950/60 p-5 text-xs text-slate-400">
        Блог подключён к API и админ‑панели. После создания первых статей в админке они
        появятся здесь автоматически.
      </div>
    </section>
  )
}

function ContactSection() {
  return (
    <section id="contact" className="grid gap-8 md:grid-cols-[3fr,2fr] md:items-start">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-50 sm:text-xl">
          Обсудить потенциальный проект
        </h2>
        <p className="text-sm text-slate-300">
          Расскажите о задаче, сроках и целевой аудитории — мы вернёмся с первым предложением
          по архитектуре и дорожной карте.
        </p>
        <ContactForm />
      </div>
      <div className="space-y-3 text-xs text-slate-300">
        <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
          Формат работы
        </p>
        <ul className="space-y-2">
          <li>· Discovery‑спринт 1–2 недели.</li>
          <li>· Запуск MVP за 6–12 недель.</li>
          <li>· Поддержка и развитие продукта по подписке.</li>
        </ul>
      </div>
    </section>
  )
}

function ContactForm() {
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
      await apiClient.post('/contact', form)
      setSuccess('Запрос успешно отправлен. Мы вернёмся с ответом в ближайшее время.')
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Failed to send contact form', err)
      setError('Не удалось отправить форму. Попробуйте ещё раз чуть позже.')
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
            Имя
          </label>
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="h-9 w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 text-xs text-slate-100 outline-none ring-0 transition placeholder:text-slate-500 focus:border-indigo-400/80"
            placeholder="Как к вам обращаться?"
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="email" className="text-xs text-slate-200">
            Email
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
          Кратко опишите задачу
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2 text-xs text-slate-100 outline-none ring-0 transition placeholder:text-slate-500 focus:border-indigo-400/80"
          placeholder={`Продукт, сроки, команда, ожидания от ${COMPANY_NAME}...`}
        />
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-indigo-500 px-4 py-2.5 text-xs font-medium text-white shadow-lg shadow-indigo-500/50 transition hover:bg-indigo-400"
      >
        {submitting ? 'Отправляем...' : 'Отправить запрос'}
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

