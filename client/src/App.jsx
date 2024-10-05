import { useState, useEffect } from 'react'
import ReactConfetti from 'react-confetti'
import EmojiBackground from './EmojiBackground'
import axios from 'axios'
import baseUrl from './baseUrl'

function App() {

  const [name, setName] = useState('')
  const [companion, setCompanion] = useState('')
  const [isAnimated, setIsAnimated] = useState(false)
  const [alreadyConfirmed, setAlreadyConfirmed] = useState(false)


  useEffect(() => {
    async function checkIsAlreadyConfirmed() {
      if (!localStorage.getItem('confirmed')) {
        setAlreadyConfirmed(false)
        return
      }

      setAlreadyConfirmed(true)
    }

    checkIsAlreadyConfirmed()
  }, [alreadyConfirmed])

  async function sendConfirmationMessage() {
    try {

      if (name === '') {
        alert('Informe um nome..')
        return
      }

      const messagePayload = {
        nome: name,
        acompanhante: companion
      }

      const response = await axios.post(`${baseUrl.production}/confirmacao`, messagePayload)
      alert(response.data?.message)

      setName('')
      setCompanion('')
      localStorage.setItem('confirmed', 'true')
      setAlreadyConfirmed(true)

    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='flex justify-center h-screen'>
      <div className='w-[85%] flex items-center justify-center'>
        <EmojiBackground animated={isAnimated} />
        <div className="flex flex-col items-center p-6 z-0 bg-white rounded-lg shadow-lg">
          <div className="w-32 h-32 overflow-hidden">
            <img
              src="/baby.jpeg"
              alt="Baby Eloah"
              className="w-full h-full"
            />
          </div>
          <h1 className="text-2xl font-bold text-pink-500 mb-2">Candy Party da Eloah</h1>
          <p className="text-black text-center italic py-4 pb-2">
            "Um dia especial deve ser comemorado com pessoas especiais"
          </p>
          <p className="text-4xl font-bold text-pink-500 py-4">30/11 às 18h</p>
          <p className="text-black bg-[#ff91c8b3] text-sm p-1 px-4 my-4 border rounded-md font-semibold mb-6 flex justify-center items-center">
            <a
              href="https://maps.app.goo.gl/v45XaHHT9NwvqqPM8"
              target='_blank'
              className='cursor-pointer'
            >
              🎈 Veja como chegar
            </a>
            <img
              src="/arrow.png"
              className='ml-2'
              alt=""
            />
          </p>

          <div 
            className={
              alreadyConfirmed ?
              'hidden' :
              'block'
            }
          >
            <p className="self-start text-black mb-2">Confirme sua presença aqui!</p>
            <input
              type="text"
              placeholder="Seu Nome e Sobrenome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mb-4 p-2 border border-black w-full rounded-md bg-transparent text-black"
            />
            <input
              type="text"
              placeholder="Nome do Acompanhante (opcional)"
              value={companion}
              onChange={(e) => setCompanion(e.target.value)}
              className="mb-6 p-2 border border-black w-full rounded-md bg-transparent text-black"
            />
            <button
              className="w-full cursor-pointer font-semibold bg-pink-500 hover:bg-pink-600 text-white p-2 rounded-md"
              onClick={() => sendConfirmationMessage()}
            >
              Eu Vou!
            </button>
          </div>
          <p
            className={
              alreadyConfirmed ?
                'text-black bg-[#91ffb9b3] text-sm p-1 px-4 my-4 border rounded-md font-semibold mb-6 flex justify-center items-center text-center' :
                'hidden'}
          >
            Você Já Confirmou! A mamãe Thais agradece
          </p>
        </div>
      </div>
    </div>

  )
}

export default App
