import { useState, useRef, useEffect } from 'react'
import { Send, FileText, MessageSquare, Sparkles, Download, Copy, RotateCcw } from 'lucide-react'
import ChatMessage from './ChatMessage'
import DocumentEditor from './DocumentEditor'
import ToolsPanel from './ToolsPanel'
import './WritingAssistant.css'

const WritingAssistant = () => {
  const [activeTab, setActiveTab] = useState('chat')
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: "🚀 Hello! I'm your **AI Prompt Improvement Assistant**. I specialize in analyzing and enhancing AI prompts to help you get better results from any AI system.\n\n💡 **What I can do:**\n• Analyze your prompts for clarity and effectiveness\n• Improve prompt structure and specificity\n• Teach prompt engineering best practices\n• Provide examples of excellent prompts\n\n**Try saying:** 'Improve this prompt: Write a story' or ask for 'prompt tips'!",
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [document, setDocument] = useState('')
  const [documentTitle, setDocumentTitle] = useState('My AI Prompt Collection')
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage)
      const assistantMessage = {
        id: Date.now() + 1,
        type: 'assistant',
        content: aiResponse,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1000 + Math.random() * 2000)
  }

  const generateAIResponse = (input) => {
    const lowerInput = input.toLowerCase()

    // Check if this is a prompt that needs improvement
    if (lowerInput.includes('improve this prompt') || lowerInput.includes('make this better') ||
        lowerInput.includes('enhance this prompt') || lowerInput.includes('fix this prompt')) {
      return analyzeAndImprovePrompt(input)
    }

    // Check for prompt engineering requests
    if (lowerInput.includes('prompt engineering') || lowerInput.includes('prompt tips') ||
        lowerInput.includes('better prompts') || lowerInput.includes('prompt best practices')) {
      return `🎯 **AI Prompt Engineering Best Practices:**

**🔍 Be Specific & Clear**
- Use precise language and avoid ambiguity
- Define exactly what you want the AI to do
- Include context and background information

**📋 Structure Your Prompts**
- Start with the task/role
- Provide context and constraints
- Specify the desired output format
- Include examples when helpful

**🎭 Use Role-Playing**
- "Act as a [expert/professional]..."
- "You are a [specific role] with [expertise]..."

**📝 Prompt Template:**
\`\`\`
Role: [Who should the AI be?]
Task: [What should it do?]
Context: [Background information]
Format: [How should the output look?]
Constraints: [Any limitations or requirements]
Example: [Show desired output style]
\`\`\`

**💡 Pro Tips:**
- Use "step-by-step" for complex tasks
- Ask for reasoning with "explain your thinking"
- Set tone: "professional", "casual", "creative"
- Use "in the style of..." for specific voices

Share your prompt and I'll help you improve it!`
    }

    // Check for specific prompt improvement requests
    if (lowerInput.includes('analyze this prompt') || lowerInput.includes('review this prompt')) {
      return "I'll analyze your prompt for clarity, specificity, and effectiveness! Please share the prompt you'd like me to review, and I'll provide detailed feedback and suggestions for improvement."
    }

    // Check for prompt examples
    if (lowerInput.includes('prompt examples') || lowerInput.includes('show me examples')) {
      return `🌟 **Excellent AI Prompt Examples:**

**📊 Data Analysis Prompt:**
"Act as a data analyst with 10+ years of experience. Analyze the following sales data and provide insights on trends, patterns, and recommendations. Present your findings in a structured report with: 1) Key insights, 2) Trend analysis, 3) Actionable recommendations. Use bullet points and include confidence levels for your conclusions. Focus on actionable insights that can drive business decisions."

**✍️ Creative Writing Prompt:**
"You are a creative writing coach with expertise in character development. Help me develop a compelling character for my sci-fi novel. The character should be: a space engineer, morally complex, with a hidden past. Provide: 1) Character background, 2) Personality traits, 3) Internal conflicts, 4) How their past affects current decisions. Write in a detailed, engaging style with specific examples."

**🔧 Technical Prompt:**
"Act as a senior software architect with experience in scalable systems. Explain the pros and cons of microservices vs monolithic architecture for a mid-size e-commerce platform (10k daily users). Structure your response as: 1) Overview of each approach, 2) Specific pros/cons for this use case, 3) Recommendation with reasoning, 4) Implementation considerations. Include real-world examples and potential pitfalls."

**🎨 Design Prompt:**
"You are a UX designer with expertise in mobile app design. Critique this mobile app wireframe and suggest improvements for user experience. Focus on: 1) Navigation flow, 2) Information hierarchy, 3) Accessibility, 4) User engagement. Provide specific, actionable feedback with reasoning for each suggestion. Consider both iOS and Android design guidelines."

**🎯 Marketing Prompt:**
"Act as a digital marketing strategist with expertise in social media campaigns. Create a comprehensive marketing strategy for a new eco-friendly water bottle targeting millennials. Include: 1) Target audience analysis, 2) Key messaging, 3) Platform-specific content strategies, 4) Success metrics, 5) Budget allocation recommendations. Provide specific examples and timelines."

Want me to help improve your specific prompt?`
    }

    // Check for prompt templates
    if (lowerInput.includes('prompt templates') || lowerInput.includes('show me templates')) {
      return `📋 **Proven Prompt Templates:**

**🎭 Role-Based Template:**
\`\`\`
Act as a [specific role] with [years of experience/expertise].
[Task description with specific requirements]
Structure your response as:
1. [First requirement]
2. [Second requirement]
3. [Third requirement]
Provide [specific output format] and include [additional requirements].
\`\`\`

**📝 Analysis Template:**
\`\`\`
You are an expert [domain] analyst. Analyze the following [subject]:
[Input data/content]

Provide a comprehensive analysis including:
- Key findings and insights
- Strengths and weaknesses
- Recommendations for improvement
- Potential risks or considerations

Format your response with clear headings and bullet points.
\`\`\`

**🎨 Creative Template:**
\`\`\`
Act as a creative [profession] with expertise in [specific area].
Help me create [specific deliverable] for [target audience].
Requirements:
- [Requirement 1]
- [Requirement 2]
- [Requirement 3]

Provide multiple options and explain your creative reasoning.
\`\`\`

**🔧 Problem-Solving Template:**
\`\`\`
You are a [expert type] consultant. I'm facing this challenge:
[Problem description]

Please provide:
1. Problem analysis and root causes
2. Multiple solution approaches
3. Pros and cons of each approach
4. Recommended solution with implementation steps
5. Potential obstacles and mitigation strategies
\`\`\`

**📊 Comparison Template:**
\`\`\`
Act as an expert in [field]. Compare [Option A] vs [Option B] for [specific use case].
Consider these factors:
- [Factor 1]
- [Factor 2]
- [Factor 3]

Provide a detailed comparison table and your recommendation with reasoning.
\`\`\`

Try using these templates with your specific needs!`
    }

    // Default prompt improvement guidance
    if (lowerInput.includes('help') || lowerInput.includes('what can you do')) {
      return `🚀 **AI Prompt Improvement Assistant**

I specialize in making your AI prompts more effective! I can help you:

🎯 **Analyze & Improve Prompts**
- Review clarity and specificity
- Enhance structure and flow
- Add missing context or constraints
- Optimize for better AI responses

🔧 **Prompt Engineering Techniques**
- Role-based prompting
- Step-by-step instructions
- Output formatting
- Context setting

📝 **Prompt Templates**
- Task-specific templates
- Industry-specific formats
- Creative and technical prompts
- Multi-step prompt chains

💡 **Best Practices**
- Clarity and precision tips
- Common prompt mistakes to avoid
- Advanced techniques
- Testing and iteration strategies

**How to use me:**
1. Share your prompt with "Improve this prompt: [your prompt]"
2. Ask for "prompt examples" for inspiration
3. Request "prompt tips" for best practices
4. Get "prompt analysis" for detailed feedback

Ready to make your AI interactions more effective?`
    }

    // Default responses for general queries
    const responses = [
      "I'm here to help you create better AI prompts! Share a prompt you'd like me to improve, or ask for prompt engineering tips.",
      "Ready to enhance your AI prompts? Paste your prompt and I'll analyze it for clarity, specificity, and effectiveness.",
      "Let's make your AI interactions more powerful! Share your prompt or ask about prompt engineering best practices.",
      "I specialize in prompt improvement! Send me a prompt to analyze or ask for examples of effective AI prompts."
    ]

    return responses[Math.floor(Math.random() * responses.length)]
  }

  const analyzeAndImprovePrompt = (input) => {
    // Extract the actual prompt from the input
    const promptMatch = input.match(/(?:improve this prompt:?|make this better:?|enhance this prompt:?|fix this prompt:?)\s*(.+)/i)
    const originalPrompt = promptMatch ? promptMatch[1].trim() : input

    if (!originalPrompt || originalPrompt.length < 10) {
      return "Please share the specific prompt you'd like me to improve. For example: 'Improve this prompt: Write a story about a robot.'"
    }

    // Analyze the prompt
    const analysis = analyzePromptQuality(originalPrompt)
    const improvedPrompt = generateImprovedPrompt(originalPrompt, analysis)

    return `🔍 **Prompt Analysis & Improvement**

**📋 Original Prompt:**
"${originalPrompt}"

**⚡ Issues Identified:**
${analysis.issues.map(issue => `• ${issue}`).join('\n')}

**✨ Improved Prompt:**
"${improvedPrompt}"

**🎯 Key Improvements Made:**
${analysis.improvements.map(improvement => `• ${improvement}`).join('\n')}

**💡 Why This Works Better:**
${analysis.reasoning}

**🚀 Pro Tip:** ${analysis.proTip}`
  }

  const analyzePromptQuality = (prompt) => {
    const issues = []
    const improvements = []
    let reasoning = ""
    let proTip = ""

    // Check for common issues
    if (prompt.length < 20) {
      issues.push("Too vague and short")
      improvements.push("Added specific context and clear instructions")
    }

    if (!prompt.includes('act as') && !prompt.includes('you are') && !prompt.includes('role')) {
      issues.push("No clear role or context defined")
      improvements.push("Defined a specific role/expertise for the AI")
    }

    if (!prompt.includes('format') && !prompt.includes('structure') && !prompt.includes('organize')) {
      issues.push("No output format specified")
      improvements.push("Specified desired output format and structure")
    }

    if (prompt.split(' ').length < 10) {
      issues.push("Lacks sufficient detail and context")
      improvements.push("Added detailed context and specific requirements")
    }

    if (!prompt.includes('step') && !prompt.includes('explain') && !prompt.includes('because')) {
      issues.push("Doesn't request reasoning or methodology")
      improvements.push("Added request for step-by-step reasoning")
    }

    // Generate reasoning
    reasoning = "The improved prompt provides clear context, defines the AI's role, specifies the desired output format, and includes specific requirements. This leads to more focused, useful, and actionable responses."

    // Generate pro tip
    const tips = [
      "Always test your improved prompts and iterate based on the results you get.",
      "Consider adding examples of the desired output format for even better results.",
      "Use constraints to prevent the AI from going off-topic or being too verbose.",
      "Break complex tasks into smaller, sequential prompts for better results.",
      "Specify the target audience to help the AI adjust its language and complexity."
    ]
    proTip = tips[Math.floor(Math.random() * tips.length)]

    return { issues, improvements, reasoning, proTip }
  }

  const generateImprovedPrompt = (originalPrompt, analysis) => {
    // This is a simplified improvement generator
    // In a real implementation, this would use more sophisticated NLP and prompt engineering rules

    let improved = originalPrompt

    // Add role if missing
    if (!improved.toLowerCase().includes('act as') && !improved.toLowerCase().includes('you are')) {
      improved = `Act as an expert assistant. ${improved}`
    }

    // Add structure request if missing
    if (!improved.toLowerCase().includes('format') && !improved.toLowerCase().includes('structure')) {
      improved += ` Please structure your response clearly with numbered points or sections.`
    }

    // Add reasoning request if missing
    if (!improved.toLowerCase().includes('explain') && !improved.toLowerCase().includes('reasoning')) {
      improved += ` Explain your reasoning and provide specific examples where helpful.`
    }

    // Add context if too short
    if (originalPrompt.length < 50) {
      improved += ` Provide detailed, actionable information that would be valuable for someone looking to understand this topic thoroughly.`
    }

    return improved
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        type: 'assistant',
        content: "Chat cleared! How can I help you with your writing today?",
        timestamp: new Date()
      }
    ])
  }

  const exportChat = () => {
    const chatContent = messages.map(msg => 
      `${msg.type.toUpperCase()}: ${msg.content}\n`
    ).join('\n')
    
    const blob = new Blob([chatContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'writing-assistant-chat.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="writing-assistant">
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <Sparkles className="logo-icon" />
            <h1>AI Prompt Improvement Assistant</h1>
          </div>
          <div className="header-actions">
            <button onClick={clearChat} className="header-btn" title="Clear Chat">
              <RotateCcw size={18} />
            </button>
            <button onClick={exportChat} className="header-btn" title="Export Chat">
              <Download size={18} />
            </button>
          </div>
        </div>
      </header>

      <div className="main-content">
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'chat' ? 'active' : ''}`}
            onClick={() => setActiveTab('chat')}
          >
            <MessageSquare size={18} />
            Prompt Assistant
          </button>
          <button 
            className={`tab ${activeTab === 'document' ? 'active' : ''}`}
            onClick={() => setActiveTab('document')}
          >
            <FileText size={18} />
            Prompt Workshop
          </button>
        </div>

        <div className="content-area">
          {activeTab === 'chat' && (
            <div className="chat-container">
              <div className="messages">
                {messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
                {isLoading && (
                  <div className="message assistant">
                    <div className="message-content loading">
                      <div className="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              
              <div className="input-area">
                <div className="input-container">
                  <textarea
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Share your AI prompt for improvement, ask for 'prompt tips', or try: 'Improve this prompt: Write a story about robots'"
                    rows="3"
                    disabled={isLoading}
                  />
                  <button 
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isLoading}
                    className="send-btn"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'document' && (
            <DocumentEditor 
              document={document}
              setDocument={setDocument}
              documentTitle={documentTitle}
              setDocumentTitle={setDocumentTitle}
            />
          )}
        </div>

        <ToolsPanel />
      </div>
    </div>
  )
}

export default WritingAssistant
