"use client"

import { cn } from "@/lib/utils"

interface MonsterCardProps {
  name: string
  emotion: string
  color: "red" | "yellow" | "blue" | "green"
  onClick: () => void
}

const colorMap = {
  red: {
    bg: "bg-[#F9A8A8]",
    hover: "hover:bg-[#F7B5B5]",
    glow: "hover:shadow-[0_0_30px_rgba(249,168,168,0.5)]",
    face: "😤"
  },
  yellow: {
    bg: "bg-[#FDE68A]",
    hover: "hover:bg-[#FEE9A0]",
    glow: "hover:shadow-[0_0_30px_rgba(253,230,138,0.5)]",
    face: "😨"
  },
  blue: {
    bg: "bg-[#93C5FD]",
    hover: "hover:bg-[#A5CFFD]",
    glow: "hover:shadow-[0_0_30px_rgba(147,197,253,0.5)]",
    face: "😢"
  },
  green: {
    bg: "bg-[#A7F3D0]",
    hover: "hover:bg-[#B5F5D9]",
    glow: "hover:shadow-[0_0_30px_rgba(167,243,208,0.5)]",
    face: "😰"
  }
}

export function MonsterCard({ name, emotion, color, onClick }: MonsterCardProps) {
  const colors = colorMap[color]
  
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative flex flex-col items-center justify-center",
        "w-full aspect-square rounded-3xl p-6 md:p-8",
        "transition-all duration-300 ease-out",
        "transform hover:scale-105 active:scale-100",
        "focus:outline-none focus:ring-4 focus:ring-primary/50",
        colors.bg,
        colors.hover,
        colors.glow
      )}
      aria-label={`选择${name}，表达${emotion}的情绪`}
    >
      {/* Monster Face */}
      <div className="relative w-24 h-24 md:w-32 md:h-32 mb-4 flex items-center justify-center">
        <div className={cn(
          "w-full h-full rounded-full bg-white/40 flex items-center justify-center",
          "group-hover:animate-float"
        )}>
          <MonsterSVG color={color} />
        </div>
      </div>
      
      {/* Name and Emotion */}
      <div className="text-center">
        <p className="text-2xl md:text-3xl font-bold text-foreground mb-1">
          {name}
        </p>
        <p className="text-lg md:text-xl text-foreground/80">
          {emotion}
        </p>
      </div>
    </button>
  )
}

function MonsterSVG({ color }: { color: "red" | "yellow" | "blue" | "green" }) {
  const eyeColors = {
    red: "#DC2626",
    yellow: "#D97706",
    blue: "#2563EB",
    green: "#059669"
  }
  
  const bodyColors = {
    red: "#FCA5A5",
    yellow: "#FCD34D",
    blue: "#60A5FA",
    green: "#6EE7B7"
  }

  return (
    <svg viewBox="0 0 100 100" className="w-16 h-16 md:w-20 md:h-20">
      {/* Body */}
      <ellipse cx="50" cy="55" rx="35" ry="30" fill={bodyColors[color]} />
      
      {/* Eyes */}
      <ellipse cx="38" cy="45" rx="10" ry="12" fill="white" />
      <ellipse cx="62" cy="45" rx="10" ry="12" fill="white" />
      <circle cx="38" cy="47" r="5" fill={eyeColors[color]} />
      <circle cx="62" cy="47" r="5" fill={eyeColors[color]} />
      <circle cx="40" cy="45" r="2" fill="white" />
      <circle cx="64" cy="45" r="2" fill="white" />
      
      {/* Mouth based on emotion */}
      {color === "red" && (
        <path d="M35 65 Q50 58 65 65" stroke={eyeColors[color]} strokeWidth="3" fill="none" strokeLinecap="round" />
      )}
      {color === "yellow" && (
        <ellipse cx="50" cy="68" rx="8" ry="6" fill={eyeColors[color]} />
      )}
      {color === "blue" && (
        <path d="M38 70 Q50 62 62 70" stroke={eyeColors[color]} strokeWidth="3" fill="none" strokeLinecap="round" />
      )}
      {color === "green" && (
        <path d="M40 68 L60 68" stroke={eyeColors[color]} strokeWidth="3" strokeLinecap="round" />
      )}
      
      {/* Little horns/ears */}
      <ellipse cx="30" cy="28" rx="8" ry="12" fill={bodyColors[color]} />
      <ellipse cx="70" cy="28" rx="8" ry="12" fill={bodyColors[color]} />
    </svg>
  )
}
