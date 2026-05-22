"use client"

import { useState } from "react"
import { HomeView } from "@/components/home-view"
import { AdventureView } from "@/components/adventure-view"
import { RewardView } from "@/components/reward-view"

type View = "home" | "adventure" | "reward"

export default function EmotionAdventureApp() {
  const [currentView, setCurrentView] = useState<View>("home")
  const [selectedMonster, setSelectedMonster] = useState<string>("")
  const [showReward, setShowReward] = useState(false)

  const handleSelectMonster = (monster: string) => {
    setSelectedMonster(monster)
    setCurrentView("adventure")
  }

  const handleComplete = () => {
    setShowReward(true)
  }

  const handleNextLevel = () => {
    setShowReward(false)
    setCurrentView("home")
  }

  const handleBack = () => {
    setCurrentView("home")
    setSelectedMonster("")
  }

  return (
    <div className="min-h-screen bg-background">
      {currentView === "home" && (
        <HomeView onSelectMonster={handleSelectMonster} />
      )}
      
      {currentView === "adventure" && (
        <AdventureView 
          monster={selectedMonster}
          onComplete={handleComplete}
          onBack={handleBack}
        />
      )}

      {showReward && (
        <RewardView onNextLevel={handleNextLevel} />
      )}
    </div>
  )
}
