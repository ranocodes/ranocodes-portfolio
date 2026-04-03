import { Component } from 'react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-obsidian text-ivory px-6">
          <div className="text-center max-w-md">
            <h1 className="text-4xl font-serif italic mb-4">Something went wrong</h1>
            <p className="text-slate mb-8 font-mono text-sm">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="magnetic-btn px-8 py-4 bg-champagne text-obsidian font-semibold rounded-full"
            >
              <span className="relative z-10">Reload Page</span>
              <span className="btn-bg" />
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
