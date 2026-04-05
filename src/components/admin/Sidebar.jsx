import { NavLink, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  FileText, 
  FolderOpen, 
  Ticket, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  X,
  LogOut
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const navItems = [
  { path: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { path: '/admin/blogs', icon: FileText, label: 'Blog Posts' },
  { path: '/admin/categories', icon: FolderOpen, label: 'Categories' },
  { path: '/admin/invite-codes', icon: Ticket, label: 'Invite Codes' },
  { path: '/admin/settings', icon: Settings, label: 'Settings' },
]

function Sidebar({ collapsed, onToggle }) {
  const { logout } = useAuth()

  return (
    <>
      <aside
        className={`fixed top-0 left-0 h-full bg-obsidian border-r border-ivory/10 z-40 transition-all duration-300 ${
          collapsed ? 'w-20' : 'w-64'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className={`h-16 flex items-center border-b border-ivory/10 ${collapsed ? 'px-4 justify-center' : 'px-6'}`}>
            {!collapsed ? (
              <NavLink to="/" className="flex items-center gap-3">
                <span className="text-xl font-serif italic text-champagne">Admin</span>
              </NavLink>
            ) : (
              <span className="text-xl font-serif italic text-champagne">A</span>
            )}
          </div>

          <nav className="flex-1 py-6 px-3 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${
                    collapsed ? 'justify-center' : ''
                  } ${
                    isActive
                      ? 'bg-champagne/10 text-champagne border-l-2 border-champagne'
                      : 'text-ivory/70 hover:text-ivory hover:bg-ivory/5 border-l-2 border-transparent'
                  }`
                }
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && <span className="font-medium text-sm">{item.label}</span>}
              </NavLink>
            ))}
          </nav>

          <div className="p-3 border-t border-ivory/10 space-y-1">
            <button
              onClick={() => {
                if (confirm('Are you sure you want to sign out?')) {
                  logout()
                  window.location.href = '/admin/login'
                }
              }}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-ivory/70 hover:text-red-400 hover:bg-red-500/10 transition-all ${
                collapsed ? 'justify-center' : ''
              }`}
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span className="font-medium text-sm">Sign Out</span>}
            </button>
            
            <button
              onClick={onToggle}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-ivory/70 hover:text-ivory hover:bg-ivory/5 transition-all ${
                collapsed ? 'justify-center' : ''
              }`}
            >
              {collapsed ? (
                <ChevronRight className="w-5 h-5" />
              ) : (
                <>
                  <ChevronLeft className="w-5 h-5" />
                  <span className="font-medium text-sm">Collapse</span>
                </>
              )}
            </button>
          </div>
        </div>
      </aside>

      {collapsed && (
        <div 
          className="fixed inset-0 bg-obsidian/80 z-30 backdrop-blur-sm lg:hidden" 
          onClick={onToggle}
        >
          <button className="absolute top-4 right-4 p-2 text-ivory hover:text-champagne transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>
      )}
    </>
  )
}

export default Sidebar
