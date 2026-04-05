import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { User, Lock, Save, Check } from 'lucide-react'

function Settings() {
  const { user, updateProfile } = useAuth()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [message, setMessage] = useState({ type: '', text: '' })

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || '',
      }))
    }
  }, [user])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setMessage({ type: '', text: '' })
  }

  const handleProfileUpdate = async (e) => {
    e.preventDefault()
    if (!formData.name.trim()) {
      setMessage({ type: 'error', text: 'Name is required' })
      return
    }
    await updateProfile({ name: formData.name })
    setMessage({ type: 'success', text: 'Profile updated successfully' })
  }

  const handlePasswordUpdate = async (e) => {
    e.preventDefault()
    if (formData.currentPassword !== user?.password) {
      setMessage({ type: 'error', text: 'Current password is incorrect' })
      return
    }
    if (formData.newPassword.length < 8) {
      setMessage({ type: 'error', text: 'New password must be at least 8 characters' })
      return
    }
    if (formData.newPassword !== formData.confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match' })
      return
    }
    await updateProfile({ password: formData.newPassword })
    setFormData({ ...formData, currentPassword: '', newPassword: '', confirmPassword: '' })
    setMessage({ type: 'success', text: 'Password updated successfully' })
  }

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold text-ivory mb-2">Settings</h1>
        <p className="text-ivory/60">Manage your account settings</p>
      </div>

      {message.text && (
        <div
          className={`flex items-center gap-3 px-4 py-3 rounded-xl ${message.type === 'success'
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
              : 'bg-red-500/10 text-red-400 border border-red-500/20'
            }`}
        >
          {message.type === 'success' && <Check className="w-5 h-5" />}
          {message.text}
        </div>
      )}

      <div className="bg-obsidian/50 border border-ivory/10 rounded-2xl p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-xl bg-champagne/10 flex items-center justify-center">
            <User className="w-6 h-6 text-champagne" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-ivory">Profile Information</h2>
            <p className="text-sm text-ivory/60">Update your personal details</p>
          </div>
        </div>

        <form onSubmit={handleProfileUpdate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-ivory/80 mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-obsidian/50 border border-ivory/10 rounded-xl text-ivory focus:outline-none focus:border-champagne/50 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ivory/80 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              disabled
              className="w-full px-4 py-3 bg-obsidian/30 border border-ivory/10 rounded-xl text-ivory/50 cursor-not-allowed"
            />
            <p className="mt-1 text-xs text-ivory/40">Email cannot be changed</p>
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-3 bg-champagne text-obsidian font-semibold rounded-xl hover:bg-champagne/90 transition-colors"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </form>
      </div>

      <div className="bg-obsidian/50 border border-ivory/10 rounded-2xl p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-xl bg-champagne/10 flex items-center justify-center">
            <Lock className="w-6 h-6 text-champagne" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-ivory">Change Password</h2>
            <p className="text-sm text-ivory/60">Update your password</p>
          </div>
        </div>

        <form onSubmit={handlePasswordUpdate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-ivory/80 mb-2">
              Current Password
            </label>
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-obsidian/50 border border-ivory/10 rounded-xl text-ivory focus:outline-none focus:border-champagne/50 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ivory/80 mb-2">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              minLength={8}
              className="w-full px-4 py-3 bg-obsidian/50 border border-ivory/10 rounded-xl text-ivory focus:outline-none focus:border-champagne/50 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ivory/80 mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-obsidian/50 border border-ivory/10 rounded-xl text-ivory focus:outline-none focus:border-champagne/50 transition-colors"
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-3 bg-ivory/10 text-ivory font-medium rounded-xl hover:bg-ivory/20 transition-colors"
          >
            <Lock className="w-4 h-4" />
            Update Password
          </button>
        </form>
      </div>
    </div>
  )
}

export default Settings
