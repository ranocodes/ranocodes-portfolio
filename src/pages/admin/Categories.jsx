import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react'
import db from '../../services/database'
import DeleteModal from '../../components/admin/DeleteModal'

function Categories() {
  const [categories, setCategories] = useState([])
  const [editing, setEditing] = useState(null)
  const [newCategory, setNewCategory] = useState('')
  const [deleteModal, setDeleteModal] = useState({ open: false, category: null })

  useEffect(() => {
    setCategories(db.categories.getAll())
  }, [])

  const handleAdd = () => {
    if (!newCategory.trim()) return
    if (categories.includes(newCategory.trim())) {
      alert('Category already exists')
      return
    }
    db.categories.create(newCategory.trim())
    setCategories(db.categories.getAll())
    setNewCategory('')
  }

  const handleEdit = (oldName) => {
    const input = document.getElementById(`edit-${oldName}`)
    const newName = input.value.trim()
    if (!newName) return
    if (newName !== oldName && categories.includes(newName)) {
      alert('Category already exists')
      return
    }
    db.categories.update(oldName, newName)
    setCategories(db.categories.getAll())
    setEditing(null)
  }

  const handleDelete = () => {
    if (deleteModal.category) {
      db.categories.delete(deleteModal.category)
      setCategories(db.categories.getAll())
      setDeleteModal({ open: false, category: null })
    }
  }

  const getCategoryCount = (category) => {
    const blogs = db.blogs.getAll()
    return blogs.filter(b => b.category === category).length
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-ivory mb-2">Categories</h1>
        <p className="text-ivory/60">Manage your blog post categories</p>
      </div>

      <div className="bg-obsidian/50 border border-ivory/10 rounded-2xl p-6">
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            placeholder="New category name..."
            className="flex-1 px-4 py-3 bg-obsidian/50 border border-ivory/10 rounded-xl text-ivory placeholder:text-ivory/40 focus:outline-none focus:border-champagne/50 transition-colors"
          />
          <button
            onClick={handleAdd}
            disabled={!newCategory.trim()}
            className="flex items-center gap-2 px-5 py-3 bg-champagne text-obsidian font-semibold rounded-xl hover:bg-champagne/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="w-5 h-5" />
            Add
          </button>
        </div>

        <div className="space-y-2">
          {categories.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-ivory/60">No categories yet</p>
              <p className="text-sm text-ivory/40 mt-1">Add your first category above</p>
            </div>
          ) : (
            categories.map((category) => (
              <div
                key={category}
                className="flex items-center justify-between p-4 rounded-xl bg-ivory/[3%] hover:bg-ivory/[5%] transition-colors group"
              >
                {editing === category ? (
                  <div className="flex items-center gap-2 flex-1">
                    <input
                      id={`edit-${category}`}
                      type="text"
                      defaultValue={category}
                      className="flex-1 px-3 py-2 bg-obsidian/50 border border-ivory/10 rounded-lg text-ivory focus:outline-none focus:border-champagne/50"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleEdit(category)
                        if (e.key === 'Escape') setEditing(null)
                      }}
                      autoFocus
                    />
                    <button
                      onClick={() => handleEdit(category)}
                      className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg hover:bg-emerald-500/30 transition-colors"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setEditing(null)}
                      className="p-2 text-ivory/50 hover:text-ivory rounded-lg hover:bg-ivory/10 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-4">
                      <span className="text-ivory font-medium">{category}</span>
                      <span className="text-sm text-ivory/50">
                        {getCategoryCount(category)} posts
                      </span>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => setEditing(category)}
                        className="p-2 text-ivory/50 hover:text-champagne hover:bg-champagne/10 rounded-lg transition-colors"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteModal({ open: true, category })}
                        className="p-2 text-ivory/50 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      <DeleteModal
        open={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, category: null })}
        onConfirm={handleDelete}
        title={deleteModal.category}
        type="category"
      />
    </div>
  )
}

export default Categories
