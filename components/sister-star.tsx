"use client"

export function SisterStar({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center gap-4">
      {/* Avatar */}
      <div className="relative">
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-secondary flex items-center justify-center overflow-hidden">
          <StarAvatar />
        </div>
        {/* Friendly glow */}
        <div className="absolute inset-0 rounded-full bg-primary/10 animate-pulse" />
      </div>
      
      {/* Speech Bubble */}
      <div className="relative bg-white rounded-3xl p-6 shadow-lg max-w-sm">
        {/* Speech bubble tail */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-white rotate-45 rounded-sm" />
        
        <p className="relative text-xl md:text-2xl font-semibold text-foreground text-center leading-relaxed">
          {message}
        </p>
      </div>
      
      <p className="text-lg text-muted-foreground font-medium">
        星星姐姐
      </p>
    </div>
  )
}

function StarAvatar() {
  return (
    <svg viewBox="0 0 100 100" className="w-14 h-14 md:w-16 md:h-16">
      {/* Face */}
      <circle cx="50" cy="50" r="35" fill="#FFE4B5" />
      
      {/* Hair */}
      <ellipse cx="50" cy="30" rx="32" ry="18" fill="#8B4513" />
      <ellipse cx="25" cy="45" rx="8" ry="15" fill="#8B4513" />
      <ellipse cx="75" cy="45" rx="8" ry="15" fill="#8B4513" />
      
      {/* Eyes */}
      <ellipse cx="40" cy="50" rx="5" ry="6" fill="#4A4A4A" />
      <ellipse cx="60" cy="50" rx="5" ry="6" fill="#4A4A4A" />
      <circle cx="42" cy="48" r="2" fill="white" />
      <circle cx="62" cy="48" r="2" fill="white" />
      
      {/* Rosy cheeks */}
      <circle cx="30" cy="58" r="5" fill="#FFB6C1" opacity="0.6" />
      <circle cx="70" cy="58" r="5" fill="#FFB6C1" opacity="0.6" />
      
      {/* Smile */}
      <path d="M40 65 Q50 73 60 65" stroke="#4A4A4A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      
      {/* Star accessory */}
      <polygon points="50,8 52,14 58,14 53,18 55,24 50,20 45,24 47,18 42,14 48,14" fill="#FFD700" />
    </svg>
  )
}
