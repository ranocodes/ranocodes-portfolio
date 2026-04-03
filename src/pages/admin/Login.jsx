import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Eye, EyeOff, Lock, Mail, User, Ticket } from 'lucide-react'

function Login() {
  const navigate = useNavigate()
  const { login, register, error, loading } = useAuth()
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    inviteCode: '',
  })
  const [formError, setFormError] = useState('')

  const users = JSON.parse(localStorage.getItem('admin_users') || '[]')
  const needsInviteCode = users.length > 0

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setFormError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError('')

    if (!formData.email || !formData.password) {
      setFormError('Please fill in all fields')
      return
    }

    if (!isLogin) {
      if (formData.password !== formData.confirmPassword) {
        setFormError('Passwords do not match')
        return
      }
      if (formData.password.length < 8) {
        setFormError('Password must be at least 8 characters')
        return
      }
      if (needsInviteCode && !formData.inviteCode) {
        setFormError('Invite code is required')
        return
      }
    }

    try {
      if (isLogin) {
        await login(formData.email, formData.password)
      } else {
        await register(formData.email, formData.password, formData.inviteCode || null)
      }
      navigate('/admin')
    } catch (err) {
      setFormError(err.message)
    }
  }

  return (
    <div className="min-h-screen bg-obsidian flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link to="/" className="inline-block mb-8">
            <span className="text-3xl font-serif italic text-ivory">Portfolio</span>
          </Link>
          <h1 className="text-3xl font-bold text-ivory mb-2">
            {isLogin ? 'Welcome back' : 'Create account'}
          </h1>
          <p className="text-slate">
            {isLogin
              ? 'Sign in to access the admin dashboard'
              : 'Join the team to manage content'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div className="flex items-center gap-3 px-4 py-3 bg-champagne/10 rounded-xl text-sm">
              <Ticket className="w-4 h-4 text-champagne" />
              <span className="text-ivory/80">
                {needsInviteCode
                  ? 'An invite code is required to register'
                  : 'First account will be created as admin'}
              </span>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-ivory/80 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3.5 bg-slate/30 border border-ivory/10 rounded-xl text-ivory placeholder:text-slate focus:outline-none focus:border-champagne/50 focus:ring-2 focus:ring-champagne/20 transition-all"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          {!isLogin && needsInviteCode && (
            <div>
              <label className="block text-sm font-medium text-ivory/80 mb-2">
                Invite Code
              </label>
              <div className="relative">
                <Ticket className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate" />
                <input
                  type="text"
                  name="inviteCode"
                  value={formData.inviteCode}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate/30 border border-ivory/10 rounded-xl text-ivory placeholder:text-slate focus:outline-none focus:border-champagne/50 focus:ring-2 focus:ring-champagne/20 transition-all font-mono uppercase"
                  placeholder="XXXXXXXX"
                  maxLength={8}
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-ivory/80 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-12 pr-12 py-3.5 bg-slate/30 border border-ivory/10 rounded-xl text-ivory placeholder:text-slate focus:outline-none focus:border-champagne/50 focus:ring-2 focus:ring-champagne/20 transition-all"
                placeholder="••••••••"
                required
                minLength={8}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate hover:text-ivory transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-ivory/80 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate/30 border border-ivory/10 rounded-xl text-ivory placeholder:text-slate focus:outline-none focus:border-champagne/50 focus:ring-2 focus:ring-champagne/20 transition-all"
                  placeholder="••••••••"
                  required
                  minLength={8}
                />
              </div>
            </div>
          )}

          {(formError || error) && (
            <div className="px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
              {formError || error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-champagne text-obsidian font-semibold rounded-xl hover:bg-champagne/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Please wait...' : isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin)
              setFormError('')
              setFormData({ email: '', password: '', confirmPassword: '', inviteCode: '' })
            }}
            className="text-champagne hover:text-champagne/80 transition-colors text-sm"
          >
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
