import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import placeholderImage from '../assets/icons/placeholder_image.svg'

// Play Button Icon Component
const PlayButtonIcon = () => (
  <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="30" cy="30" r="30" fill="#1a79bd"/>
    <path d="M22 18L42 30L22 42V18Z" fill="white"/>
  </svg>
)

// Placeholder Image Component for content cards
const PlaceholderImageIcon = () => (
  <img 
    src={placeholderImage} 
    alt="Content placeholder" 
    width="40" 
    height="40"
    style={{ opacity: 0.7 }}
  />
)

export default function EducationalContent() {
  const navigate = useNavigate()
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  const handlePlayVideo = () => {
    setIsVideoPlaying(true)
    // Here you would implement actual video playback
    console.log('Video started playing')
  }

  const handleBackToHome = () => {
    navigate(-1)
  }

  const contentCards = [
    {
      id: 1,
      title: "Cycle Basics",
      subtitle: "What is Basal Body Temperature and Why Track It?",
      image: <PlaceholderImageIcon />
    },
    {
      id: 2,
      title: "NFP Methods & Faith Context",
      subtitle: "Catholic Teaching on Fertility & Family Planning",
      image: <PlaceholderImageIcon />
    },
    {
      id: 3,
      title: "NFP Methods & Faith Context",
      subtitle: "Catholic Teaching on Fertility & Family Planning",
      image: <PlaceholderImageIcon />
    }
  ]

  return (
    <div className="educational-container" style={{ border: '1px solid #E7E9EF', borderRadius: 8, padding: 25 }}>
      {/* Header with breadcrumb */}
      <div className="educational-header">
        <div className="breadcrumb">
          <span className="breadcrumb-item" onClick={handleBackToHome} style={{ cursor: 'pointer', color: 'rgba(36, 131, 197, 0.70)' }}>Home</span>
          <span className="breadcrumb-separator"> \ </span>
          <span className="breadcrumb-current">View CWCNFP Recommended</span>
        </div>
      </div>

      <div className="educational-content">
        {/* Main Content Area */}
        <div className="main-content">
          {/* Video Player */}
          <div className="video-container">
            <div className="video-player" onClick={handlePlayVideo}>
              {!isVideoPlaying ? (
                <div className="video-placeholder">
                  <PlayButtonIcon />
                </div>
              ) : (
                <div className="video-playing">
                  <p>Video is playing...</p>
                </div>
              )}
            </div>
          </div>

          {/* Main Title and Description */}
          <div className="content-details">
            <h1 className="content-title">Cycle Basics</h1>
            <p className="content-description">
              This section helps women and couples understand the foundations of the menstrual cycle and fertility awareness. It explains how the female body naturally changes throughout the month, what each phase means, and how to recognize the signs of fertility. By learning cycle basics, users can confidently track their health, identify fertile and infertile days, and make informed choices about family planning in harmony with their faith.
            </p>
          </div>
        </div>

        {/* Related Content Sidebar */}
        <div className="related-content">
        
          <div className="content-cards">
            {contentCards.map((card) => (
              <div key={card.id} className="content-card">
                <div className="card-image">
                  {card.image}
                </div>
                <div className="card-content">
                  <h4 className="card-title">{card.title}</h4>
                  <p className="card-subtitle">{card.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
