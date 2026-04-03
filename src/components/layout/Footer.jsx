import { Link } from 'react-router-dom'
import { Github, Twitter, Linkedin, Mail } from 'lucide-react'

const footerLinks = {
  navigation: [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/blog', label: 'Blog' },
  ],
  social: [
    { href: 'https://github.com', label: 'GitHub', icon: Github },
    { href: 'https://twitter.com', label: 'Twitter', icon: Twitter },
    { href: 'https://linkedin.com', label: 'LinkedIn', icon: Linkedin },
  ],
}

function Footer() {
  return (
    <footer className="bg-obsidian rounded-t-[4rem] border-t border-ivory/10 mt-32">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-4 gap-12 md:gap-8">
          <div className="md:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <span className="text-2xl font-serif italic text-ivory">Portfolio</span>
            </Link>
            <p className="text-slate max-w-sm mb-8 leading-relaxed">
              Crafting digital experiences with precision. Custom web design, 
              front-end/back-end development, and e-commerce solutions.
            </p>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
              <span className="font-mono text-xs text-slate">System Operational</span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-ivory/60 mb-6">Navigation</h4>
            <ul className="space-y-4">
              {footerLinks.navigation.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-slate hover:text-champagne transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-ivory/60 mb-6">Connect</h4>
            <ul className="space-y-4">
              {footerLinks.social.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-slate hover:text-champagne transition-colors duration-300"
                  >
                    <link.icon className="w-4 h-4" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-ivory/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate text-sm">
            &copy; {new Date().getFullYear()} Portfolio. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-slate">
            <a href="#" className="hover:text-champagne transition-colors">Privacy</a>
            <a href="#" className="hover:text-champagne transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
