import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'

/** '' for Ukrainian routes, '/en' for English */
export function useLocalePrefix(): string {
  const { pathname } = useLocation()
  return useMemo(() => (pathname.startsWith('/en') ? '/en' : ''), [pathname])
}

export function useLocaleLang(): 'uk' | 'en' {
  const { pathname } = useLocation()
  return pathname.startsWith('/en') ? 'en' : 'uk'
}
