import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DateSelector from '../components/common/DateSelector.jsx'
import redFrameLogo from './red_frame.svg'

// Placeholder Image Icon Component
const PlaceholderIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.015 15.5C1.58312 15.5 1.22281 15.3556 0.934062 15.0669C0.645312 14.7781 0.500625 14.4175 0.5 13.985V2.015C0.5 1.58312 0.644687 1.22281 0.934062 0.934062C1.22344 0.645312 1.58375 0.500625 2.015 0.5H13.9859C14.4172 0.5 14.7775 0.644687 15.0669 0.934062C15.3562 1.22344 15.5006 1.58375 15.5 2.015V13.9859C15.5 14.4172 15.3556 14.7775 15.0669 15.0669C14.7781 15.3562 14.4175 15.5006 13.985 15.5H2.015ZM2.015 14.5625H13.9859C14.1297 14.5625 14.2619 14.5025 14.3825 14.3825C14.5031 14.2625 14.5631 14.13 14.5625 13.985V2.015C14.5625 1.87063 14.5025 1.73812 14.3825 1.6175C14.2625 1.49687 14.13 1.43687 13.985 1.4375H2.015C1.87063 1.4375 1.73812 1.4975 1.6175 1.6175C1.49687 1.7375 1.43687 1.87 1.4375 2.015V13.9859C1.4375 14.1297 1.4975 14.2619 1.6175 14.3825C1.7375 14.5031 1.86969 14.5631 2.01406 14.5625M3.78125 12.2187H12.3631L9.71281 8.68437L7.26125 11.7856L5.62062 9.80281L3.78125 12.2187Z" fill="#0D99FF"/>
  </svg>
)


export default function Home() {
  const navigate = useNavigate()
  const [selectedDate, setSelectedDate] = useState('03')

  const handleDateChange = (date) => {
    setSelectedDate(date)
  }

  const handleRecommendedClick = () => {
    navigate('/educational-content')
  }

  return (
    <div className="home-container">
      <div >
        {/* Header Section */}
        <div className="home-header">
          <h1 className="greeting">Hi Shreya,</h1>
          <DateSelector 
            selectedDate={selectedDate}
            onDateChange={handleDateChange}
            dateDisplayText="Today, 03 September, 2025"
            showCalendarIcon={true}
          />
        </div>

        {/* Period Status Section */}
        <div className="period-status">
          <div className="period-info">
            <span className="period-label">Period</span>
            <span className="period-day">Day 1</span>
            <div className="period-flow">
              <img src={redFrameLogo} alt="Period flow indicator" width="12" height="12" />
              <span className="flow-text">Light</span>
            </div>
          </div>
        </div>

        {/* Daily Insights Section */}
        <div className="insights-section">
          <h2 className="section-title">Daily Insights</h2>
          <div className="insights-card">
            <div className="insight-item">
              <div className="insight-icon">
                <PlaceholderIcon />
              </div>
              <span className="insight-text">It's likely that your fertile window will be from 05th Sept to 09th Sept</span>
            </div>
            <div className="insight-item">
              <div className="insight-icon">
                <PlaceholderIcon />
              </div>
              <span className="insight-text">It's likely that your ovulation will be from 09th Sept to 12th Sept</span>
            </div>
            <div className="insight-item">
              <div className="insight-icon">
                <PlaceholderIcon />
              </div>
              <span className="insight-text">It's likely that you will have your next menstruation date on 01st October</span>
            </div>
          </div>
        </div>

        {/* Daily Tip Section */}
        <div className="tip-section">
          <h2 className="section-title">Daily Tip</h2>
          <div className="tip-card">
            <span className="tip-text">Iron-rich foods like spinach, beans, and lentils help replenish your body during menstruation.</span>
          </div>
        </div>

        {/* CWCNFP Recommended Section */}
        <div className="recommended-section">
          <h2 className="section-title">CWCNFP Recommended</h2>
          <div className="recommended-cards">
            <div className="recommended-card" onClick={handleRecommendedClick}>
              <div className="recommended-icon">
                <PlaceholderIcon />
              </div>
              <span className="recommended-text">What is BBT and Why Track It?</span>
            </div>
            <div className="recommended-card" onClick={handleRecommendedClick}>
              <div className="recommended-icon">
                <PlaceholderIcon />
              </div>
              <span className="recommended-text">What is BBT and Why Track It?</span>
            </div>
            <div className="recommended-card" onClick={handleRecommendedClick}>
              <div className="recommended-icon">
                <PlaceholderIcon />
              </div>
              <span className="recommended-text">What is BBT and Why Tr</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
