import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import placeholderImage from '../../../assets/icons/placeholder_image.svg'
import { PlayButton } from '../../../assets/index.js'

const PlayButtonIcon = () => (
  <img src={PlayButton} width="60" height="60" alt="Play" />
)

const PlaceholderImageIcon = () => (
  <img 
    src={placeholderImage} 
    alt="Content placeholder" 
    width="40" 
    height="40"
    style={{ opacity: 0.7 }}
  />
)

const useRecomendedContentHelper = () => {
  const navigate = useNavigate()
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

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
    PlayButtonIcon,
    PlaceholderImageIcon
  }
}

export default useRecomendedContentHelper


