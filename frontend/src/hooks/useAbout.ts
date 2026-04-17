import { useEffect, useState } from 'react'
import { apiClient } from '../api/client'

export interface About {
  id?: number
  headline?: string | null
  subheadline?: string | null
  content?: string | null
}

interface UseAboutState {
  data: About | null
  loading: boolean
  error: string | null
}

export function useAbout(): UseAboutState {
  const [state, setState] = useState<UseAboutState>({
    data: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    let cancelled = false

    setState((s) => ({ ...s, loading: true, error: null }))

    apiClient
      .get<{ data: About }>('/about')
      .then((response) => {
        if (cancelled) return
        const payload =
          (response.data as any)?.data ??
          ((response.data as any) as About)

        setState({ data: payload, loading: false, error: null })
      })
      .catch((error) => {
        if (cancelled) return
        // eslint-disable-next-line no-console
        console.error('Failed to load about content', error)
        setState({
          data: null,
          loading: false,
          error: 'errors.loadAbout',
        })
      })

    return () => {
      cancelled = true
    }
  }, [])

  return state
}

