import useHomeHelper from './home.helper'
import DateSelector from '@components/common/common-dateselected-strip'
import { RedFrame, HomePlaceholder } from '@assets/index'


export default function Home() {
  const { selectedDate, handleDateChange, handleRecommendedClick } = useHomeHelper()

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
              <img src={RedFrame} alt="Period flow indicator" width="12" height="12" />
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
                <img src={HomePlaceholder} width="16" height="16" alt="Placeholder" />
              </div>
              <span className="insight-text">It's likely that your fertile window will be from 05th Sept to 09th Sept</span>
            </div>
            <div className="insight-item">
              <div className="insight-icon">
                <img src={HomePlaceholder} width="16" height="16" alt="Placeholder" />
              </div>
              <span className="insight-text">It's likely that your ovulation will be from 09th Sept to 12th Sept</span>
            </div>
            <div className="insight-item">
              <div className="insight-icon">
                <img src={HomePlaceholder} width="16" height="16" alt="Placeholder" />
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
                <img src={HomePlaceholder} width="16" height="16" alt="Placeholder" />
              </div>
              <span className="recommended-text">What is BBT and Why Track It?</span>
            </div>
            <div className="recommended-card" onClick={handleRecommendedClick}>
              <div className="recommended-icon">
                <img src={HomePlaceholder} width="16" height="16" alt="Placeholder" />
              </div>
              <span className="recommended-text">What is BBT and Why Track It?</span>
            </div>
            <div className="recommended-card" onClick={handleRecommendedClick}>
              <div className="recommended-icon">
                <img src={HomePlaceholder} width="16" height="16" alt="Placeholder" />
              </div>
              <span className="recommended-text">What is BBT and Why Tr</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
