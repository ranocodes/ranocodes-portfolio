import { useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Plus, Search, Pencil, Trash2, Eye, MoreHorizontal, Send } from 'lucide-react'
import db from '../../services/database'
import DeleteModal from '../../components/admin/DeleteModal'

function BlogList() {
  const navigate = useNavigate()
  const [blogs, setBlogs] = useState(db.blogs.getAll())
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [deleteModal, setDeleteModal] = useState({ open: false, blog: null })
  const [activeMenu, setActiveMenu] = useState(null)

  const filteredBlogs = useMemo(() => {
    return blogs.filter(blog => {
      const matchesSearch = blog.title.toLowerCase().includes(search.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(search.toLowerCase())
      const matchesFilter = filter === 'all' || blog.status === filter
      return matchesSearch && matchesFilter
    })
  }, [blogs, search, filter])

  const handleDelete = () => {
    if (deleteModal.blog) {
      db.blogs.delete(deleteModal.blog.id)
      setBlogs(db.blogs.getAll())
      setDeleteModal({ open: false, blog: null })
    }
  }

  const toggleStatus = (blog) => {
    const newStatus = blog.status === 'published' ? 'draft' : 'published'
    db.blogs.update(blog.id, { status: newStatus })
    setBlogs(db.blogs.getAll())
    setActiveMenu(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-ivory mb-2">Blog Posts</h1>
          <p className="text-slate">{filteredBlogs.length} posts total</p>
        </div>
        <Link
          to="/admin/blogs/new"
          className="inline-flex items-center gap-2 px-5 py-3 bg-champagne text-obsidian font-semibold rounded-xl hover:bg-champagne/90 transition-colors"
        >
          <Plus className="w-5 h-5" />
          New Post
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate" />
          <input
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate/30 border border-ivory/10 rounded-xl text-ivory placeholder:text-slate focus:outline-none focus:border-champagne/50 transition-colors"
          />
        </div>
        <div className="flex gap-2">
          {['all', 'published', 'draft'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-3 rounded-xl font-medium transition-colors capitalize ${
                filter === status
                  ? 'bg-champagne text-obsidian'
                  : 'bg-slate/30 text-slate hover:text-ivory'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-slate/30 backdrop-blur-sm border border-ivory/10 rounded-2xl overflow-hidden">
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-slate mb-4">No posts found</p>
            <Link
              to="/admin/blogs/new"
              className="text-champagne hover:underline"
            >
              Create your first post
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-ivory/10">
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate">Post</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate hidden md:table-cell">Category</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate hidden lg:table-cell">Status</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate hidden sm:table-cell">Date</th>
                  <th className="text-right px-6 py-4 text-sm font-semibold text-slate">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBlogs.map((blog) => (
                  <tr key={blog.id} className="border-b border-ivory/5 hover:bg-ivory/5 transition-colors">
                    <td className="px-6 py-4">
                      <Link
                        to={`/admin/blogs/${blog.id}/edit`}
                        className="block"
                      >
                        <p className="font-medium text-ivory hover:text-champagne transition-colors">
                          {blog.title}
                        </p>
                        <p className="text-sm text-slate line-clamp-1">{blog.excerpt}</p>
                      </Link>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <span className="px-3 py-1 text-xs bg-champagne/10 text-champagne rounded-full">
                        {blog.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 hidden lg:table-cell">
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${
                          blog.status === 'published'
                            ? 'bg-green-500/10 text-green-400'
                            : 'bg-yellow-500/10 text-yellow-400'
                        }`}
                      >
                        {blog.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate hidden sm:table-cell">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => toggleStatus(blog)}
                          className="p-2 text-slate hover:text-ivory hover:bg-ivory/10 rounded-lg transition-colors"
                          title={blog.status === 'published' ? 'Unpublish' : 'Publish'}
                        >
                          {blog.status === 'published' ? <Eye className="w-4 h-4" /> : <Send className="w-4 h-4" />}
                        </button>
                        <Link
                          to={`/admin/blogs/${blog.id}/edit`}
                          className="p-2 text-slate hover:text-champagne hover:bg-champagne/10 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => setDeleteModal({ open: true, blog })}
                          className="p-2 text-slate hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <DeleteModal
        open={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, blog: null })}
        onConfirm={handleDelete}
        title={deleteModal.blog?.title}
        type="blog post"
      />
    </div>
  )
}

export default BlogList
