import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function Philosophy() {
  const sectionRef = useRef(null)
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return

    const ctx = gsap.context(() => {
      const lines = sectionRef.current.querySelectorAll('.philosophy-line')
      
      gsap.fromTo(
        lines,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [prefersReducedMotion])

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <p className="philosophy-line font-mono text-champagne text-sm uppercase tracking-widest mb-16 opacity-0">
          Philosophy
        </p>

        <div className="space-y-12">
          <p className="philosophy-line text-xl md:text-2xl text-slate opacity-0">
            Most developers focus on: <span className="text-ivory/60">making things work</span>.
          </p>

          <p className="philosophy-line text-4xl md:text-5xl lg:text-7xl font-serif italic leading-tight opacity-0">
            I focus on:{' '}
            <span className="text-champagne">crafting experiences</span> that work beautifully.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Philosophy
