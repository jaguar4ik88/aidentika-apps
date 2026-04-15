import { Routes, Route } from 'react-router-dom'
import './App.css'
import { Layout } from './components/layout/Layout'
import { HomePage } from './pages/HomePage'
import { BlogListPage } from './pages/BlogListPage'
import { BlogPostPage } from './pages/BlogPostPage'
import { NotFoundPage } from './pages/NotFoundPage'

function App() {
  return (
    <div className="min-h-screen bg-[rgb(var(--color-bg))] text-[rgb(var(--color-text))] antialiased">
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogListPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </div>
  )
}

export default App
