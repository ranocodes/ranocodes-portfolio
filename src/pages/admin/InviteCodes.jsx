import { useState, useEffect } from 'react'
import { Plus, Copy, Trash2, Check, Clock, User, Ticket } from 'lucide-react'
import db from '../../services/database'
import DeleteModal from '../../components/admin/DeleteModal'

function InviteCodes() {
  const [codes, setCodes] = useState([])
  const [copied, setCopied] = useState(null)
  const [deleteModal, setDeleteModal] = useState({ open: false, code: null })

  useEffect(() => {
    setCodes(db.inviteCodes.getAll())
  }, [])

  const handleGenerate = () => {
    const newCode = db.inviteCodes.generate()
    setCodes(db.inviteCodes.getAll())
    setCopied(newCode.code)
    setTimeout(() => setCopied(null), 2000)
  }

  const handleCopy = async (code) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(code)
      setTimeout(() => setCopied(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleDelete = () => {
    if (deleteModal.code) {
      db.inviteCodes.delete(deleteModal.code)
      setCodes(db.inviteCodes.getAll())
      setDeleteModal({ open: false, code: null })
    }
  }

  const isExpired = (code) => {
    return code.expiresAt && new Date(code.expiresAt) < new Date()
  }

  const isValid = (code) => {
    return !code.used && !isExpired(code)
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-ivory mb-2">Invite Codes</h1>
          <p className="text-ivory/60">Generate codes to invite new team members</p>
        </div>
        <button
          onClick={handleGenerate}
          className="inline-flex items-center gap-2 px-5 py-3 bg-champagne text-obsidian font-semibold rounded-xl hover:bg-champagne/90 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Generate Code
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-4 md:gap-6">
        <div className="bg-obsidian/50 border border-ivory/10 rounded-2xl p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <Check className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-ivory">
                {codes.filter(c => isValid(c)).length}
              </p>
              <p className="text-sm text-ivory/60">Active Codes</p>
            </div>
          </div>
        </div>

        <div className="bg-obsidian/50 border border-ivory/10 rounded-2xl p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center">
              <Ticket className="w-6 h-6 text-violet-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-ivory">
                {codes.filter(c => c.used).length}
              </p>
              <p className="text-sm text-ivory/60">Used Codes</p>
            </div>
          </div>
        </div>

        <div className="bg-obsidian/50 border border-ivory/10 rounded-2xl p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
              <Clock className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-ivory">
                {codes.filter(c => isExpired(c)).length}
              </p>
              <p className="text-sm text-ivory/60">Expired Codes</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-obsidian/50 border border-ivory/10 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-ivory/10">
          <h2 className="text-lg font-semibold text-ivory">All Codes</h2>
        </div>

        {codes.length === 0 ? (
          <div className="text-center py-16">
            <Ticket className="w-12 h-12 text-ivory/30 mx-auto mb-4" />
            <p className="text-ivory/60 mb-4">No invite codes yet</p>
            <button onClick={handleGenerate} className="text-champagne hover:underline">
              Generate your first code
            </button>
          </div>
        ) : (
          <div className="divide-y divide-ivory/5">
            {codes.map((code) => (
              <div key={code.code} className="p-6 hover:bg-ivory/[3%] transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="font-mono text-lg text-champagne tracking-wider">
                      {code.code}
                    </div>
                    <div className="flex items-center gap-2">
                      {code.used ? (
                        <span className="flex items-center gap-1 px-2 py-1 text-xs bg-violet-500/10 text-violet-400 rounded-full">
                          <User className="w-3 h-3" />
                          Used
                        </span>
                      ) : isExpired(code) ? (
                        <span className="flex items-center gap-1 px-2 py-1 text-xs bg-red-500/10 text-red-400 rounded-full">
                          <Clock className="w-3 h-3" />
                          Expired
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 px-2 py-1 text-xs bg-emerald-500/10 text-emerald-400 rounded-full">
                          <Check className="w-3 h-3" />
                          Active
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(code.code)}
                      disabled={!isValid(code)}
                      className="flex items-center gap-2 px-3 py-2 text-sm bg-obsidian/50 text-ivory rounded-lg hover:bg-ivory/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {copied === code.code ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-400" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => setDeleteModal({ open: true, code: code.code })}
                      className="p-2 text-ivory/50 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-4 text-xs text-ivory/40">
                  <span>Created: {new Date(code.createdAt).toLocaleString()}</span>
                  {code.used && code.usedAt && (
                    <span>Used: {new Date(code.usedAt).toLocaleString()}</span>
                  )}
                  {code.expiresAt && (
                    <span>Expires: {new Date(code.expiresAt).toLocaleString()}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <DeleteModal
        open={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, code: null })}
        onConfirm={handleDelete}
        title={deleteModal.code}
        type="invite code"
      />
    </div>
  )
}

export default InviteCodes
