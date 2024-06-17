'use client'

import ReactConfetti from 'react-confetti'
import { useConfettiStore } from '@/app/hooks/use-confetti'

export const ConfittiProvider = () => {
  const confetti = useConfettiStore()

  if (!confetti.isOpen) {
    return null
  }

  return (
    <ReactConfetti
      className='pointer-events-none z-[100]'
      numberOfPieces={1000}
      recycle={false}
      onConfettiComplete={() => {
        confetti.onClose()
      }}
    />
  )
}
