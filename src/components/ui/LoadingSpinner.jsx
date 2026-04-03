function LoadingSpinner({ size = 'md', className = '' }) {
  const sizes = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-2',
    lg: 'w-12 h-12 border-3',
  }

  return (
    <div
      className={`${sizes[size]} border-champagne border-t-transparent rounded-full animate-spin ${className}`}
    />
  )
}

export default LoadingSpinner
