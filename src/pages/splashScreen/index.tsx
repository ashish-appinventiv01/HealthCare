import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthLayout from '@layouts/authLayout'
import ROUTES from '@routes/routes'
import ArrowRight from '@assets/Images/arrow_right.svg'
import Button from '@components/common/common-button'

const SLIDES = [
    {
        title: 'Learn about CWCNFP',
        subtitle:
            'Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsun Loren Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsu Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsun Loren Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsu Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum.'
    },
    {
        title: 'Track your journey',
        subtitle:
            'Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum.'
    },
    {
        title: 'Get insights',
        subtitle:
            'Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum.'
    }
]

export default function SplashScreen() {
    const [index, setIndex] = useState(0)
    const navigate = useNavigate()
    const scrollRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const container = scrollRef.current
        if (!container) return () => { }

        const handleScroll = () => {
            const { scrollLeft, clientWidth } = container
            const current = Math.round(scrollLeft / Math.max(clientWidth, 1))
            if (current !== index) setIndex(Math.min(Math.max(current, 0), SLIDES.length - 1))
        }

        container.addEventListener('scroll', handleScroll, { passive: true })
        return () => container.removeEventListener('scroll', handleScroll)
    }, [index])

    function scrollToSlide(nextIndex: number) {
        const container = scrollRef.current
        if (!container) return
        const clamped = Math.min(Math.max(nextIndex, 0), SLIDES.length - 1)
        const x = clamped * container.clientWidth
        container.scrollTo({ left: x, behavior: 'smooth' })
    }

    function handleSkip() {
        navigate(ROUTES.AUTH_ROUTES.PRIVACY_CONSENT)
    }

    return (
        <AuthLayout>
            <div className="auth-card">
                {/* Top right Skip button */}
                <div className="splash-skip-container">
                    <button
                        type="button"
                        onClick={handleSkip}
                        className="splash-skip-btn"
                    >
                        Skip
                    </button>
                </div>

                {/* Main content area with navigation buttons */}
                <div className="splash-main-content">
                    {/* Left Arrow - centered vertically on left */}
                    <button
                        type="button"
                        onClick={() => index > 0 && scrollToSlide(index - 1)}
                        disabled={index === 0}
                        aria-label="Previous"
                        className={`splash-arrow-btn ${index === 0 ? 'disabled' : ''}`}
                    >
                        <img src={ArrowRight} alt="Previous" className="splash-arrow-icon splash-arrow-icon--left" />
                    </button>

                    {/* Content columns - wrapped between buttons */}
                    <div className="splash-content-wrapper">
                        {/* Left column: text + progress */}
                        <div className="splash-text-column">
                            <h1 className='auth-title'>
                                {SLIDES[index].title}
                            </h1>
                            <p className='auth-subtitle'>
                                {SLIDES[index].subtitle}
                            </p>

                            {/* Progress dots matching slides */}
                            <div className="splash-progress-dots">
                                {SLIDES.map((_, i) => (
                                    <span
                                        key={i}
                                        className={`splash-progress-dot ${i === index ? 'active' : ''}`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Right column: illustrative cards */}
                        <div className="splash-cards-column">
                            {/* Scrollable slides */}
                            <div
                                ref={scrollRef}
                                className="splash-slides-container"
                            >
                                {SLIDES.map((_, i) => (
                                    <div
                                        key={i}
                                        className="splash-slide-item"
                                    >
                                        <div className="splash-card-primary" />
                                        <div className="splash-card-secondary" />
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>

                    {/* Right Arrow - centered vertically on right */}
                    <button
                        type="button"
                        onClick={() => index < SLIDES.length - 1 && scrollToSlide(index + 1)}
                        disabled={index === SLIDES.length - 1}
                        aria-label="Next"
                        className={`splash-arrow-btn ${index === SLIDES.length - 1 ? 'disabled' : ''}`}
                    >
                        <img src={ArrowRight} alt="Next" className="splash-arrow-icon" />
                    </button>
                </div>

                {/* Bottom actions */}
                <div className="splash-actions">
                    <Button
                        onClick={() => navigate(ROUTES.AUTH_ROUTES.REGISTER)}
                        className='splash-action-btn'
                    >
                        Register
                    </Button>
                    <Button
                        onClick={() => navigate(ROUTES.AUTH_ROUTES.LOGIN)}
                        className='splash-action-btn'
                    >
                        Login
                    </Button>
                </div>
            </div>
        </AuthLayout>
    )
}


