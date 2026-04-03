import { Link } from 'react-router-dom'
import { Menu, Bell, User, LogOut, ChevronDown } from 'lucide-react'
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
            className="lg:hidden p-2 text-slate hover:text-ivory transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative p-2 text-slate hover:text-ivory transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-champagne rounded-full" />
          </button>

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
                <p className="text-xs text-slate capitalize">{user?.role}</p>
              </div>
              <ChevronDown className="w-4 h-4 text-slate" />
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-56 bg-slate/90 backdrop-blur-xl border border-ivory/10 rounded-xl shadow-2xl overflow-hidden">
                <div className="p-4 border-b border-ivory/10">
                  <p className="text-sm font-medium text-ivory">{user?.name || user?.email?.split('@')[0]}</p>
                  <p className="text-xs text-slate">{user?.email}</p>
                </div>
                <div className="p-2">
                  <Link
                    to="/admin/settings"
                    onClick={() => setShowDropdown(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate hover:text-ivory hover:bg-ivory/5 transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                    Settings
                  </Link>
                  <Link
                    to="/"
                    onClick={() => setShowDropdown(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate hover:text-ivory hover:bg-ivory/5 transition-colors"
                  >
                    View Site
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign out
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
