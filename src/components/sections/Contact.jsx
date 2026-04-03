import { useState } from 'react'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import Card from '../ui/Card'
import { Input, Textarea } from '../ui/Input'
import MagneticButton from '../ui/MagneticButton'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [submissions, setSubmissions] = useLocalStorage('portfolio_submissions', [])

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required'
    return newErrors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    const submission = {
      ...formData,
      timestamp: new Date().toISOString(),
      id: Date.now(),
    }

    setSubmissions([...submissions, submission])
    setStatus('success')
    setFormData({ name: '', email: '', project: '', message: '' })

    setTimeout(() => setStatus('idle'), 5000)
  }

  return (
    <section id="contact" className="py-32 px-6 md:px-12 lg:px-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-mono text-champagne text-sm uppercase tracking-widest mb-4">Contact</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif italic mb-6">
            Let's <span className="text-champagne">Work Together</span>
          </h2>
          <p className="text-slate max-w-xl mx-auto">
            Have a project in mind? Let's discuss how I can help bring your vision to life.
          </p>
        </div>

        <Card className="p-8 md:p-12">
          {status === 'success' ? (
            <div className="text-center py-12">
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold mb-4">Message Sent!</h3>
              <p className="text-slate">
                Thank you for reaching out. I'll get back to you within 24-48 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    error={errors.name}
                  />
                  {errors.name && (
                    <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" /> {errors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    error={errors.email}
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" /> {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="project" className="block text-sm font-medium mb-2">
                  Project Type <span className="text-slate">(optional)</span>
                </label>
                <Input
                  id="project"
                  name="project"
                  value={formData.project}
                  onChange={handleChange}
                  placeholder="Web development, E-commerce, etc."
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  error={errors.message}
                />
                {errors.message && (
                  <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" /> {errors.message}
                  </p>
                )}
              </div>

              <MagneticButton type="submit" size="lg" className="w-full md:w-auto">
                Send Message
                <Send className="w-4 h-4" />
              </MagneticButton>
            </form>
          )}
        </Card>
      </div>
    </section>
  )
}

export default Contact
