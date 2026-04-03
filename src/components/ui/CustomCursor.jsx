import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

function CustomCursor() {
  const cursorRef = useRef(null)
  const cursorDotRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const cursor = cursorRef.current
    const cursorDot = cursorDotRef.current

    let mouseX = 0
    let mouseY = 0
    let cursorX = 0
    let cursorY = 0
    let dotX = 0
    let dotY = 0

    const handleMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      setIsVisible(true)
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.15
      cursorY += (mouseY - cursorY) * 0.15
      dotX += (mouseX - dotX) * 0.35
      dotY += (mouseY - dotY) * 0.35

      if (cursor) {
        gsap.set(cursor, { x: cursorX, y: cursorY })
      }
      if (cursorDot) {
        gsap.set(cursorDot, { x: dotX, y: dotY })
      }

      requestAnimationFrame(animate)
    }

    const handleHoverEnter = () => setIsHovering(true)
    const handleHoverLeave = () => setIsHovering(false)

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    const interactiveElements = document.querySelectorAll('a, button, [role="button"]')
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleHoverEnter)
      el.addEventListener('mouseleave', handleHoverLeave)
    })

    animate()

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleHoverEnter)
        el.removeEventListener('mouseleave', handleHoverLeave)
      })
    }
  }, [])

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  return (
    <>
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 w-10 h-10 border border-champagne/50 rounded-full pointer-events-none z-[9998] mix-blend-difference transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <div
          className={`absolute inset-2 bg-champagne/20 rounded-full transition-transform duration-300 ${
            isHovering ? 'scale-150' : ''
          }`}
        />
      </div>
      <div
        ref={cursorDotRef}
        className={`fixed top-0 left-0 w-2 h-2 bg-champagne rounded-full pointer-events-none z-[9999] transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ transform: 'translate(-50%, -50%)' }}
      />
    </>
  )
}

export default CustomCursor
