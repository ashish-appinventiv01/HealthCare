import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { UseRecomendedContentHelperReturn } from './recomendedContent.interface'

export default function useRecomendedContentHelper(): UseRecomendedContentHelperReturn {
  const navigate = useNavigate()
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false)

  const handlePlayVideo = () => {
    setIsVideoPlaying(true)
    console.log('Video started playing')
  }

  const handleBackToHome = () => {
    navigate(-1)
  }

  return {
    isVideoPlaying,
    handlePlayVideo,
    handleBackToHome,
  }
}


