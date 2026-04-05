import SEO, { ProjectSchema } from '../components/SEO'
import { useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ArrowLeft, CheckCircle, ExternalLink } from 'lucide-react'
import Badge from '../components/ui/Badge'
import MagneticButton from '../components/ui/MagneticButton'
import projectsData from '../data/projects.json'

function ProjectDetail() {
  const { slug } = useParams()
  const sectionRef = useRef(null)
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const project = projectsData.find((p) => p.slug === slug)

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.project-content',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.1 }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [prefersReducedMotion])

  if (!project) {
    return (
      <main className="min-h-screen pt-32 px-6 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-serif italic mb-4">Project Not Found</h1>
          <MagneticButton href="/projects">Back to Projects</MagneticButton>
        </div>
      </main>
    )
  }

  return (
    <>
      <SEO
        title={project.title}
        description={project.overview}
        image={project.screenshots[0]}
      />
      {project && <ProjectSchema project={project} />}
      <main ref={sectionRef} className="min-h-screen pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <Link
            to="/projects"
            className="project-content inline-flex items-center gap-2 text-ivory/70 hover:text-champagne transition-colors mb-12"
          >
            <ArrowLeft className="w-5 h-5" /> Back to Projects
          </Link>

          <div className="project-content mb-12">
            <Badge variant="primary" className="mb-6">
              {project.category}
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif italic mb-6">
              {project.title}
            </h1>
            <p className="text-lg md:text-xl text-ivory/70 max-w-3xl leading-relaxed">
              {project.overview}
            </p>
          </div>

          <div className="aspect-video rounded-[2rem] overflow-hidden mb-16 project-content">
            <img
              src={project.screenshots[0]}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
            {project.results.map((result, index) => (
              <div
                key={index}
                className="project-content group bg-gradient-to-br from-ivory/[3%] to-ivory/[1%] border border-ivory/10 rounded-2xl p-8 text-center hover:border-champagne/30 hover:shadow-xl hover:shadow-champagne/5 transition-all duration-300"
              >
                <p className="text-4xl md:text-5xl font-bold text-champagne mb-3">{result.value}</p>
                <p className="text-sm text-ivory/60 font-medium uppercase tracking-wider">{result.metric}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="project-content bg-ivory/[3%] border border-ivory/10 rounded-2xl p-8">
              <h2 className="text-xl md:text-2xl font-semibold mb-4 text-champagne">The Challenge</h2>
              <p className="text-ivory/80 leading-relaxed">{project.problem}</p>
            </div>
            <div className="project-content bg-ivory/[3%] border border-ivory/10 rounded-2xl p-8">
              <h2 className="text-xl md:text-2xl font-semibold mb-4 text-champagne">The Mission</h2>
              <p className="text-ivory/80 leading-relaxed">{project.mission}</p>
            </div>
          </div>

          <div className="project-content bg-ivory/[3%] border border-ivory/10 rounded-2xl p-8 mb-16">
            <h2 className="text-xl md:text-2xl font-semibold mb-6 text-champagne">The Solution</h2>
            <p className="text-ivory/80 leading-relaxed mb-8">{project.solution}</p>

            <h3 className="text-lg font-semibold mb-4 text-ivory">Key Features</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {project.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-champagne/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-champagne" />
                  </div>
                  <span className="text-ivory/80">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="project-content bg-ivory/[3%] border border-ivory/10 rounded-2xl p-8 mb-16">
            <h2 className="text-xl md:text-2xl font-semibold mb-6 text-champagne">Tech Stack</h2>
            <div className="flex flex-wrap gap-3">
              {project.techStack.map((tech) => (
                <Badge key={tech} variant="primary">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          <div className="project-content text-center py-12">
            <h2 className="text-3xl md:text-4xl font-serif italic mb-8">
              Like what you see? <span className="text-champagne">Let's talk</span>
            </h2>
            <MagneticButton href="/#contact" size="lg">
              Start a Project
              <ExternalLink className="w-5 h-5" />
            </MagneticButton>
          </div>
        </div>
      </main>
    </>
  )
}

export default ProjectDetail
