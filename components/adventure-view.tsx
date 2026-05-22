"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { MicrophoneButton } from "./microphone-button"
import { SisterStar } from "./sister-star"
import { ChevronLeft, Keyboard } from "lucide-react"

interface AdventureViewProps {
  monster: string
  onComplete: () => void
  onBack: () => void
}

const storyScenes = [
  {
    image: "🎈",
    text: "小明的气球飞走了...",
    question: "如果你是小明，你会怎么说？"
  },
  {
    image: "🍦",
    text: "冰淇淋掉在地上了...",
    question: "你会对妈妈说什么？"
  },
  {
    image: "🧸",
    text: "你最喜欢的玩具找不到了...",
    question: "你现在的心情是什么？"
  }
]

export function AdventureView({ monster, onComplete, onBack }: AdventureViewProps) {
  const [sceneIndex] = useState(0)
  const [showTextInput, setShowTextInput] = useState(false)
  const [textInput, setTextInput] = useState("")
  const [storyContent, setStoryContent] = useState<string>("")
  const [storyLoading, setStoryLoading] = useState(false)
  const [storyError, setStoryError] = useState<string>("")
  const [question, setQuestion] = useState(storyScenes[sceneIndex].question)
  const [checkingAnswer, setCheckingAnswer] = useState(false)
  const [feedback, setFeedback] = useState<string>("")
  
  const scene = storyScenes[sceneIndex]

  // 小怪兽名字和情绪的对应关系
  const emotionMap: Record<string, string> = {
    '红红': '生气',
    '黄黄': '害怕',
    '蓝蓝': '难过',
    '绿绿': '焦虑'
  }

  const emotion = emotionMap[monster] || monster

  useEffect(() => {
    let aborted = false

    async function generateStory() {
      try {
        setStoryLoading(true)
        setStoryError("")
        setStoryContent("")
        setQuestion(scene.question)
        setFeedback("")

        const res = await fetch("/api/fastgpt", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ emotion, type: 'generate-story' }),
        })

        if (!res.ok) throw new Error("FastGPT API 调用失败")
        const data = await res.json()
        if (!data?.success) throw new Error(data?.error || "生成故事失败")
        
        const parts = data.content.split('|||')
        if (parts.length === 2) {
          setStoryContent(parts[0].trim())
          setQuestion(parts[1].trim())
        } else {
          setStoryContent(data.content || "故事生成完成，但没有返回内容")
        }
      } catch (e) {
        console.error(e)
        if (!aborted) setStoryError("生成故事失败，请稍后再试")
      } finally {
        if (!aborted) setStoryLoading(false)
      }
    }

    generateStory()
    return () => {
      aborted = true
    }
  }, [monster, scene.question])

  // 检查用户回答是否正确
  const checkAnswer = async (answer: string) => {
    try {
      setCheckingAnswer(true)
      setFeedback("")

      const res = await fetch("/api/fastgpt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emotion, userAnswer: answer, type: 'check-answer' }),
      })

      if (!res.ok) throw new Error("FastGPT API 调用失败")
      const data = await res.json()
      
      if (data.success && data.isCorrect) {
        // 回答正确，跳转到奖励页面
        onComplete()
      } else {
        // 回答不正确，显示引导语
        setFeedback(data.feedback || "再想想，你现在是什么心情呀？")
      }
    } catch (e) {
      console.error(e)
      setFeedback("网络有点慢，再试一次吧~")
    } finally {
      setCheckingAnswer(false)
    }
  }

  const handleRecordingComplete = (transcript: string) => {
    // 如果麦克风返回了转录文本，就用它来检查
    if (transcript) {
      checkAnswer(transcript)
    } else {
      // 如果没有转录文本，就模拟一个简单的回答
      checkAnswer("我很" + emotion)
    }
  }

  const handleTextSubmit = () => {
    if (textInput.trim()) {
      checkAnswer(textInput.trim())
      setTextInput("")
    }
  }

  return (
    <main className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="flex items-center justify-between p-4 md:p-6">
        <button
          onClick={onBack}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-2xl",
            "bg-secondary hover:bg-secondary/80 transition-colors",
            "focus:outline-none focus:ring-4 focus:ring-primary/50"
          )}
          aria-label="返回主页"
        >
          <ChevronLeft className="w-6 h-6" />
          <span className="text-lg font-semibold">返回</span>
        </button>
        
        <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-accent">
          <span className="text-lg font-semibold">
            和{monster}一起冒险
          </span>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-8 p-6 md:p-12">
        {/* Left: Story Card */}
        <div className="w-full max-w-md">
          <div className={cn(
            "bg-white rounded-3xl p-8 shadow-lg",
            "flex flex-col items-center gap-6"
          )}>
            {/* Story Image */}
            <div className="w-full aspect-video rounded-2xl bg-secondary flex items-center justify-center">
              <span className="text-8xl animate-float">{scene.image}</span>
            </div>
            
            {/* Story Text */}
            <p className="text-2xl md:text-3xl font-bold text-foreground text-center leading-relaxed">
              {storyLoading
                ? "正在生成故事..."
                : storyError
                  ? storyError
                  : storyContent}
            </p>
          </div>
        </div>

        {/* Right: Sister Star */}
        <div className="w-full max-w-sm">
          <SisterStar message={question} />
          
          {/* AI 反馈 */}
          {feedback && (
            <div className="mt-4 p-4 bg-yellow-50 rounded-2xl text-center text-lg">
              {feedback}
            </div>
          )}
          
          {/* 检查中 */}
          {checkingAnswer && (
            <div className="mt-4 text-center text-lg text-muted-foreground">
              ⏳ 正在检查你的回答...
            </div>
          )}
        </div>
      </div>

      {/* Bottom: Microphone Area */}
      <div className="flex flex-col items-center gap-4 pb-12 px-6">
        <MicrophoneButton 
          onRecordingComplete={handleRecordingComplete} 
          disabled={checkingAnswer || storyLoading}
        />
        
        {/* Backup Text Input Toggle */}
        <button
          onClick={() => setShowTextInput(!showTextInput)}
          className={cn(
            "flex items-center gap-2 text-muted-foreground hover:text-foreground",
            "transition-colors text-sm"
          )}
          aria-label="切换文字输入"
          disabled={checkingAnswer || storyLoading}
        >
          <Keyboard className="w-4 h-4" />
          <span>使用文字回答</span>
        </button>

        {/* Hidden Text Input */}
        {showTextInput && (
          <div className="w-full max-w-md flex gap-3">
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="在这里输入你的答案..."
              className={cn(
                "flex-1 px-6 py-4 text-lg rounded-2xl",
                "bg-white border-2 border-border",
                "focus:outline-none focus:ring-4 focus:ring-primary/50 focus:border-primary"
              )}
              aria-label="文字输入框"
              disabled={checkingAnswer || storyLoading}
            />
            <button
              onClick={handleTextSubmit}
              disabled={!textInput.trim() || checkingAnswer || storyLoading}
              className={cn(
                "px-6 py-4 rounded-2xl font-semibold text-lg",
                "bg-primary text-primary-foreground",
                "hover:bg-primary/90 transition-colors",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "focus:outline-none focus:ring-4 focus:ring-primary/50"
              )}
            >
              发送
            </button>
          </div>
        )}
      </div>
    </main>
  )
}