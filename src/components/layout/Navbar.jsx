import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import { Menu, X } from 'lucide-react'

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
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
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
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.2 }
      )
    }, navRef)

    return () => ctx.revert()
  }, [])

  const isActive = (path) => location.pathname === path

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 w-[calc(100%-2rem)] md:w-auto ${isScrolled
          ? 'bg-obsidian/80 backdrop-blur-xl border border-ivory/10 shadow-2xl'
          : 'bg-obsidian/40 backdrop-blur-md border border-ivory/10'
          } rounded-full`}
      >
        <div className="flex items-center justify-between w-full px-2 py-2">
          <Link
            to="/"
            className="px-4 py-2.5 font-semibold text-sm text-ivory tracking-tight transition-colors duration-300 hover:text-champagne"
          >
            Portfolio
          </Link>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-1 px-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`px-4 py-2 text-sm rounded-full transition-all duration-300 ${isActive(link.href)
                    ? 'bg-ivory/10 text-champagne'
                    : 'text-ivory/80 hover:text-ivory hover:bg-ivory/5'
                    }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="hidden md:block ml-2">
              <Link
                to="/#contact"
                className="inline-block px-5 py-2.5 bg-champagne text-obsidian text-sm font-semibold rounded-full hover:bg-champagne/90 transition-colors"
              >
                Contact
              </Link>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2.5 rounded-full text-ivory hover:bg-ivory/10 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-obsidian/95 backdrop-blur-xl md:hidden">
          <div className="flex flex-col items-center justify-center h-full gap-8 pt-20">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-3xl font-serif italic transition-colors duration-300 ${isActive(link.href) ? 'text-champagne' : 'text-ivory'
                  }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-4 px-8 py-4 bg-champagne text-obsidian font-semibold rounded-full hover:bg-champagne/90 transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar
