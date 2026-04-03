import SEO from '../components/SEO'
import { useState, useMemo, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ExternalLink } from 'lucide-react'
import Badge from '../components/ui/Badge'
import Card from '../components/ui/Card'
import projectsData from '../data/projects.json'

gsap.registerPlugin(ScrollTrigger)

const categories = ['All', ...new Set(projectsData.map((p) => p.category))]

function Projects() {
  const [activeCategory, setActiveCategory] = useState('All')
  const sectionRef = useRef(null)
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return projectsData
    return projectsData.filter((p) => p.category === activeCategory)
  }, [activeCategory])

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.project-item',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [filteredProjects, prefersReducedMotion])

  return (
    <>
      <SEO
        title="Projects"
        description="A collection of projects showcasing expertise in web development, e-commerce, and digital experiences."
      />
      <main ref={sectionRef} className="min-h-screen pt-32 pb-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-mono text-champagne text-sm uppercase tracking-widest mb-4">Portfolio</p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif italic mb-6">
              Selected <span className="text-champagne">Work</span>
            </h1>
            <p className="text-slate max-w-2xl mx-auto">
              A collection of projects showcasing expertise in web development, 
              e-commerce, and digital experiences.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-champagne text-obsidian'
                    : 'bg-ivory/5 text-ivory/70 hover:bg-ivory/10 hover:text-ivory'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <Link
                key={project.id}
                to={`/projects/${project.slug}`}
                className="project-item group block"
              >
                <Card className="p-0 overflow-hidden" hover>
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={project.screenshots[0]}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-8">
                    <Badge variant="primary" className="mb-4">
                      {project.category}
                    </Badge>
                    <h2 className="text-2xl md:text-3xl font-semibold mb-4 group-hover:text-champagne transition-colors">
                      {project.title}
                    </h2>
                    <p className="text-slate mb-6 leading-relaxed">{project.overview}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.techStack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs bg-ivory/5 rounded-full text-ivory/60"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center text-champagne text-sm font-medium">
                      View Case Study <ExternalLink className="w-4 h-4 ml-2" />
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}

export default Projects
