import { useState, useEffect } from 'react'
import ReactConfetti from 'react-confetti'

function App() {

  const [name, setName] = useState('')
  const [companion, setCompanion] = useState('')
  const [showConfetti, setShowConfetti] = useState(false)
  const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const { innerWidth: width, innerHeight: height } = window
    setWindowDimensions({ width, height })
    setShowConfetti(true)
    const timer = setTimeout(() => setShowConfetti(false), 5000) // Confetti lasts for 5 seconds
    return () => clearTimeout(timer)
  }, [])

  const confettiEmojis = ['❤️', '🍬', '🍭', '🍫', '🧁', '🎂', '💗']

  return (
    <div className='flex justify-center h-screen'>
      {showConfetti && (
        <ReactConfetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          recycle={false}
          numberOfPieces={200}
          drawShape={ctx => {
            const emoji = confettiEmojis[Math.floor(Math.random() * confettiEmojis.length)]
            ctx.font = '16px serif'
            ctx.fillText(emoji, 0, 0)
          }}
        />
      )}
      <div className='w-[80%] flex items-center justify-center'>
        <div className="flex flex-col items-center p-4 bg-white">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-pink-300 mb-4">
            <img
              src="/placeholder.svg?height=128&width=128"
              alt="Baby Alice"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-2xl font-bold text-pink-500 mb-2">Candy Party da Alice</h1>
          <p className="text-gray-500 text-center italic py-4 pb-2">
            "Um dia especial deve ser comemorado com pessoas especiais"
          </p>
          <p className="text-4xl font-bold text-pink-500 py-4">20/06 às 15h</p>
          <p className="text-gray-600 text-sm p-1 border border-slate-300 rounded-md font-semibold mb-6">Rua dos Doces, n30, Bairro Felicidade</p>
          <p className="self-start text-gray-600 mb-2">Confirme sua presença aqui!</p>
          <input
            type="text"
            placeholder="Seu Nome e Sobrenome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mb-4 p-2 border border-slate-400 w-full rounded-md"
          />
          <input
            type="text"
            placeholder="Nome do Acompanhante (opcional)"
            value={companion}
            onChange={(e) => setCompanion(e.target.value)}
            className="mb-6 p-2 border border-slate-400 w-full rounded-md"
          />
          <button className="w-full font-semibold bg-pink-500 hover:bg-pink-600 text-white p-2 rounded-md">
            Eu Vou!
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
