"use client"

import { cn } from "@/lib/utils"
import { Sparkles } from "lucide-react"

interface RewardViewProps {
  onNextLevel: () => void
}

export function RewardView({ onNextLevel }: RewardViewProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Soft Overlay */}
      <div className="absolute inset-0 bg-background/90 backdrop-blur-sm" />
      
      {/* Modal Content */}
      <div className={cn(
        "relative z-10 flex flex-col items-center gap-8 p-12",
        "bg-white rounded-3xl shadow-2xl max-w-md mx-6",
        "animate-in fade-in zoom-in-95 duration-500"
      )}>
        {/* Crystal Reward Icon */}
        <div className="relative">
          <div className="w-32 h-32 flex items-center justify-center">
            <CrystalIcon />
          </div>
          {/* Sparkle effects */}
          <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-yellow-400 animate-sparkle" />
          <Sparkles className="absolute -bottom-1 -left-3 w-6 h-6 text-yellow-400 animate-sparkle" style={{ animationDelay: "0.5s" }} />
        </div>

        {/* Celebration Message */}
        <div className="text-center space-y-2">
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground">
            太棒了！
          </h2>
          <p className="text-2xl md:text-3xl font-bold text-primary">
            你成功了！
          </p>
        </div>

        {/* Encouraging Sub-message */}
        <p className="text-lg text-muted-foreground text-center">
          你表达得真好！继续加油哦～
        </p>

        {/* Next Level Button */}
        <button
          onClick={onNextLevel}
          className={cn(
            "w-full py-5 px-8 rounded-2xl",
            "bg-accent hover:bg-accent/80 transition-all",
            "text-2xl font-bold text-accent-foreground",
            "transform hover:scale-105 active:scale-100",
            "focus:outline-none focus:ring-4 focus:ring-primary/50",
            "shadow-lg hover:shadow-xl"
          )}
        >
          下一关 →
        </button>
      </div>
    </div>
  )
}

function CrystalIcon() {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full animate-float">
      {/* Main crystal body */}
      <polygon 
        points="50,5 80,35 65,95 35,95 20,35" 
        fill="url(#crystalGradient)"
        stroke="#7CB9E8"
        strokeWidth="2"
      />
      
      {/* Crystal facets */}
      <polygon 
        points="50,5 65,35 50,50 35,35" 
        fill="rgba(255,255,255,0.4)"
      />
      <polygon 
        points="65,35 80,35 65,60 50,50" 
        fill="rgba(255,255,255,0.2)"
      />
      <polygon 
        points="35,35 50,50 35,60 20,35" 
        fill="rgba(255,255,255,0.3)"
      />
      
      {/* Shine effects */}
      <ellipse cx="40" cy="30" rx="5" ry="8" fill="rgba(255,255,255,0.6)" />
      <circle cx="60" cy="45" r="3" fill="rgba(255,255,255,0.5)" />
      
      {/* Gradient definition */}
      <defs>
        <linearGradient id="crystalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#93C5FD" />
          <stop offset="50%" stopColor="#7CB9E8" />
          <stop offset="100%" stopColor="#A7F3D0" />
        </linearGradient>
      </defs>
    </svg>
  )
}
