import { useState, useMemo, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Search, Pencil, Trash2, Eye, Send } from 'lucide-react'
import db from '../../services/database'
import DeleteModal from '../../components/admin/DeleteModal'

function BlogList() {
  const [blogs, setBlogs] = useState([])
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [deleteModal, setDeleteModal] = useState({ open: false, blog: null })

  const fetchBlogs = useCallback(() => {
    setBlogs(db.blogs.getAll())
  }, [])

  useEffect(() => {
    fetchBlogs()
  }, [fetchBlogs])

  const filteredBlogs = useMemo(() => {
    return blogs.filter(blog => {
      const title = blog.title || ''
      const excerpt = blog.excerpt || ''
      const matchesSearch = title.toLowerCase().includes(search.toLowerCase()) ||
        excerpt.toLowerCase().includes(search.toLowerCase())
      const matchesFilter = filter === 'all' || blog.status === filter
      return matchesSearch && matchesFilter
    })
  }, [blogs, search, filter])

  const handleDelete = () => {
    if (deleteModal.blog) {
      db.blogs.delete(deleteModal.blog.id)
      fetchBlogs()
      setDeleteModal({ open: false, blog: null })
    }
  }

  const toggleStatus = (blog) => {
    const newStatus = blog.status === 'published' ? 'draft' : 'published'
    db.blogs.update(blog.id, { status: newStatus })
    fetchBlogs()
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-ivory mb-2">Blog Posts</h1>
          <p className="text-ivory/60">{filteredBlogs.length} posts total</p>
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
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ivory/40" />
          <input
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-obsidian/50 border border-ivory/10 rounded-xl text-ivory placeholder:text-ivory/40 focus:outline-none focus:border-champagne/50 transition-colors"
          />
        </div>
        <div className="flex gap-2">
          {['all', 'published', 'draft'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-3 rounded-xl font-medium transition-colors capitalize ${filter === status
                ? 'bg-champagne text-obsidian'
                : 'bg-obsidian/50 text-ivory/70 hover:text-ivory border border-ivory/10'
                }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-obsidian/50 border border-ivory/10 rounded-2xl overflow-hidden">
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-ivory/60 mb-4">No posts found</p>
            <Link to="/admin/blogs/new" className="text-champagne hover:underline">
              Create your first post
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-ivory/10">
                  <th className="text-left px-6 py-4 text-xs font-semibold text-ivory/50 uppercase tracking-wider">Post</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-ivory/50 uppercase tracking-wider hidden md:table-cell">Category</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-ivory/50 uppercase tracking-wider hidden lg:table-cell">Status</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-ivory/50 uppercase tracking-wider hidden sm:table-cell">Date</th>
                  <th className="text-right px-6 py-4 text-xs font-semibold text-ivory/50 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBlogs.map((blog) => (
                  <tr key={blog.id} className="border-b border-ivory/5 hover:bg-ivory/[3%] transition-colors">
                    <td className="px-6 py-4">
                      <Link to={`/admin/blogs/${blog.id}/edit`} className="block">
                        <p className="font-medium text-ivory hover:text-champagne transition-colors">
                          {blog.title}
                        </p>
                        <p className="text-sm text-ivory/50 line-clamp-1">{blog.excerpt}</p>
                      </Link>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <span className="px-3 py-1 text-xs bg-champagne/10 text-champagne rounded-full">
                        {blog.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 hidden lg:table-cell">
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${blog.status === 'published'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-amber-500/20 text-amber-400'
                          }`}
                      >
                        {blog.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-ivory/50 hidden sm:table-cell">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => toggleStatus(blog)}
                          className="p-2 text-ivory/50 hover:text-ivory hover:bg-ivory/10 rounded-lg transition-colors"
                          title={blog.status === 'published' ? 'Unpublish' : 'Publish'}
                        >
                          {blog.status === 'published' ? <Eye className="w-4 h-4" /> : <Send className="w-4 h-4" />}
                        </button>
                        <Link
                          to={`/admin/blogs/${blog.id}/edit`}
                          className="p-2 text-ivory/50 hover:text-champagne hover:bg-champagne/10 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => setDeleteModal({ open: true, blog })}
                          className="p-2 text-ivory/50 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
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
