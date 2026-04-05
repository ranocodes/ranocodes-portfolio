import { useState, useEffect, useRef, useCallback } from 'react'
import ReactMarkdown from 'react-markdown'
import {
  Bold, Italic, Heading1, Heading2, Link as LinkIcon,
  Image, List, ListOrdered, Quote, Code, Eye, EyeOff, Save
} from 'lucide-react'

function MarkdownEditor({ value, onChange }) {
  const textareaRef = useRef(null)
  const previewRef = useRef(null)
  const [showPreview, setShowPreview] = useState(true)
  const [splitView, setSplitView] = useState(true)

  const insertText = useCallback((before, after = '', placeholder = '') => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end) || placeholder
    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end)

    onChange(newText)

    setTimeout(() => {
      textarea.focus()
      const newCursorPos = start + before.length + selectedText.length
      textarea.setSelectionRange(
        start + before.length,
        newCursorPos
      )
    }, 0)
  }, [value, onChange])

  const handleKeyDown = useCallback((e) => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key.toLowerCase()) {
        case 'b':
          e.preventDefault()
          insertText('**', '**', 'bold text')
          break
        case 'i':
          e.preventDefault()
          insertText('*', '*', 'italic text')
          break
        case 'k':
          e.preventDefault()
          insertText('[', '](url)', 'link text')
          break
        case 's':
          e.preventDefault()
          break
      }
    }
  }, [insertText])

  const toolbar = [
    { icon: Bold, action: () => insertText('**', '**', 'bold'), title: 'Bold (Ctrl+B)' },
    { icon: Italic, action: () => insertText('*', '*', 'italic'), title: 'Italic (Ctrl+I)' },
    { icon: Heading1, action: () => insertText('\n# ', '', 'Heading 1'), title: 'Heading 1' },
    { icon: Heading2, action: () => insertText('\n## ', '', 'Heading 2'), title: 'Heading 2' },
    { icon: LinkIcon, action: () => insertText('[', '](url)', 'link text'), title: 'Link (Ctrl+K)' },
    { icon: Image, action: () => insertText('![alt](', ')', 'image-url'), title: 'Image' },
    { icon: List, action: () => insertText('\n- ', '', 'list item'), title: 'Bullet List' },
    { icon: ListOrdered, action: () => insertText('\n1. ', '', 'list item'), title: 'Numbered List' },
    { icon: Quote, action: () => insertText('\n> ', '', 'quote'), title: 'Quote' },
    { icon: Code, action: () => insertText('`', '`', 'code'), title: 'Inline Code' },
  ]

  return (
    <div className="border border-ivory/10 rounded-2xl overflow-hidden bg-obsidian/40 backdrop-blur-md">
      <div className="flex items-center justify-between px-4 py-3 border-b border-ivory/10 bg-ivory/[2%]">
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          {toolbar.map((tool, i) => (
            <button
              key={i}
              type="button"
              onClick={tool.action}
              title={tool.title}
              className="p-2 text-ivory/50 hover:text-champagne hover:bg-ivory/10 rounded-lg transition-all duration-200"
            >
              <tool.icon className="w-4 h-4" />
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 border-l border-ivory/10 pl-4 ml-2">
          <button
            type="button"
            onClick={() => setSplitView(!splitView)}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all duration-200 ${splitView ? 'bg-champagne/20 text-champagne' : 'text-ivory/50 hover:text-ivory hover:bg-ivory/10'
              }`}
          >
            Split
          </button>
          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className={`p-2 rounded-lg transition-all duration-200 ${showPreview ? 'bg-champagne/20 text-champagne' : 'text-ivory/50 hover:text-ivory hover:bg-ivory/10'
              }`}
          >
            {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div className={`grid ${splitView ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
        <div className={`${splitView ? 'border-b lg:border-b-0 lg:border-r border-ivory/10' : ''} ${!showPreview && !splitView ? '' : ''}`}>
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full h-80 lg:h-[500px] p-6 bg-transparent text-ivory/90 resize-none focus:outline-none font-mono text-sm leading-relaxed placeholder:text-ivory/20"
            placeholder="Write your content in Markdown..."
          />
        </div>

        {(showPreview || splitView) && (
          <div
            ref={previewRef}
            className="h-80 lg:h-[500px] p-6 lg:p-8 overflow-y-auto prose prose-invert prose-sm max-w-none bg-ivory/[1%]"
          >
            <ReactMarkdown className="text-ivory/80 leading-relaxed font-sans">
              {value || '*Start writing to see preview...*'}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  )
}

export default MarkdownEditor
