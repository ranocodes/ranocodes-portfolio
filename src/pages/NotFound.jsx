import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <p className="font-mono text-champagne text-sm mb-4">ERROR 404</p>
        <h1 className="text-6xl md:text-8xl font-serif italic text-ivory mb-6">Not Found</h1>
        <p className="text-slate mb-12 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="magnetic-btn inline-flex items-center gap-2 px-8 py-4 bg-champagne text-obsidian font-semibold rounded-full"
        >
          <span className="relative z-10">Back to Home</span>
          <span className="btn-bg" />
        </Link>
      </div>
    </main>
  )
}

export default NotFound
