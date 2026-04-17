/** Hash link to a section on the localized home page. */
export function homeSectionHref(prefix: string, sectionId: string): string {
  if (!prefix) {
    return `/#${sectionId}`
  }
  return `${prefix}#${sectionId}`
}

/** Same page in Ukrainian vs English (for header language toggle). */
export function languageSwitchPaths(pathname: string): {
  ukPath: string
  enPath: string
} {
  const isEn = pathname === '/en' || pathname.startsWith('/en/')
  if (!isEn) {
    return {
      ukPath: pathname,
      enPath: pathname === '/' ? '/en' : `/en${pathname}`,
    }
  }
  const rest = pathname === '/en' ? '' : pathname.slice(3)
  return {
    ukPath: rest || '/',
    enPath: pathname,
  }
}
