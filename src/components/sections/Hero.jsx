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
      className="relative min-h-[100dvh] flex items-end overflow-hidden"
    >
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1920&q=80"
          alt="Abstract 3D Background"
          className="w-full h-full object-cover"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/60 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pb-20 md:pb-32">
        <div className="max-w-4xl">
          <p className="hero-line font-mono text-champagne text-xs md:text-sm uppercase tracking-[0.3em] mb-6 opacity-0 md:pt-16">
            Creative Developer & Designer
          </p>

          <h1 className="hero-line text-7xl sm:text-8xl md:text-8xl lg:text-[10rem] font-sans font-bold leading-[0.95] tracking-tight mb-8 opacity-0">
            <span className="block">Digital</span>
            <span className="block font-serif italic text-champagne">Craftsmanship</span>
            <span className="block">Meets</span>
            <span className="block font-serif italic text-ivory">Innovation.</span>
          </h1>

          <p className="hero-sub text-base md:text-lg lg:text-xl text-ivory/60 max-w-xl mb-12 leading-relaxed opacity-0">
            I build high-fidelity digital experiences where
            <span className="text-ivory"> precision</span> meets
            <span className="text-ivory"> soul</span>. Custom solutions that elevate your brand.
          </p>

          <div className="hero-cta flex flex-wrap gap-6 opacity-0">
            <MagneticButton href="/projects" size="lg" className="px-8 py-4">
              Explore Work
            </MagneticButton>
            <MagneticButton href="/#contact" variant="secondary" size="lg" className="px-8 py-4">
              Get in Touch
            </MagneticButton>
          </div>
        </div>
      </div>

      <div className="hero-scroll absolute bottom-10 right-10 hidden md:flex flex-col items-center gap-4 opacity-0">
        <div className="w-[1px] h-24 bg-gradient-to-b from-champagne to-transparent" />
        <span className="font-mono text-[10px] text-ivory/40 uppercase tracking-[0.4em] [writing-mode:vertical-lr]">
          Scroll to explore
        </span>
      </div>
    </section>
  )
}

export default Hero
