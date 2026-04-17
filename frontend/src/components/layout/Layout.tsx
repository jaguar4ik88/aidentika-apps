import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Moon, Sun } from 'lucide-react'
import { useLocalePrefix } from '../../hooks/useLocalePrefix'
import { homeSectionHref, languageSwitchPaths } from '../../utils/paths'

const COMPANY_NAME = 'Aidentika Apps'
const [brandFirst, ...brandRestParts] = COMPANY_NAME.split(' ')
const brandRest = brandRestParts.join(' ')

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  const { t } = useTranslation()
  const [isDark, setIsDark] = useState(true)
  const location = useLocation()
  const prefix = useLocalePrefix()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  const homePath = prefix || '/'
  const { ukPath, enPath } = languageSwitchPaths(location.pathname)

  return (
    <div className="relative flex min-h-screen flex-col bg-[rgb(var(--color-bg))]">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-indigo-500/10 via-slate-950 to-slate-950" />
      <header className="sticky top-0 z-20 border-b border-white/5 bg-slate-950/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 lg:px-0">
          <Link to={homePath} className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white shadow-lg shadow-indigo-500/40">
              <span className="text-sm font-semibold tracking-tight">AA</span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-medium tracking-[0.18em] text-slate-400">
                {brandFirst.toUpperCase()}
              </span>
              <span className="text-base font-semibold text-slate-50">
                {brandRest}
              </span>
            </div>
          </Link>
          <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            <NavItem to={homeSectionHref(prefix, 'services')}>
              {t('layout.navServices')}
            </NavItem>
            <NavItem to={homeSectionHref(prefix, 'products')}>
              {t('layout.navProducts')}
            </NavItem>
            <NavItem to={homeSectionHref(prefix, 'about')}>
              {t('layout.navAbout')}
            </NavItem>
            <NavItem to={`${prefix}/blog`}>{t('layout.navBlog')}</NavItem>
            <NavItem to={homeSectionHref(prefix, 'contact')}>
              {t('layout.navContact')}
            </NavItem>
          </nav>
          <div className="flex items-center gap-2 md:gap-3">
            <div className="flex items-center rounded-full border border-white/10 bg-slate-900/60 p-0.5 text-[11px] font-medium">
              <Link
                to={ukPath}
                className={`rounded-full px-2 py-1 ${!prefix ? 'bg-indigo-500/30 text-white' : 'text-slate-400 hover:text-slate-200'}`}
              >
                {t('layout.langUk')}
              </Link>
              <Link
                to={enPath}
                className={`rounded-full px-2 py-1 ${prefix ? 'bg-indigo-500/30 text-white' : 'text-slate-400 hover:text-slate-200'}`}
              >
                {t('layout.langEn')}
              </Link>
            </div>
            <button
              type="button"
              aria-label={t('layout.themeToggle')}
              onClick={() => setIsDark((prev) => !prev)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-slate-900/60 text-slate-300 shadow-sm shadow-black/40 transition hover:border-indigo-400/60 hover:text-indigo-300"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <Link
              to={homeSectionHref(prefix, 'contact')}
              className="hidden rounded-full bg-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-indigo-500/50 transition hover:bg-indigo-400 md:inline-flex"
            >
              {t('layout.ctaProject')}
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-10 lg:px-0 lg:py-16">
          {children}
        </div>
      </main>

      <footer className="border-t border-white/5 bg-slate-950/80">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-3 px-4 py-6 text-xs text-slate-400 lg:flex-row lg:px-0">
          <span>
            © {new Date().getFullYear()} {COMPANY_NAME}
          </span>
          <span>{t('layout.footerTagline')}</span>
        </div>
      </footer>
    </div>
  )
}

interface NavItemProps {
  to: string
  children: ReactNode
}

function NavItem({ to, children }: NavItemProps) {
  const isHashLink = to.includes('#')

  const className =
    'relative text-sm text-slate-300 transition hover:text-indigo-300 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-gradient-to-r after:from-indigo-400 after:to-fuchsia-400 after:transition-all hover:after:w-full'

  if (isHashLink) {
    return (
      <a href={to} className={className}>
        {children}
      </a>
    )
  }

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? `${className} text-indigo-300` : className
      }
    >
      {children}
    </NavLink>
  )
}
