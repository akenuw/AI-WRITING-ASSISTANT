import { useState } from 'react'
import { Copy, Check, User, Bot } from 'lucide-react'

const ChatMessage = ({ message }) => {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(message.content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  const formatContent = (content) => {
    // Simple formatting for better readability
    return content.split('\n').map((line, index) => {
      if (line.trim().startsWith('**') && line.trim().endsWith('**')) {
        return <strong key={index}>{line.replace(/\*\*/g, '')}</strong>
      }
      if (line.trim().startsWith('📝') || line.trim().startsWith('✨') || 
          line.trim().startsWith('🎯') || line.trim().startsWith('📋') ||
          line.trim().startsWith('🔍') || line.trim().startsWith('💡') ||
          line.trim().startsWith('📊')) {
        return <div key={index} className="feature-line">{line}</div>
      }
      return line ? <div key={index}>{line}</div> : <br key={index} />
    })
  }

  return (
    <div className={`message ${message.type}`}>
      <div className="message-header">
        <div className="message-avatar">
          {message.type === 'user' ? (
            <User size={16} />
          ) : (
            <Bot size={16} />
          )}
        </div>
        <div className="message-info">
          <span className="message-sender">
            {message.type === 'user' ? 'You' : 'AI Assistant'}
          </span>
          <span className="message-time">
            {formatTime(message.timestamp)}
          </span>
        </div>
        <button 
          onClick={copyToClipboard}
          className="copy-btn"
          title="Copy message"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
        </button>
      </div>
      <div className="message-content">
        {formatContent(message.content)}
      </div>
    </div>
  )
}

export default ChatMessage
