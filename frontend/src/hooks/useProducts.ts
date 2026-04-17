import { useEffect, useState } from 'react'
import { apiClient } from '../api/client'

export interface Product {
  id: number
  title: string
  slug: string
  subtitle?: string | null
  status: string
  short_description?: string | null
}

interface UseProductsState {
  data: Product[] | null
  loading: boolean
  error: string | null
}

export function useProducts(): UseProductsState {
  const [state, setState] = useState<UseProductsState>({
    data: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    let cancelled = false

    setState((s) => ({ ...s, loading: true, error: null }))

    apiClient
      .get<{ data: Product[] }>('/products')
      .then((response) => {
        if (cancelled) return
        const payload = Array.isArray((response.data as any)?.data)
          ? (response.data.data as Product[])
          : ((response.data as any) as Product[])

        setState({ data: payload, loading: false, error: null })
      })
      .catch((error) => {
        if (cancelled) return
        // eslint-disable-next-line no-console
        console.error('Failed to load products', error)
        setState({
          data: null,
          loading: false,
          error: 'errors.loadProducts',
        })
      })

    return () => {
      cancelled = true
    }
  }, [])

  return state
}

