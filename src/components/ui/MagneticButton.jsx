import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../../utils/cn'

function MagneticButton({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className,
  ...props
}) {
  const buttonRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)

  const variants = {
    primary: 'bg-champagne text-obsidian hover:bg-champagne/90',
    secondary: 'bg-transparent border border-ivory/30 text-ivory hover:border-champagne hover:text-champagne',
    ghost: 'bg-transparent text-ivory hover:text-champagne',
  }

  const sizes = {
    sm: 'px-5 py-2.5 text-sm',
    md: 'px-8 py-4 text-base',
    lg: 'px-10 py-5 text-lg',
  }

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return
    const rect = buttonRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    buttonRef.current.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.03)`
  }

  const handleMouseLeave = () => {
    if (!buttonRef.current) return
    buttonRef.current.style.transform = 'translate(0, 0) scale(1)'
    setIsHovered(false)
  }

  const baseClasses = cn(
    'relative inline-flex items-center justify-center font-semibold rounded-full overflow-hidden transition-transform duration-300 ease-out cursor-pointer',
    variants[variant],
    sizes[size],
    className
  )

  const content = (
    <>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      <span
        className={cn(
          'absolute inset-0 bg-white/20 transition-transform duration-300 ease-out',
          isHovered ? 'translate-x-0' : '-translate-x-full'
        )}
      />
    </>
  )

  if (href) {
    return (
      <Link
        ref={buttonRef}
        to={href}
        className={baseClasses}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {content}
      </Link>
    )
  }

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      className={baseClasses}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {content}
    </button>
  )
}

export default MagneticButton
