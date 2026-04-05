import { Link } from 'react-router-dom'
import { FileText, FolderOpen, Send, TrendingUp, Clock, Plus, ArrowRight } from 'lucide-react'
import db from '../../services/database'

function Dashboard() {
  const blogs = db.blogs.getAll()
  const categories = db.categories.getAll()
  const activities = db.activity.getAll(10)

  const stats = [
    {
      label: 'Total Posts',
      value: blogs.length,
      icon: FileText,
      color: 'from-champagne to-amber-600',
    },
    {
      label: 'Published',
      value: blogs.filter(b => b.status === 'published').length,
      icon: Send,
      color: 'from-emerald-500 to-emerald-600',
    },
    {
      label: 'Drafts',
      value: blogs.filter(b => b.status === 'draft').length,
      icon: Clock,
      color: 'from-amber-500 to-amber-600',
    },
    {
      label: 'Categories',
      value: categories.length,
      icon: FolderOpen,
      color: 'from-violet-500 to-violet-600',
    },
  ]

  const recentBlogs = blogs.slice(0, 5)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-ivory mb-2">Dashboard</h1>
        <p className="text-ivory/60">Welcome back! Here's what's happening with your content.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-obsidian/50 border border-ivory/10 rounded-2xl p-6 hover:border-champagne/30 transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} p-3`}>
                <stat.icon className="w-full h-full text-white" />
              </div>
              <TrendingUp className="w-5 h-5 text-emerald-400" />
            </div>
            <p className="text-3xl font-bold text-ivory mb-1">{stat.value}</p>
            <p className="text-sm text-ivory/60">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-obsidian/50 border border-ivory/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-ivory">Recent Posts</h2>
            <Link to="/admin/blogs" className="text-sm text-champagne hover:text-champagne/80 transition-colors flex items-center gap-1">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {recentBlogs.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-ivory/30 mx-auto mb-4" />
              <p className="text-ivory/60 mb-4">No posts yet</p>
              <Link to="/admin/blogs/new" className="inline-flex items-center gap-2 text-champagne hover:underline">
                <Plus className="w-4 h-4" /> Create your first post
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {recentBlogs.map((blog) => (
                <Link
                  key={blog.id}
                  to={`/admin/blogs/${blog.id}/edit`}
                  className="flex items-center justify-between p-4 rounded-xl bg-ivory/[3%] hover:bg-ivory/[5%] transition-colors group"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-ivory font-medium truncate group-hover:text-champagne transition-colors">{blog.title}</p>
                    <p className="text-sm text-ivory/50">{blog.category}</p>
                  </div>
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                      blog.status === 'published'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-amber-500/20 text-amber-400'
                    }`}
                  >
                    {blog.status}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="bg-obsidian/50 border border-ivory/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-ivory">Recent Activity</h2>
          </div>

          {activities.length === 0 ? (
            <div className="text-center py-12">
              <Clock className="w-12 h-12 text-ivory/30 mx-auto mb-4" />
              <p className="text-ivory/60">No activity yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {activities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-champagne mt-2 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-ivory">
                      <span className="text-champagne capitalize">{activity.action}</span>{' '}
                      <span className="capitalize">{activity.type}</span>: {activity.itemName}
                    </p>
                    <p className="text-xs text-ivory/40 mt-1">
                      {formatTimeAgo(activity.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <Link
          to="/admin/blogs/new"
          className="group bg-champagne/10 border border-champagne/20 rounded-2xl p-6 hover:bg-champagne/20 transition-colors"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-champagne/20 flex items-center justify-center">
              <Plus className="w-6 h-6 text-champagne" />
            </div>
            <ArrowRight className="w-5 h-5 text-champagne/50 group-hover:text-champagne group-hover:translate-x-1 transition-all" />
          </div>
          <h3 className="text-lg font-semibold text-ivory mb-2">Create New Post</h3>
          <p className="text-sm text-ivory/60">Write and publish a new blog post</p>
        </Link>

        <Link
          to="/admin/categories"
          className="group bg-obsidian/50 border border-ivory/10 rounded-2xl p-6 hover:border-champagne/30 transition-colors"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-ivory/10 flex items-center justify-center">
              <FolderOpen className="w-6 h-6 text-ivory/70" />
            </div>
            <ArrowRight className="w-5 h-5 text-ivory/30 group-hover:text-champagne group-hover:translate-x-1 transition-all" />
          </div>
          <h3 className="text-lg font-semibold text-ivory mb-2">Manage Categories</h3>
          <p className="text-sm text-ivory/60">Organize your content categories</p>
        </Link>

        <Link
          to="/admin/invite-codes"
          className="group bg-obsidian/50 border border-ivory/10 rounded-2xl p-6 hover:border-champagne/30 transition-colors"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-ivory/10 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-ivory/70" />
            </div>
            <ArrowRight className="w-5 h-5 text-ivory/30 group-hover:text-champagne group-hover:translate-x-1 transition-all" />
          </div>
          <h3 className="text-lg font-semibold text-ivory mb-2">Invite Team Members</h3>
          <p className="text-sm text-ivory/60">Generate invite codes for collaborators</p>
        </Link>
      </div>
    </div>
  )
}

function formatTimeAgo(dateString) {
  const date = new Date(dateString)
  const now = new Date()
  const seconds = Math.floor((now - date) / 1000)

  if (seconds < 60) return 'Just now'
  if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`
  if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`
  return date.toLocaleDateString()
}

export default Dashboard
