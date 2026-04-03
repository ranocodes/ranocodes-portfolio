import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '../../utils/cn'
import Card from '../ui/Card'

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    title: 'Custom Web Design',
    description: 'Pixel-perfect designs tailored to your brand identity.',
    highlights: ['Responsive layouts', 'Brand consistency', 'UX optimization'],
  },
  {
    title: 'Full-Stack Development',
    description: 'Robust APIs, databases, and scalable architectures.',
    highlights: ['React & Node.js', 'Database design', 'Cloud deployment'],
  },
  {
    title: 'E-Commerce Solutions',
    description: 'High-converting online stores with seamless checkout.',
    highlights: ['Payment integration', 'Inventory management', 'Analytics dashboard'],
  },
]

function Features() {
  const sectionRef = useRef(null)
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.feature-card',
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [prefersReducedMotion])

  return (
    <section ref={sectionRef} className="py-32 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <p className="font-mono text-champagne text-sm uppercase tracking-widest mb-4">Capabilities</p>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif italic">
          What I <span className="text-champagne">Build</span>
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <FeatureCard key={index} feature={feature} index={index} />
        ))}
      </div>
    </section>
  )
}

function FeatureCard({ feature, index }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const intervalRef = useRef(null)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % feature.highlights.length)
    }, 3000)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [feature.highlights.length])

  return (
    <Card className="feature-card relative overflow-hidden group" hover>
      <div className="relative z-10">
        <div className="w-14 h-14 rounded-2xl bg-champagne/10 flex items-center justify-center mb-8">
          <span className="font-mono text-champagne text-xl">{String(index + 1).padStart(2, '0')}</span>
        </div>

        <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
        <p className="text-slate mb-8 leading-relaxed">{feature.description}</p>

        <div className="space-y-3">
          {feature.highlights.map((highlight, i) => (
            <div
              key={i}
              className={cn(
                'flex items-center gap-3 transition-all duration-500',
                i === activeIndex ? 'text-champagne translate-x-2' : 'text-slate/50'
              )}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-current" />
              <span className="text-sm">{highlight}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-champagne/5 rounded-full blur-3xl group-hover:bg-champagne/10 transition-colors duration-500" />
    </Card>
  )
}

export default Features
