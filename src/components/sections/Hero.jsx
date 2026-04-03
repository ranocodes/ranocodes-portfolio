import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ArrowDown } from 'lucide-react'
import MagneticButton from '../ui/MagneticButton'

function Hero() {
  const heroRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 })

      tl.fromTo(
        '.hero-line',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', stagger: 0.15 }
      )
        .fromTo(
          '.hero-cta',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
          '-=0.4'
        )
        .fromTo(
          '.hero-scroll',
          { opacity: 0 },
          { opacity: 1, duration: 0.6, ease: 'power2.out' },
          '-=0.3'
        )
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative h-screen flex items-end pb-32 overflow-hidden"
    >
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1920&q=80"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/60 to-obsidian/30" />
      </div>

      <div ref={contentRef} className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <p className="hero-line font-mono text-champagne text-sm mb-6 opacity-0">
          Creative Developer & Designer
        </p>
        
        <h1 className="hero-line text-5xl md:text-7xl lg:text-8xl font-sans font-bold leading-[0.9] tracking-tight mb-8 opacity-0">
          <span className="block">Digital</span>
          <span className="block font-serif italic text-champagne">Craftsmanship</span>
          <span className="block">Meets</span>
          <span className="block font-serif italic">Innovation.</span>
        </h1>

        <p className="hero-line text-lg md:text-xl text-ivory/70 max-w-xl mb-10 opacity-0">
          Custom web design, front-end/back-end development, and e-commerce solutions 
          that elevate brands and drive results.
        </p>

        <div className="hero-cta flex flex-wrap gap-4 opacity-0">
          <MagneticButton href="/projects" size="lg">
            View Projects
          </MagneticButton>
          <MagneticButton href="/#contact" variant="secondary" size="lg">
            Get in Touch
          </MagneticButton>
        </div>
      </div>

      <div className="hero-scroll absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0">
        <span className="font-mono text-xs text-slate">Scroll</span>
        <ArrowDown className="w-5 h-5 text-champagne animate-bounce" />
      </div>
    </section>
  )
}

export default Hero
