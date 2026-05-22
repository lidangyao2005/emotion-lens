"use client"

import { MonsterCard } from "./monster-card"

interface HomeViewProps {
  onSelectMonster: (monster: string) => void
}

const monsters = [
  { name: "红红", emotion: "有点生气", color: "red" as const },
  { name: "黄黄", emotion: "有点害怕", color: "yellow" as const },
  { name: "蓝蓝", emotion: "有点难过", color: "blue" as const },
  { name: "绿绿", emotion: "有点焦虑", color: "green" as const },
]

export function HomeView({ onSelectMonster }: HomeViewProps) {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-3xl">
        {/* Heading */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center text-foreground mb-12 leading-relaxed text-balance">
          今天你想和哪个小怪物一起玩呢？
        </h1>
        
        {/* Monster Grid */}
        <div className="grid grid-cols-2 gap-6 md:gap-8">
          {monsters.map((monster) => (
            <MonsterCard
              key={monster.name}
              name={monster.name}
              emotion={monster.emotion}
              color={monster.color}
              onClick={() => onSelectMonster(monster.name)}
            />
          ))}
        </div>
      </div>
    </main>
  )
}
