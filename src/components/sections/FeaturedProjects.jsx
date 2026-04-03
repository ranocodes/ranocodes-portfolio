import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ArrowRight, ExternalLink } from 'lucide-react'
import MagneticButton from '../ui/MagneticButton'
import Badge from '../ui/Badge'
import projectsData from '../../data/projects.json'

gsap.registerPlugin()

const featuredProjects = projectsData.slice(0, 3)

function FeaturedProjects() {
  const sectionRef = useRef(null)
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.featured-project',
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
    <section ref={sectionRef} className="py-32 px-6 md:px-12 lg:px-20 bg-slate/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <p className="font-mono text-champagne text-sm uppercase tracking-widest mb-4">Portfolio</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif italic">
              Selected <span className="text-champagne">Work</span>
            </h2>
          </div>
          <MagneticButton href="/projects" variant="secondary">
            View All Projects
            <ArrowRight className="w-4 h-4" />
          </MagneticButton>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <Link
              key={project.id}
              to={`/projects/${project.slug}`}
              className="featured-project group block"
            >
              <div className="card-base overflow-hidden p-0 h-full flex flex-col">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={project.screenshots[0]}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <Badge variant="primary" className="w-fit mb-4">
                    {project.category}
                  </Badge>
                  <h3 className="text-2xl font-semibold mb-3 group-hover:text-champagne transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate flex-1 mb-6 line-clamp-2">{project.overview}</p>
                  <div className="flex items-center text-champagne text-sm font-medium">
                    View Project <ExternalLink className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedProjects
