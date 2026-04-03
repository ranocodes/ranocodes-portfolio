import SEO from '../components/SEO'
import { useState, useMemo, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Clock } from 'lucide-react'
import Badge from '../components/ui/Badge'
import Card from '../components/ui/Card'
import db from '../services/database'

gsap.registerPlugin(ScrollTrigger)

function Blog() {
  const [posts, setPosts] = useState([])
  const [activeCategory, setActiveCategory] = useState('All')
  const sectionRef = useRef(null)
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    const allPosts = db.blogs.getAll().filter(p => p.status === 'published')
    setPosts(allPosts)
  }, [])

  const categories = useMemo(() => {
    return ['All', ...new Set(posts.map((p) => p.category))]
  }, [posts])

  const filteredPosts = useMemo(() => {
    if (activeCategory === 'All') return posts
    return posts.filter((p) => p.category === activeCategory)
  }, [posts, activeCategory])

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.blog-item',
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
  }, [filteredPosts, prefersReducedMotion])

  return (
    <>
      <SEO
        title="Blog"
        description="Exploring web development, design systems, and the craft of building digital products."
      />
      <main ref={sectionRef} className="min-h-screen pt-32 pb-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-mono text-champagne text-sm uppercase tracking-widest mb-4">Blog</p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif italic mb-6">
              Thoughts & <span className="text-champagne">Insights</span>
            </h1>
            <p className="text-slate max-w-2xl mx-auto">
              Exploring web development, design systems, and the craft of building digital products.
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

          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-slate text-lg">No posts published yet</p>
              <p className="text-slate/60 mt-2">Check back soon for new content</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="blog-item group block"
                >
                  <Card className="p-0 overflow-hidden h-full flex flex-col" hover>
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={post.featuredImage || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80'}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-8 flex-1 flex flex-col">
                      <div className="flex items-center gap-4 mb-4">
                        <Badge variant="primary">{post.category}</Badge>
                        <span className="flex items-center gap-1.5 text-slate text-sm">
                          <Clock className="w-4 h-4" />
                          {post.readTime}
                        </span>
                      </div>
                      <h2 className="text-xl font-semibold mb-3 group-hover:text-champagne transition-colors flex-1">
                        {post.title}
                      </h2>
                      <p className="text-slate text-sm line-clamp-2 mb-4">{post.excerpt}</p>
                      <p className="text-xs text-slate/60">
                        {new Date(post.createdAt).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  )
}

export default Blog
