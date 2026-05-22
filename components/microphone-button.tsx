"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Mic } from "lucide-react"

interface MicrophoneButtonProps {
  onRecordingComplete: () => void
}

export function MicrophoneButton({ onRecordingComplete }: MicrophoneButtonProps) {
  const [isRecording, setIsRecording] = useState(false)

  const handleClick = () => {
    if (!isRecording) {
      setIsRecording(true)
      // Simulate recording for 3 seconds
      setTimeout(() => {
        setIsRecording(false)
        onRecordingComplete()
      }, 3000)
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={handleClick}
        disabled={isRecording}
        className={cn(
          "relative w-24 h-24 md:w-32 md:h-32 rounded-full",
          "flex items-center justify-center",
          "transition-all duration-300",
          "focus:outline-none focus:ring-4 focus:ring-primary/50",
          isRecording 
            ? "bg-[#F9A8A8] animate-pulse-glow" 
            : "bg-primary hover:bg-primary/90 hover:scale-105 active:scale-100"
        )}
        aria-label={isRecording ? "正在录音中..." : "点击开始录音"}
      >
        {/* Outer ring animation when recording */}
        {isRecording && (
          <div className="absolute inset-0 rounded-full animate-breathe border-4 border-[#F9A8A8]/50" />
        )}
        
        <Mic className={cn(
          "w-10 h-10 md:w-14 md:h-14 text-primary-foreground",
          isRecording && "animate-pulse"
        )} />
      </button>
      
      {/* Recording indicator */}
      {isRecording && (
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-foreground">正在聆听...</span>
          <WaveformAnimation />
        </div>
      )}
      
      {!isRecording && (
        <p className="text-lg text-muted-foreground">
          点击话筒说出你的答案
        </p>
      )}
    </div>
  )
}

function WaveformAnimation() {
  return (
    <div className="flex items-center gap-1 h-6">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="wave-bar w-1 bg-primary rounded-full"
          style={{ height: "100%" }}
        />
      ))}
    </div>
  )
}
