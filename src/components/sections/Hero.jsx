import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ArrowDown } from 'lucide-react'
import MagneticButton from '../ui/MagneticButton'

function Hero() {
  const heroRef = useRef(null)

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
          '.hero-sub',
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
          '-=0.5'
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
          '-=0.2'
        )
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1920&q=80"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/70 to-obsidian/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-32 md:py-0">
        <div className="md:absolute md:bottom-32 md:left-0 md:right-0">
          <p className="hero-line font-mono text-champagne text-sm uppercase tracking-widest mb-6 opacity-0">
            Creative Developer & Designer
          </p>
          
          <h1 className="hero-line text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-sans font-bold leading-[0.95] tracking-tight mb-8 opacity-0">
            <span className="block">Digital</span>
            <span className="block font-serif italic text-champagne">Craftsmanship</span>
            <span className="block">Meets</span>
            <span className="block font-serif italic">Innovation.</span>
          </h1>

          <p className="hero-sub text-lg md:text-xl text-ivory/70 max-w-xl mb-10 opacity-0">
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
      </div>

      <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0">
        <span className="font-mono text-xs text-ivory/50 uppercase tracking-widest">Scroll</span>
        <ArrowDown className="w-5 h-5 text-champagne animate-bounce" />
      </div>
    </section>
  )
}

export default Hero
