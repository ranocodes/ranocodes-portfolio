import SEO, { BlogPostSchema } from '../components/SEO'
import { useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ArrowLeft, Clock, Calendar } from 'lucide-react'
import Badge from '../components/ui/Badge'
import MagneticButton from '../components/ui/MagneticButton'
import ReadingProgress from '../components/ui/ReadingProgress'
import blogData from '../data/blog.json'

function BlogPost() {
  const { slug } = useParams()
  const sectionRef = useRef(null)
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const post = blogData.find((p) => p.slug === slug)

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.post-content',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.1 }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [prefersReducedMotion])

  if (!post) {
    return (
      <main className="min-h-screen pt-32 px-6 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-serif italic mb-4">Post Not Found</h1>
          <MagneticButton href="/blog">Back to Blog</MagneticButton>
        </div>
      </main>
    )
  }

  return (
    <>
      <SEO
        title={post.title}
        description={post.excerpt}
        image={post.featuredImage}
        type="article"
      />
      <BlogPostSchema post={post} />
      <ReadingProgress />
      <main ref={sectionRef} className="min-h-screen pt-32 pb-20">
        <article className="max-w-3xl mx-auto px-6 md:px-12 lg:px-20">
          <Link
            to="/blog"
            className="post-content inline-flex items-center gap-2 text-slate hover:text-champagne transition-colors mb-12"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>

          <header className="post-content mb-12">
            <div className="flex items-center gap-4 mb-6">
              <Badge variant="primary">{post.category}</Badge>
              <span className="flex items-center gap-1.5 text-slate text-sm">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif italic mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="flex items-center gap-2 text-slate text-sm">
              <Calendar className="w-4 h-4" />
              {new Date(post.date).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </div>
          </header>

          <div className="post-content aspect-[16/9] rounded-[2rem] overflow-hidden mb-12">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="post-content prose prose-invert prose-lg max-w-none">
            <div className="text-ivory/80 leading-relaxed space-y-6">
              <p className="text-xl text-ivory/70 leading-relaxed">
                {post.excerpt}
              </p>
              <p>
                {post.fullContent}
              </p>
              <p>
                In today's rapidly evolving digital landscape, staying ahead of the curve 
                is essential. This article explores key concepts and practical approaches 
                that can help developers and designers create better digital experiences.
              </p>
              <h2 className="text-2xl font-semibold text-ivory mt-12 mb-6">Key Takeaways</h2>
              <ul className="space-y-4 text-ivory/80">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-champagne mt-2 flex-shrink-0" />
                  Understanding core principles is fundamental to implementation
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-champagne mt-2 flex-shrink-0" />
                  Performance and user experience should always be prioritized
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-champagne mt-2 flex-shrink-0" />
                  Testing and iteration lead to better outcomes
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-champagne mt-2 flex-shrink-0" />
                  Keeping up with industry trends ensures relevance
                </li>
              </ul>
              <p>
                Whether you're just starting out or looking to refine your existing skills, 
                these insights will provide valuable guidance for your journey.
              </p>
            </div>
          </div>

          <div className="post-content mt-16 pt-12 border-t border-ivory/10 text-center">
            <h2 className="text-2xl font-serif italic mb-8">
              Enjoyed this article? <span className="text-champagne">Let's connect</span>
            </h2>
            <MagneticButton href="/#contact" size="lg">
              Get in Touch
            </MagneticButton>
          </div>
        </article>
      </main>
    </>
  )
}

export default BlogPost
