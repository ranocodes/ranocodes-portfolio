import { NavLink, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  FileText, 
  FolderOpen, 
  Ticket, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  X
} from 'lucide-react'

const navItems = [
  { path: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { path: '/admin/blogs', icon: FileText, label: 'Blog Posts' },
  { path: '/admin/categories', icon: FolderOpen, label: 'Categories' },
  { path: '/admin/invite-codes', icon: Ticket, label: 'Invite Codes' },
  { path: '/admin/settings', icon: Settings, label: 'Settings' },
]

function Sidebar({ collapsed, onToggle }) {
  const location = useLocation()

  return (
    <>
      <aside
        className={`fixed top-0 left-0 h-full bg-slate/50 backdrop-blur-xl border-r border-ivory/10 z-40 transition-all duration-300 ${
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
                      ? 'bg-champagne/10 text-champagne'
                      : 'text-slate hover:text-ivory hover:bg-ivory/5'
                  }`
                }
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && <span className="font-medium">{item.label}</span>}
              </NavLink>
            ))}
          </nav>

          <div className="p-3 border-t border-ivory/10">
            <button
              onClick={onToggle}
              className="w-full flex items-center justify-center gap-3 px-3 py-3 rounded-xl text-slate hover:text-ivory hover:bg-ivory/5 transition-all"
            >
              {collapsed ? (
                <ChevronRight className="w-5 h-5" />
              ) : (
                <>
                  <ChevronLeft className="w-5 h-5" />
                  <span className="font-medium">Collapse</span>
                </>
              )}
            </button>
          </div>
        </div>
      </aside>

      {collapsed && (
        <div className="fixed inset-0 bg-obsidian/80 z-30 lg:hidden" onClick={onToggle}>
          <button className="absolute top-4 right-4 p-2 text-ivory">
            <X className="w-6 h-6" />
          </button>
        </div>
      )}
    </>
  )
}

export default Sidebar
