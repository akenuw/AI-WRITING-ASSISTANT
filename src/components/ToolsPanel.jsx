import { useState } from 'react'
import { 
  CheckCircle, 
  Palette, 
  FileText, 
  Zap, 
  BookOpen, 
  Target,
  ChevronDown,
  ChevronUp
} from 'lucide-react'

const ToolsPanel = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  const tools = [
    {
      id: 'analyze',
      name: 'Prompt Analysis',
      icon: CheckCircle,
      description: 'Analyze prompt clarity, specificity, and effectiveness',
      color: '#10b981'
    },
    {
      id: 'improve',
      name: 'Prompt Enhancement',
      icon: Zap,
      description: 'Automatically improve prompt structure and clarity',
      color: '#ef4444'
    },
    {
      id: 'templates',
      name: 'Prompt Templates',
      icon: FileText,
      description: 'Access proven prompt templates for different tasks',
      color: '#3b82f6'
    },
    {
      id: 'examples',
      name: 'Best Examples',
      icon: BookOpen,
      description: 'View examples of excellent AI prompts',
      color: '#06b6d4'
    },
    {
      id: 'engineering',
      name: 'Prompt Engineering',
      icon: Target,
      description: 'Learn advanced prompt engineering techniques',
      color: '#f59e0b'
    },
    {
      id: 'roleplay',
      name: 'Role-Based Prompts',
      icon: Palette,
      description: 'Create effective role-playing prompts for AI',
      color: '#8b5cf6'
    }
  ]

  const handleToolClick = (tool) => {
    // In a real app, this would trigger the specific AI function
    console.log(`Activating ${tool.name} tool`)

    const toolActions = {
      analyze: "Try typing: 'Analyze this prompt: Write a story'",
      improve: "Try typing: 'Improve this prompt: Create a website'",
      templates: "Try typing: 'Show me prompt templates'",
      examples: "Try typing: 'Show me prompt examples'",
      engineering: "Try typing: 'Prompt engineering tips'",
      roleplay: "Try typing: 'How to create role-based prompts'"
    }

    alert(`${tool.name} activated! ${toolActions[tool.id] || 'Ask me about prompt improvement in the chat!'}`)
  }

  return (
    <div className={`tools-panel ${isExpanded ? 'expanded' : ''}`}>
      <div className="tools-header" onClick={() => setIsExpanded(!isExpanded)}>
        <h3>Prompt Improvement Tools</h3>
        <button className="expand-btn">
          {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      </div>
      
      {isExpanded && (
        <div className="tools-content">
          <p className="tools-description">
            Quick access to AI prompt improvement tools. Click any tool to get started with prompt enhancement.
          </p>
          
          <div className="tools-grid">
            {tools.map((tool) => {
              const IconComponent = tool.icon
              return (
                <button
                  key={tool.id}
                  className="tool-item"
                  onClick={() => handleToolClick(tool)}
                  style={{ '--tool-color': tool.color }}
                >
                  <div className="tool-icon">
                    <IconComponent size={20} />
                  </div>
                  <div className="tool-info">
                    <div className="tool-name">{tool.name}</div>
                    <div className="tool-description">{tool.description}</div>
                  </div>
                </button>
              )
            })}
          </div>
          
          <div className="tools-footer">
            <p className="tools-note">
              💡 <strong>Tip:</strong> You can also ask the AI assistant directly in the chat: "Improve this prompt: [your prompt]"
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default ToolsPanel
