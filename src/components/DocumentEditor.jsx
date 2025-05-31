import { useState, useEffect } from 'react'
import { Save, Download, Upload, FileText, BarChart3, Zap } from 'lucide-react'

const DocumentEditor = ({ document, setDocument, documentTitle, setDocumentTitle }) => {
  const [wordCount, setWordCount] = useState(0)
  const [charCount, setCharCount] = useState(0)
  const [sentences, setSentences] = useState(0)
  const [paragraphs, setParagraphs] = useState(0)
  const [readingTime, setReadingTime] = useState(0)
  const [suggestions, setSuggestions] = useState([])
  const [showStats, setShowStats] = useState(false)

  useEffect(() => {
    updateStats()
    generateSuggestions()
  }, [document])

  const updateStats = () => {
    if (!document.trim()) {
      setWordCount(0)
      setCharCount(0)
      setSentences(0)
      setParagraphs(0)
      setReadingTime(0)
      return
    }

    const words = document.trim().split(/\s+/).filter(word => word.length > 0)
    const chars = document.length
    const sentenceCount = document.split(/[.!?]+/).filter(s => s.trim().length > 0).length
    const paragraphCount = document.split(/\n\s*\n/).filter(p => p.trim().length > 0).length
    const avgWordsPerMinute = 200
    const readTime = Math.ceil(words.length / avgWordsPerMinute)

    setWordCount(words.length)
    setCharCount(chars)
    setSentences(sentenceCount)
    setParagraphs(paragraphCount)
    setReadingTime(readTime)
  }

  const generateSuggestions = () => {
    if (!document.trim()) {
      setSuggestions([])
      return
    }

    const newSuggestions = []

    // Check for common issues
    if (document.includes('very ')) {
      newSuggestions.push({
        type: 'style',
        message: 'Consider removing filler words like "very" for stronger writing',
        severity: 'low'
      })
    }

    if (document.includes('  ')) {
      newSuggestions.push({
        type: 'formatting',
        message: 'Multiple spaces detected - consider cleaning up spacing',
        severity: 'medium'
      })
    }

    const avgWordsPerSentence = sentences > 0 ? wordCount / sentences : 0
    if (avgWordsPerSentence > 25) {
      newSuggestions.push({
        type: 'readability',
        message: 'Some sentences are quite long. Consider breaking them up for better readability',
        severity: 'medium'
      })
    }

    if (document.split('!').length > 3) {
      newSuggestions.push({
        type: 'style',
        message: 'You might be overusing exclamation marks',
        severity: 'low'
      })
    }

    if (paragraphs === 1 && wordCount > 100) {
      newSuggestions.push({
        type: 'structure',
        message: 'Consider breaking your text into multiple paragraphs for better structure',
        severity: 'medium'
      })
    }

    setSuggestions(newSuggestions)
  }

  const saveDocument = () => {
    const blob = new Blob([document], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${documentTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  const loadDocument = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setDocument(e.target.result)
        setDocumentTitle(file.name.replace(/\.[^/.]+$/, ""))
      }
      reader.readAsText(file)
    }
  }

  const quickImprove = () => {
    let improved = document
      .replace(/\s+/g, ' ') // Fix multiple spaces
      .replace(/very /gi, '') // Remove "very"
      .replace(/really /gi, '') // Remove "really"
      .replace(/just /gi, '') // Remove "just"
      .replace(/\s+([.!?])/g, '$1') // Fix spacing before punctuation
      .trim()

    setDocument(improved)
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return '#ef4444'
      case 'medium': return '#f59e0b'
      case 'low': return '#10b981'
      default: return '#6b7280'
    }
  }

  return (
    <div className="document-editor">
      <div className="editor-header">
        <div className="title-section">
          <FileText size={20} />
          <input
            type="text"
            value={documentTitle}
            onChange={(e) => setDocumentTitle(e.target.value)}
            className="document-title"
            placeholder="Document title..."
          />
        </div>
        
        <div className="editor-actions">
          <button onClick={() => setShowStats(!showStats)} className="action-btn">
            <BarChart3 size={18} />
            Stats
          </button>
          <button onClick={quickImprove} className="action-btn improve-btn">
            <Zap size={18} />
            Quick Improve
          </button>
          <label className="action-btn">
            <Upload size={18} />
            Load
            <input
              type="file"
              accept=".txt,.md"
              onChange={loadDocument}
              style={{ display: 'none' }}
            />
          </label>
          <button onClick={saveDocument} className="action-btn">
            <Save size={18} />
            Save
          </button>
        </div>
      </div>

      <div className="editor-content">
        <div className="editor-main">
          <textarea
            value={document}
            onChange={(e) => setDocument(e.target.value)}
            placeholder="Craft your AI prompts here... I'll analyze them in real-time and provide suggestions for improvement. Try writing: 'Act as a marketing expert and help me create a campaign for my product.'"
            className="document-textarea"
          />
        </div>

        <div className="editor-sidebar">
          {showStats && (
            <div className="stats-panel">
              <h3>Document Statistics</h3>
              <div className="stats-grid">
                <div className="stat-item">
                  <span className="stat-label">Words</span>
                  <span className="stat-value">{wordCount.toLocaleString()}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Characters</span>
                  <span className="stat-value">{charCount.toLocaleString()}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Sentences</span>
                  <span className="stat-value">{sentences}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Paragraphs</span>
                  <span className="stat-value">{paragraphs}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Reading Time</span>
                  <span className="stat-value">{readingTime} min</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Avg Words/Sentence</span>
                  <span className="stat-value">
                    {sentences > 0 ? Math.round(wordCount / sentences) : 0}
                  </span>
                </div>
              </div>
            </div>
          )}

          {suggestions.length > 0 && (
            <div className="suggestions-panel">
              <h3>Writing Suggestions</h3>
              <div className="suggestions-list">
                {suggestions.map((suggestion, index) => (
                  <div 
                    key={index} 
                    className="suggestion-item"
                    style={{ borderLeftColor: getSeverityColor(suggestion.severity) }}
                  >
                    <div className="suggestion-type">{suggestion.type}</div>
                    <div className="suggestion-message">{suggestion.message}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DocumentEditor
