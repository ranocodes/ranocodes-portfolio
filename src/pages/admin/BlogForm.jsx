import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { ArrowLeft, Save, Eye, Image as ImageIcon } from 'lucide-react'
import db from '../../services/database'
import MarkdownEditor from '../../components/admin/MarkdownEditor'

function BlogForm() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEditing = Boolean(id)

  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    fullContent: '',
    featuredImage: '',
    category: '',
    status: 'draft',
    readTime: '5 min read',
  })
  const [categories, setCategories] = useState([])
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)
  const [newCategory, setNewCategory] = useState('')

  useEffect(() => {
    setCategories(db.categories.getAll())
    
    if (isEditing) {
      const blog = db.blogs.getById(id)
      if (blog) {
        setFormData({
          title: blog.title,
          excerpt: blog.excerpt,
          fullContent: blog.fullContent,
          featuredImage: blog.featuredImage,
          category: blog.category,
          status: blog.status,
          readTime: blog.readTime,
        })
      }
    }
  }, [id, isEditing])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    if (errors[name]) {
      setErrors({ ...errors, [name]: null })
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.title.trim()) newErrors.title = 'Title is required'
    if (!formData.excerpt.trim()) newErrors.excerpt = 'Excerpt is required'
    if (!formData.fullContent.trim()) newErrors.fullContent = 'Content is required'
    if (!formData.category) newErrors.category = 'Category is required'
    return newErrors
  }

  const calculateReadTime = (content) => {
    const wordsPerMinute = 200
    const words = content.trim().split(/\s+/).length
    const minutes = Math.ceil(words / wordsPerMinute)
    return `${minutes} min read`
  }

  const handleContentChange = (content) => {
    setFormData({ 
      ...formData, 
      fullContent: content,
      readTime: calculateReadTime(content)
    })
  }

  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      db.categories.create(newCategory.trim())
      setCategories(db.categories.getAll())
      setFormData({ ...formData, category: newCategory.trim() })
      setNewCategory('')
    }
  }

  const handleSubmit = async (e, publishNow = false) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setSaving(true)

    try {
      const blogData = {
        ...formData,
        status: publishNow ? 'published' : formData.status,
      }

      if (isEditing) {
        db.blogs.update(id, blogData)
      } else {
        db.blogs.create(blogData)
      }

      navigate('/admin/blogs')
    } catch (err) {
      console.error('Error saving blog:', err)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <Link
          to="/admin/blogs"
          className="flex items-center gap-2 text-slate hover:text-ivory transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Posts
        </Link>
        
        <div className="flex items-center gap-3">
          <button
            onClick={(e) => handleSubmit(e, false)}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 bg-slate/30 text-ivory font-medium rounded-xl hover:bg-slate/50 transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : 'Save Draft'}
          </button>
          <button
            onClick={(e) => handleSubmit(e, true)}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 bg-champagne text-obsidian font-semibold rounded-xl hover:bg-champagne/90 transition-colors disabled:opacity-50"
          >
            <Eye className="w-4 h-4" />
            {formData.status === 'published' ? 'Update' : 'Publish'}
          </button>
        </div>
      </div>

      <h1 className="text-3xl font-bold text-ivory mb-8">
        {isEditing ? 'Edit Post' : 'Create New Post'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-slate/30 backdrop-blur-sm border border-ivory/10 rounded-2xl p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-ivory/80 mb-2">
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-slate/30 border rounded-xl text-ivory placeholder:text-slate focus:outline-none focus:ring-2 transition-colors ${
                errors.title 
                  ? 'border-red-500/50 focus:ring-red-500/20' 
                  : 'border-ivory/10 focus:border-champagne/50 focus:ring-champagne/20'
              }`}
              placeholder="Enter post title..."
            />
            {errors.title && (
              <p className="mt-2 text-sm text-red-400">{errors.title}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-ivory/80 mb-2">
              Excerpt *
            </label>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              rows={3}
              className={`w-full px-4 py-3 bg-slate/30 border rounded-xl text-ivory placeholder:text-slate focus:outline-none focus:ring-2 resize-none transition-colors ${
                errors.excerpt 
                  ? 'border-red-500/50 focus:ring-red-500/20' 
                  : 'border-ivory/10 focus:border-champagne/50 focus:ring-champagne/20'
              }`}
              placeholder="Brief description of the post..."
            />
            {errors.excerpt && (
              <p className="mt-2 text-sm text-red-400">{errors.excerpt}</p>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-ivory/80 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-slate/30 border rounded-xl text-ivory focus:outline-none focus:ring-2 transition-colors ${
                  errors.category 
                    ? 'border-red-500/50 focus:ring-red-500/20' 
                    : 'border-ivory/10 focus:border-champagne/50 focus:ring-champagne/20'
                }`}
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-2 text-sm text-red-400">{errors.category}</p>
              )}
              
              <div className="mt-3 flex gap-2">
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Add new category..."
                  className="flex-1 px-3 py-2 bg-slate/20 border border-ivory/10 rounded-lg text-ivory text-sm placeholder:text-slate focus:outline-none focus:border-champagne/50"
                />
                <button
                  type="button"
                  onClick={handleAddCategory}
                  className="px-3 py-2 bg-champagne/10 text-champagne text-sm rounded-lg hover:bg-champagne/20 transition-colors"
                >
                  Add
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-ivory/80 mb-2">
                Status
              </label>
              <div className="flex gap-3">
                {['draft', 'published'].map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setFormData({ ...formData, status })}
                    className={`flex-1 px-4 py-3 rounded-xl font-medium capitalize transition-colors ${
                      formData.status === status
                        ? status === 'published'
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                          : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                        : 'bg-slate/30 text-slate border border-ivory/10'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-ivory/80 mb-2">
              Featured Image URL
            </label>
            <div className="relative">
              <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate" />
              <input
                type="url"
                name="featuredImage"
                value={formData.featuredImage}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 bg-slate/30 border border-ivory/10 rounded-xl text-ivory placeholder:text-slate focus:outline-none focus:border-champagne/50 focus:ring-2 focus:ring-champagne/20 transition-colors"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            {formData.featuredImage && (
              <div className="mt-3 rounded-xl overflow-hidden h-48">
                <img
                  src={formData.featuredImage}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => e.target.style.display = 'none'}
                />
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-ivory/80">
              Content * (Markdown)
            </label>
            <span className="text-sm text-slate">
              Read time: {formData.readTime}
            </span>
          </div>
          <MarkdownEditor
            value={formData.fullContent}
            onChange={handleContentChange}
          />
          {errors.fullContent && (
            <p className="mt-2 text-sm text-red-400">{errors.fullContent}</p>
          )}
        </div>
      </form>
    </div>
  )
}

export default BlogForm
