import { Link } from 'react-router-dom'
import { FileText, FolderOpen, Send, TrendingUp, Clock } from 'lucide-react'
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
      color: 'from-champagne to-champagne/60',
    },
    {
      label: 'Published',
      value: blogs.filter(b => b.status === 'published').length,
      icon: Send,
      color: 'from-green-500 to-green-400',
    },
    {
      label: 'Drafts',
      value: blogs.filter(b => b.status === 'draft').length,
      icon: Clock,
      color: 'from-yellow-500 to-yellow-400',
    },
    {
      label: 'Categories',
      value: categories.length,
      icon: FolderOpen,
      color: 'from-purple-500 to-purple-400',
    },
  ]

  const recentBlogs = blogs.slice(0, 5)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-ivory mb-2">Dashboard</h1>
        <p className="text-slate">Welcome back! Here's what's happening with your content.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-slate/30 backdrop-blur-sm border border-ivory/10 rounded-2xl p-6 hover:border-champagne/20 transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} p-3`}>
                <stat.icon className="w-full h-full text-obsidian" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <p className="text-3xl font-bold text-ivory mb-1">{stat.value}</p>
            <p className="text-sm text-slate">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-slate/30 backdrop-blur-sm border border-ivory/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-ivory">Recent Posts</h2>
            <Link to="/admin/blogs" className="text-sm text-champagne hover:text-champagne/80 transition-colors">
              View all
            </Link>
          </div>

          {recentBlogs.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-slate mx-auto mb-4" />
              <p className="text-slate">No posts yet</p>
              <Link to="/admin/blogs/new" className="text-champagne text-sm hover:underline">
                Create your first post
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {recentBlogs.map((blog) => (
                <Link
                  key={blog.id}
                  to={`/admin/blogs/${blog.id}/edit`}
                  className="flex items-center justify-between p-4 rounded-xl bg-ivory/5 hover:bg-ivory/10 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-ivory font-medium truncate">{blog.title}</p>
                    <p className="text-sm text-slate">{blog.category}</p>
                  </div>
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                      blog.status === 'published'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}
                  >
                    {blog.status}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="bg-slate/30 backdrop-blur-sm border border-ivory/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-ivory">Recent Activity</h2>
          </div>

          {activities.length === 0 ? (
            <div className="text-center py-12">
              <Clock className="w-12 h-12 text-slate mx-auto mb-4" />
              <p className="text-slate">No activity yet</p>
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
                    <p className="text-xs text-slate mt-1">
                      {formatTimeAgo(activity.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          to="/admin/blogs/new"
          className="bg-champagne/10 border border-champagne/20 rounded-2xl p-8 text-center hover:bg-champagne/20 transition-colors group"
        >
          <FileText className="w-12 h-12 text-champagne mx-auto mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-lg font-semibold text-ivory mb-2">Create New Post</h3>
          <p className="text-sm text-slate">Write and publish a new blog post</p>
        </Link>

        <Link
          to="/admin/categories"
          className="bg-slate/30 border border-ivory/10 rounded-2xl p-8 text-center hover:border-champagne/20 transition-colors group"
        >
          <FolderOpen className="w-12 h-12 text-slate mx-auto mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-lg font-semibold text-ivory mb-2">Manage Categories</h3>
          <p className="text-sm text-slate">Organize your content categories</p>
        </Link>

        <Link
          to="/admin/invite-codes"
          className="bg-slate/30 border border-ivory/10 rounded-2xl p-8 text-center hover:border-champagne/20 transition-colors group"
        >
          <TrendingUp className="w-12 h-12 text-slate mx-auto mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-lg font-semibold text-ivory mb-2">Invite Team Members</h3>
          <p className="text-sm text-slate">Generate invite codes for collaborators</p>
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
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`
  if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`
  return date.toLocaleDateString()
}

export default Dashboard
