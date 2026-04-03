import { v4 as uuidv4 } from 'uuid'

const STORAGE_KEYS = {
  BLOGS: 'admin_blogs',
  CATEGORIES: 'admin_categories',
  USERS: 'admin_users',
  INVITE_CODES: 'admin_invite_codes',
  ACTIVITY: 'admin_activity',
}

export const db = {
  blogs: {
    getAll: () => {
      const data = localStorage.getItem(STORAGE_KEYS.BLOGS)
      return data ? JSON.parse(data) : []
    },
    getById: (id) => {
      const blogs = db.blogs.getAll()
      return blogs.find(b => b.id === id)
    },
    getBySlug: (slug) => {
      const blogs = db.blogs.getAll()
      return blogs.find(b => b.slug === slug)
    },
    create: (blog) => {
      const blogs = db.blogs.getAll()
      const newBlog = {
        ...blog,
        id: uuidv4(),
        slug: generateSlug(blog.title),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      blogs.unshift(newBlog)
      localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(blogs))
      db.activity.log('created', 'blog', newBlog.id, newBlog.title)
      return newBlog
    },
    update: (id, updates) => {
      const blogs = db.blogs.getAll()
      const index = blogs.findIndex(b => b.id === id)
      if (index === -1) return null
      const updated = {
        ...blogs[index],
        ...updates,
        slug: updates.title ? generateSlug(updates.title) : blogs[index].slug,
        updatedAt: new Date().toISOString(),
      }
      blogs[index] = updated
      localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(blogs))
      db.activity.log('updated', 'blog', id, updated.title)
      return updated
    },
    delete: (id) => {
      const blogs = db.blogs.getAll()
      const blog = blogs.find(b => b.id === id)
      if (!blog) return false
      const filtered = blogs.filter(b => b.id !== id)
      localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(filtered))
      db.activity.log('deleted', 'blog', id, blog.title)
      return true
    },
  },

  categories: {
    getAll: () => {
      const data = localStorage.getItem(STORAGE_KEYS.CATEGORIES)
      return data ? JSON.parse(data) : ['Development', 'Design', 'Animation', 'Backend', 'Frontend']
    },
    create: (category) => {
      const categories = db.categories.getAll()
      if (categories.includes(category)) return false
      categories.push(category)
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories))
      db.activity.log('created', 'category', null, category)
      return true
    },
    update: (oldName, newName) => {
      const categories = db.categories.getAll()
      const index = categories.indexOf(oldName)
      if (index === -1) return false
      categories[index] = newName
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories))
      db.activity.log('updated', 'category', null, `${oldName} → ${newName}`)
      return true
    },
    delete: (category) => {
      const categories = db.categories.getAll()
      const filtered = categories.filter(c => c !== category)
      if (filtered.length === categories.length) return false
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(filtered))
      db.activity.log('deleted', 'category', null, category)
      return true
    },
  },

  users: {
    getAll: () => {
      const data = localStorage.getItem(STORAGE_KEYS.USERS)
      return data ? JSON.parse(data) : []
    },
    getById: (id) => {
      const users = db.users.getAll()
      return users.find(u => u.id === id)
    },
    create: (user) => {
      const users = db.users.getAll()
      const isFirst = users.length === 0
      const newUser = {
        ...user,
        id: uuidv4(),
        role: isFirst ? 'admin' : 'user',
        createdAt: new Date().toISOString(),
      }
      users.push(newUser)
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users))
      return newUser
    },
    update: (id, updates) => {
      const users = db.users.getAll()
      const index = users.findIndex(u => u.id === id)
      if (index === -1) return null
      const updated = { ...users[index], ...updates }
      users[index] = updated
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users))
      return updated
    },
    delete: (id) => {
      const users = db.users.getAll()
      const filtered = users.filter(u => u.id !== id)
      if (filtered.length === users.length) return false
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(filtered))
      return true
    },
  },

  inviteCodes: {
    getAll: () => {
      const data = localStorage.getItem(STORAGE_KEYS.INVITE_CODES)
      return data ? JSON.parse(data) : []
    },
    generate: (expiresIn = null) => {
      const codes = db.inviteCodes.getAll()
      const code = {
        code: generateInviteCode(),
        createdAt: new Date().toISOString(),
        expiresAt: expiresIn ? new Date(Date.now() + expiresIn).toISOString() : null,
        used: false,
        usedBy: null,
      }
      codes.unshift(code)
      localStorage.setItem(STORAGE_KEYS.INVITE_CODES, JSON.stringify(codes))
      return code
    },
    validate: (code) => {
      const codes = db.inviteCodes.getAll()
      const found = codes.find(c => c.code === code)
      if (!found) return { valid: false, reason: 'Code not found' }
      if (found.used) return { valid: false, reason: 'Code already used' }
      if (found.expiresAt && new Date(found.expiresAt) < new Date()) {
        return { valid: false, reason: 'Code expired' }
      }
      return { valid: true, code: found }
    },
    use: (code, userId) => {
      const codes = db.inviteCodes.getAll()
      const index = codes.findIndex(c => c.code === code)
      if (index === -1) return false
      codes[index].used = true
      codes[index].usedBy = userId
      codes[index].usedAt = new Date().toISOString()
      localStorage.setItem(STORAGE_KEYS.INVITE_CODES, JSON.stringify(codes))
      return true
    },
    delete: (code) => {
      const codes = db.inviteCodes.getAll()
      const filtered = codes.filter(c => c.code !== code)
      localStorage.setItem(STORAGE_KEYS.INVITE_CODES, JSON.stringify(filtered))
      return true
    },
  },

  activity: {
    getAll: (limit = 50) => {
      const data = localStorage.getItem(STORAGE_KEYS.ACTIVITY)
      const activities = data ? JSON.parse(data) : []
      return activities.slice(0, limit)
    },
    log: (action, type, itemId, itemName) => {
      const activities = db.activity.getAll(100)
      const entry = {
        id: uuidv4(),
        action,
        type,
        itemId,
        itemName,
        timestamp: new Date().toISOString(),
      }
      activities.unshift(entry)
      localStorage.setItem(STORAGE_KEYS.ACTIVITY, JSON.stringify(activities.slice(0, 100)))
    },
  },
}

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    + '-' + Date.now().toString(36)
}

function generateInviteCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = ''
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

export default db
