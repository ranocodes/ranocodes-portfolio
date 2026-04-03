import { forwardRef } from 'react'
import { cn } from '../../utils/cn'

const Input = forwardRef(({ className, error, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        'w-full px-6 py-4 bg-ivory/5 border border-ivory/10 rounded-2xl',
        'text-ivory placeholder:text-slate',
        'focus:outline-none focus:border-champagne/50 focus:ring-2 focus:ring-champagne/20',
        'transition-all duration-300',
        error && 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20',
        className
      )}
      {...props}
    />
  )
})

Input.displayName = 'Input'

const Textarea = forwardRef(({ className, error, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        'w-full px-6 py-4 bg-ivory/5 border border-ivory/10 rounded-2xl',
        'text-ivory placeholder:text-slate resize-none',
        'focus:outline-none focus:border-champagne/50 focus:ring-2 focus:ring-champagne/20',
        'transition-all duration-300 min-h-[150px]',
        error && 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20',
        className
      )}
      {...props}
    />
  )
})

Textarea.displayName = 'Textarea'

export { Input, Textarea }
