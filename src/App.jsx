import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { AuthProvider } from './context/AuthContext'
import PageTransition from './components/layout/PageTransition'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import CustomCursor from './components/ui/CustomCursor'
import ErrorBoundary from './components/ErrorBoundary'
import Analytics from './components/Analytics'
import ProtectedRoute from './components/auth/ProtectedRoute'
import AdminLayout from './components/admin/AdminLayout'
import Login from './pages/admin/Login'

const Home = lazy(() => import('./pages/Home'))
const Projects = lazy(() => import('./pages/Projects'))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))
const Blog = lazy(() => import('./pages/Blog'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const NotFound = lazy(() => import('./pages/NotFound'))

const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'))
const AdminBlogList = lazy(() => import('./pages/admin/BlogList'))
const AdminBlogForm = lazy(() => import('./pages/admin/BlogForm'))
const AdminCategories = lazy(() => import('./pages/admin/Categories'))
const AdminInviteCodes = lazy(() => import('./pages/admin/InviteCodes'))
const AdminSettings = lazy(() => import('./pages/admin/Settings'))

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-obsidian">
      <div className="w-8 h-8 border-2 border-champagne border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

function PublicRoutes() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/projects" element={<PageTransition><Projects /></PageTransition>} />
          <Route path="/projects/:slug" element={<PageTransition><ProjectDetail /></PageTransition>} />
          <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
          <Route path="/blog/:slug" element={<PageTransition><BlogPost /></PageTransition>} />
          <Route path="/404" element={<PageTransition><NotFound /></PageTransition>} />
          <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  )
}

function App() {
  return (
    <AuthProvider>
      <>
        <div className="noise-overlay" aria-hidden="true" />
        <CustomCursor />
        <Analytics />
        <ErrorBoundary>
          <Routes>
            {/* Admin Login */}
            <Route path="/admin/login" element={<Login />} />

            {/* Admin Protected Routes */}
            <Route path="/admin" element={
              <ProtectedRoute>
                <Suspense fallback={<LoadingFallback />}>
                  <AdminLayout />
                </Suspense>
              </ProtectedRoute>
            }>
              <Route index element={<AdminDashboard />} />
              <Route path="blogs" element={<AdminBlogList />} />
              <Route path="blogs/new" element={<AdminBlogForm />} />
              <Route path="blogs/:id/edit" element={<AdminBlogForm />} />
              <Route path="categories" element={<AdminCategories />} />
              <Route path="invite-codes" element={<AdminInviteCodes />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>

            {/* Public Routes */}
            <Route path="/*" element={<PublicRoutes />} />
          </Routes>
        </ErrorBoundary>
      </>
    </AuthProvider>
  )
}

export default App
