import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
]

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
      )
    }, navRef)

    return () => ctx.revert()
  }, [])

  const isActive = (path) => location.pathname === path

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-obsidian/60 backdrop-blur-xl border border-ivory/10 shadow-2xl'
            : 'bg-transparent'
        }`}
      >
        <div className="flex items-center gap-1 px-2 py-2 rounded-full">
          <Link
            to="/"
            className="px-5 py-2.5 font-semibold text-sm tracking-tight transition-colors duration-300 hover:text-champagne"
          >
            Portfolio
          </Link>

          <div className="hidden md:flex items-center gap-1 px-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-4 py-2 text-sm rounded-full transition-all duration-300 ${
                  isActive(link.href)
                    ? 'bg-ivory/10 text-champagne'
                    : 'text-ivory/80 hover:text-champagne hover:bg-ivory/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:block ml-2">
            <Link
              to="/#contact"
              className="magnetic-btn px-5 py-2.5 bg-champagne text-obsidian text-sm font-semibold rounded-full"
            >
              <span className="relative z-10">Contact</span>
              <span className="btn-bg" />
            </Link>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2.5 ml-1 rounded-full hover:bg-ivory/10 transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className={`w-5 h-5 transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-45' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-obsidian/95 backdrop-blur-xl md:hidden">
          <div className="flex flex-col items-center justify-center h-full gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-3xl font-serif italic transition-colors duration-300 ${
                  isActive(link.href) ? 'text-champagne' : 'text-ivory'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/#contact"
              className="magnetic-btn mt-4 px-8 py-4 bg-champagne text-obsidian font-semibold rounded-full"
            >
              <span className="relative z-10">Contact</span>
              <span className="btn-bg" />
            </Link>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar
