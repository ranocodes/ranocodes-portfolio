import { cn } from '../../utils/cn'

function Badge({ children, variant = 'default', className }) {
  const variants = {
    default: 'bg-ivory/10 text-ivory border-ivory/20',
    primary: 'bg-champagne/20 text-champagne border-champagne/30',
    success: 'bg-green-500/20 text-green-400 border-green-500/30',
    warning: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1.5 text-xs font-medium border rounded-full',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}

export default Badge
