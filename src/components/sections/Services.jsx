import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Sparkles, Zap, Trophy } from 'lucide-react'
import Card from '../ui/Card'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    icon: Sparkles,
    title: 'Custom Web Design',
    description: 'Pixel-perfect, responsive designs that capture your brand essence and engage your audience.',
    features: ['Brand Identity', 'UI/UX Design', 'Responsive Layouts'],
  },
  {
    icon: Zap,
    title: 'Full-Stack Development',
    description: 'From React front-ends to Node.js back-ends, I build robust, scalable applications.',
    features: ['React/Vue/Next', 'Node.js APIs', 'Database Design'],
  },
  {
    icon: Trophy,
    title: 'E-Commerce Solutions',
    description: 'High-converting online stores with seamless payment integration and inventory management.',
    features: ['Shopify/ WooCommerce', 'Payment Gateways', 'Analytics Setup'],
  },
]

function Services() {
  const sectionRef = useRef(null)
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.service-card',
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.2,
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
    <section ref={sectionRef} className="py-32 px-6 md:px-12 lg:px-20 bg-slate/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <p className="font-mono text-champagne text-sm uppercase tracking-widest mb-4">Services</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif italic">
            What I <span className="text-champagne">Offer</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="service-card group hover:border-champagne/30" hover>
              <div className="w-16 h-16 rounded-2xl bg-champagne/10 flex items-center justify-center mb-8 group-hover:bg-champagne/20 transition-colors duration-300">
                <service.icon className="w-8 h-8 text-champagne" />
              </div>

              <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
              <p className="text-slate mb-8 leading-relaxed">{service.description}</p>

              <ul className="space-y-3">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-ivory/70">
                    <span className="w-1.5 h-1.5 rounded-full bg-champagne" />
                    {feature}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
