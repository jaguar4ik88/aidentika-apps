import { useEffect, useState } from 'react'
import { apiClient } from '../api/client'

export interface PostSummary {
  id: number
  title: string
  slug: string
  excerpt?: string | null
  published_at?: string | null
}

export interface PostDetail extends PostSummary {
  content: string
}

interface BaseState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

export function usePosts(): BaseState<PostSummary[]> {
  const [state, setState] = useState<BaseState<PostSummary[]>>({
    data: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    let cancelled = false

    setState((s) => ({ ...s, loading: true, error: null }))

    apiClient
      .get<{ data: PostSummary[] }>('/posts')
      .then((response) => {
        if (cancelled) return
        const payload = Array.isArray((response.data as any)?.data)
          ? (response.data.data as PostSummary[])
          : ((response.data as any) as PostSummary[])

        setState({ data: payload, loading: false, error: null })
      })
      .catch((error) => {
        if (cancelled) return
        // eslint-disable-next-line no-console
        console.error('Failed to load posts', error)
        setState({
          data: null,
          loading: false,
          error: 'Не удалось загрузить статьи.',
        })
      })

    return () => {
      cancelled = true
    }
  }, [])

  return state
}

export function usePost(slug: string | undefined): BaseState<PostDetail> {
  const [state, setState] = useState<BaseState<PostDetail>>({
    data: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    if (!slug) return

    let cancelled = false
    setState((s) => ({ ...s, loading: true, error: null }))

    apiClient
      .get<{ data: PostDetail }>(`/posts/${slug}`)
      .then((response) => {
        if (cancelled) return
        const payload =
          (response.data as any)?.data ??
          ((response.data as any) as PostDetail)

        setState({ data: payload, loading: false, error: null })
      })
      .catch((error) => {
        if (cancelled) return
        // eslint-disable-next-line no-console
        console.error('Failed to load post', error)
        setState({
          data: null,
          loading: false,
          error: 'Не удалось загрузить статью.',
        })
      })

    return () => {
      cancelled = true
    }
  }, [slug])

  return state
}

