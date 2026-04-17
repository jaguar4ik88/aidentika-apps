import { useEffect } from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import './App.css'
import { Layout } from './components/layout/Layout'
import { HomePage } from './pages/HomePage'
import { BlogListPage } from './pages/BlogListPage'
import { BlogPostPage } from './pages/BlogPostPage'
import { NotFoundPage } from './pages/NotFoundPage'
import i18n from './i18n/i18n'

function LangShell({ lang }: { lang: 'uk' | 'en' }) {
  useEffect(() => {
    void i18n.changeLanguage(lang)
    document.documentElement.lang = lang === 'uk' ? 'uk' : 'en'
  }, [lang])

  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-[rgb(var(--color-bg))] text-[rgb(var(--color-text))] antialiased">
      <Routes>
        <Route path="/en" element={<LangShell lang="en" />}>
          <Route index element={<HomePage />} />
          <Route path="blog" element={<BlogListPage />} />
          <Route path="blog/:slug" element={<BlogPostPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="/" element={<LangShell lang="uk" />}>
          <Route index element={<HomePage />} />
          <Route path="blog" element={<BlogListPage />} />
          <Route path="blog/:slug" element={<BlogPostPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
