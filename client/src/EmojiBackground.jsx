import { useEffect, useState } from "react";

export default function EmojiBackground({ animated }) {
  const [emojiPositions, setEmojiPositions] = useState([])
  const emojis = ['❤️', '🍬', '🍭', '🍫', '🧁', '🎂', '🍰', '🍩', '🍪', '🍯', '🍓', '🍒']

  useEffect(() => {
    const positions = Array.from({ length: 100 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }))
    setEmojiPositions(positions)
  }, [])

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#d2d2d245]">
      {emojiPositions.map((position, index) => (
        <div
          key={index}
          className={`absolute text-2xl opacity-60 ${animated ? 'animate-float transition-[0.2s]' : ''
            }`}
          style={{
            left: position.left,
            top: position.top,
            animationDelay: `${Math.random() * 5}s`,
          }}
        >
          {emojis[index % emojis.length]}
        </div>
      ))}
    </div>
  )
}