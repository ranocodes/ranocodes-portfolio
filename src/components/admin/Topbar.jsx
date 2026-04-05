import { Link } from 'react-router-dom'
import { Menu, Bell, User, ChevronDown, ExternalLink, Settings, LogOut } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'

function Topbar({ onMenuClick }) {
  const { user, logout } = useAuth()
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    logout()
    window.location.href = '/admin/login'
  }

  return (
    <header className="h-16 bg-obsidian/50 backdrop-blur-xl border-b border-ivory/10 sticky top-0 z-20">
      <div className="h-full px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 text-ivory hover:text-champagne transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <Link to="/admin" className="text-lg font-semibold text-ivory hidden lg:block">
            Dashboard
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/"
            target="_blank"
            className="hidden md:flex items-center gap-2 px-4 py-2 text-sm text-ivory/70 hover:text-ivory hover:bg-ivory/5 rounded-lg transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            View Site
          </Link>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-3 p-2 rounded-xl hover:bg-ivory/5 transition-colors"
            >
              <div className="w-9 h-9 rounded-full bg-champagne/20 flex items-center justify-center">
                <User className="w-5 h-5 text-champagne" />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-ivory">{user?.name || user?.email?.split('@')[0]}</p>
                <p className="text-xs text-ivory/50 capitalize">{user?.role}</p>
              </div>
              <ChevronDown className={`w-4 h-4 text-ivory/50 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-56 bg-obsidian border border-ivory/10 rounded-xl shadow-2xl overflow-hidden">
                <div className="p-4 border-b border-ivory/10">
                  <p className="text-sm font-medium text-ivory">{user?.name || user?.email?.split('@')[0]}</p>
                  <p className="text-xs text-ivory/50">{user?.email}</p>
                </div>
                <div className="p-2">
                  <Link
                    to="/admin/settings"
                    onClick={() => setShowDropdown(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-ivory/70 hover:text-ivory hover:bg-ivory/5 transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                    Settings
                  </Link>
                  <Link
                    to="/"
                    target="_blank"
                    onClick={() => setShowDropdown(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-ivory/70 hover:text-ivory hover:bg-ivory/5 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Site
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Topbar
