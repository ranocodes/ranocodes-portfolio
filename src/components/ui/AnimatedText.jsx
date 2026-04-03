import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { cn } from '../../utils/cn'

function AnimatedText({
  children,
  className,
  stagger = 0.08,
  delay = 0,
  type = 'chars',
  as: Component = 'div',
}) {
  const containerRef = useRef(null)
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return

    const ctx = gsap.context(() => {
      const elements = containerRef.current.querySelectorAll('[data-animate]')
      
      gsap.fromTo(
        elements,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger,
          delay,
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [stagger, delay, prefersReducedMotion])

  if (type === 'chars') {
    const text = typeof children === 'string' ? children : ''
    return (
      <Component ref={containerRef} className={cn('inline-block', className)}>
        {text.split('').map((char, i) => (
          <span
            key={i}
            data-animate
            className="inline-block"
            style={{ opacity: prefersReducedMotion ? 1 : 0 }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </Component>
    )
  }

  if (type === 'words') {
    const text = typeof children === 'string' ? children : ''
    return (
      <Component ref={containerRef} className={cn('inline-block', className)}>
        {text.split(' ').map((word, i) => (
          <span
            key={i}
            data-animate
            className="inline-block mr-[0.3em]"
            style={{ opacity: prefersReducedMotion ? 1 : 0 }}
          >
            {word}
          </span>
        ))}
      </Component>
    )
  }

  return (
    <Component ref={containerRef} data-animate className={className}>
      {children}
    </Component>
  )
}

export default AnimatedText
