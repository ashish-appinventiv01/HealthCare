import { useState } from 'react'
import Button from '../components/Button'

export default function Insights() {
  const [activeTab, setActiveTab] = useState('Summary')
  const [expandedCards, setExpandedCards] = useState({})

  const toggleCard = (cardId) => {
    setExpandedCards(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }))
  }

  const ChevronDownIcon = ({ rotated = false }) => (
    <svg
      className={rotated ? 'chevron rotated' : 'chevron'}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M7.41 8.59L12 13.17L16.59 8.59L18 10L12 16L6 10L7.41 8.59Z" fill="#191919"/>
    </svg>
  )

  const cycleData = [
    {
      id: 'current',
      title: 'Current Cycle - 3 Days',
      subtitle: 'Started Sept 10',
      isCurrent: true,
      details: {
        period: 'Period',
        observations: 'Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum',
        fluid: 'Pasty & Dry',
        bbt: '22.7 F',
        symptoms: 'Bloating & Anxious',
        hormones: [
          { name: 'LH', value: '+ve' },
          { name: 'FSH', value: '-ve' }
        ],
        medication: {
          name: 'Paracetamol',
          dosage: '650mg',
          frequency: 'Daily'
        }
      }
    },
    {
      id: 'previous',
      title: 'Cycle - 27 Days',
      subtitle: 'Aug 14- Sept 9',
      isCurrent: false,
      details: {
        period: 'Period',
        observations: 'Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum',
        fluid: 'Pasty & Dry',
        bbt: '22.7 F',
        symptoms: 'Bloating & Anxious',
        hormones: [
          { name: 'LH', value: '+ve' },
          { name: 'FSH', value: '-ve' }
        ],
        medication: {
          name: 'Paracetamol',
          dosage: '650mg',
          frequency: 'Daily'
        }
      }
    }
  ]

  return (
    <div className="insights-container" style={{ border: '1px solid #E7E9EF', borderRadius: 8, padding: 32 }}>
      {/* Header */}
      <div className="insights-header">
        <h1 className="insights-title">Insights</h1>
        <div className="insights-actions">
          <Button 
            style={{ 
              backgroundColor: '#1976d2', 
              color: 'white',
              marginRight: '12px',
              padding: '12px 24px',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            Log Previous Cycle
          </Button>
          <Button 
            style={{ 
              backgroundColor: '#42a5f5', 
              color: 'white',
              padding: '12px 24px',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            Share
          </Button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="insights-tabs">
        <button 
          className={`tab-button ${activeTab === 'Summary' ? 'active' : ''}`}
          onClick={() => setActiveTab('Summary')}
        >
          Summary
        </button>
        <button 
          className={`tab-button ${activeTab === 'Chart' ? 'active' : ''}`}
          onClick={() => setActiveTab('Chart')}
        >
          Chart
        </button>
      </div>

      {/* Content Area */}
      <div className="insights-content">
        {activeTab === 'Summary' && (
          <div className="summary-content">
            {cycleData.map((cycle) => (
              <div key={cycle.id} className="cycle-card">
                <div 
                  className="cycle-card-header"
                  onClick={() => toggleCard(cycle.id)}
                >
                  <div className="cycle-card-info">
                    <h3 className="cycle-card-title">{cycle.title}</h3>
                    <p className="cycle-card-subtitle">{cycle.subtitle}</p>
                  </div>
                  <ChevronDownIcon rotated={expandedCards[cycle.id]} />
                </div>
                {expandedCards[cycle.id] && (
                  <div className="cycle-card-content">
                    {/* Period Indicator */}
                    <div className="period-indicator">
                      <div className="period-dashes">
                        {cycle.id === 'current' ? (
                          // Current cycle - 3 red dashes
                          <>
                            <span className="period-dash red"></span>
                            <span className="period-dash red"></span>
                            <span className="period-dash red"></span>
                          </>
                        ) : (
                          // Previous cycle - 13 dashes (5 red, 5 blue, 3 no color)
                          <>
                            <span className="period-dash red"></span>
                            <span className="period-dash red"></span>
                            <span className="period-dash red"></span>
                            <span className="period-dash red"></span>
                            <span className="period-dash red"></span>
                            <span className="period-dash blue"></span>
                            <span className="period-dash blue"></span>
                            <span className="period-dash blue"></span>
                            <span className="period-dash blue"></span>
                            <span className="period-dash blue"></span>
                            <span className="period-dash no-color"></span>
                            <span className="period-dash no-color"></span>
                            <span className="period-dash no-color"></span>
                          </>
                        )}
                      </div>
                      {/* <span className="period-text">{cycle.details.period}</span> */}
                      
                      {/* Legend for Both Cycles */}
                      <div className="period-legend">
                        <div className="legend-item">
                          <span className="legend-dash red"></span>
                          <span className="legend-text">Period</span>
                        </div>
                        <div className="legend-item">
                          <span className="legend-dash blue"></span>
                          <span className="legend-text">Fertile Window</span>
                        </div>
                        <div className="legend-item">
                          <span className="legend-dash no-color"></span>
                          <span className="legend-text">Ovulation</span>
                        </div>
                      </div>
                    </div>

                    {/* Detailed Information Grid */}
                    <div className="cycle-details-grid">
                      <div className="detail-section">
                        <h4 className="detail-title">Observations</h4>
                        <p className="detail-value">{cycle.details.observations}</p>
                      </div>

                      <div className="detail-section">
                        <h4 className="detail-title">Fluid</h4>
                        <p className="detail-value">{cycle.details.fluid}</p>
                      </div>

                      <div className="detail-section">
                        <h4 className="detail-title">BBT</h4>
                        <p className="detail-value">{cycle.details.bbt}</p>
                      </div>

                      <div className="detail-section">
                        <h4 className="detail-title">Symptoms & Mood</h4>
                        <p className="detail-value">{cycle.details.symptoms}</p>
                      </div>

                      <div className="detail-section">
                        <h4 className="detail-title">Hormones</h4>
                        <div className="hormone-list">
                          {cycle.details.hormones.map((hormone, index) => (
                            <span key={index} className="hormone-item">
                              {hormone.name}({hormone.value})
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="detail-section">
                        <h4 className="detail-title">Medication</h4>
                        <div className="medication-item">
                          <span className="medication-icon">💊</span>
                          <span className="medication-text">
                            {cycle.details.medication.name}, {cycle.details.medication.dosage}, {cycle.details.medication.frequency}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        
        {activeTab === 'Chart' && (
          <div className="chart-content">
            {/* Cycle Selector */}
            <div>
            <div className="cycle-selector">
              <div className="cycle-info">
                <h3 className="cycle-title">Cycle - 28 Days</h3>
                <p className="cycle-dates">Aug 14 - Sept 9</p>
              </div>
              <div className="cycle-dropdown">
                <ChevronDownIcon />
              </div>
            </div>

            {/* BBT Chart */}
            <div className="chart-section">
              <h4 className="chart-title">BBT</h4>
              <div className="bbt-chart">
                <div className="chart-y-axis">
                  <span>36.6</span>
                  <span>36.5</span>
                  <span>36.4</span>
                  <span>36.3</span>
                  <span>36.2</span>
                  <span>36.1</span>
                </div>
                <div className="chart-area">
                  <div className="chart-grid">
                    <div className="grid-line"></div>
                    <div className="grid-line"></div>
                    <div className="grid-line"></div>
                    <div className="grid-line"></div>
                    <div className="grid-line"></div>
                    <div className="grid-line"></div>
                  </div>
                  <div className="chart-line">
                    <svg width="100%" height="200" viewBox="0 0 400 200">
                      <polyline
                        fill="none"
                        stroke="#1976d2"
                        strokeWidth="2"
                        points="20,160 40,140 60,150 80,120 100,130 120,100 140,110 160,80 180,90 200,70 220,80 240,60 260,70 280,50 300,60 320,40 340,50 360,30 380,40"
                      />
                      {/* Data points */}
                      <circle cx="20" cy="160" r="3" fill="#1976d2" />
                      <circle cx="40" cy="140" r="3" fill="#1976d2" />
                      <circle cx="60" cy="150" r="3" fill="#1976d2" />
                      <circle cx="80" cy="120" r="3" fill="#1976d2" />
                      <circle cx="100" cy="130" r="3" fill="#1976d2" />
                      <circle cx="120" cy="100" r="3" fill="#1976d2" />
                      <circle cx="140" cy="110" r="3" fill="#1976d2" />
                      <circle cx="160" cy="80" r="3" fill="#1976d2" />
                      <circle cx="180" cy="90" r="3" fill="#1976d2" />
                      <circle cx="200" cy="70" r="3" fill="#1976d2" />
                      <circle cx="220" cy="80" r="3" fill="#1976d2" />
                      <circle cx="240" cy="60" r="3" fill="#1976d2" />
                      <circle cx="260" cy="70" r="3" fill="#1976d2" />
                      <circle cx="280" cy="50" r="3" fill="#1976d2" />
                      <circle cx="300" cy="60" r="3" fill="#1976d2" />
                      <circle cx="320" cy="40" r="3" fill="#1976d2" />
                      <circle cx="340" cy="50" r="3" fill="#1976d2" />
                      <circle cx="360" cy="30" r="3" fill="#1976d2" />
                      <circle cx="380" cy="40" r="3" fill="#1976d2" />
                    </svg>
                  </div>
                  <div className="chart-x-axis">
                    <span>14</span>
                    <span>28</span>
                  </div>
                </div>
                <div className="chart-y-label">Temperature (C)</div>
                <div className="chart-x-label">Days</div>
              </div>
              
              {/* BBT Data Points */}
              {/* <div className="bbt-data-points">
                <div className="data-point"></div>
                <div className="data-point"></div>
                <div className="data-point"></div>
                <div className="data-point"></div>
                <div className="data-point"></div>
                <div className="data-point"></div>
                <div className="data-point"></div>
                <div className="data-point"></div>
                <div className="data-point"></div>
                <div className="data-point"></div>
              </div> */}
            </div>

            {/* Hormones Level Chart */}
            <div className="chart-section">
              <h4 className="chart-title">Hormones Level</h4>
              <div className="hormones-chart">
                <div className="chart-area">
                  <div className="chart-grid">
                    <div className="grid-line"></div>
                    <div className="grid-line"></div>
                    <div className="grid-line"></div>
                    <div className="grid-line"></div>
                    <div className="grid-line"></div>
                    <div className="grid-line"></div>
                  </div>
                  <div className="chart-line">
                    <svg width="100%" height="200" viewBox="0 0 400 200">
                      {/* Estrogen line (solid green) */}
                      <polyline
                        fill="none"
                        stroke="#4caf50"
                        strokeWidth="2"
                        points="20,180 40,160 60,140 80,120 100,100 120,80 140,100 160,120 180,100 200,80 220,100 240,120 260,100 280,80 300,100 320,120 340,100 360,80 380,100"
                      />
                      {/* Progesterone line (dashed pink) */}
                      <polyline
                        fill="none"
                        stroke="#e91e63"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                        points="20,180 40,170 60,150 80,130 100,110 120,90 140,110 160,130 180,110 200,90 220,110 240,130 260,110 280,90 300,110 320,130 340,110 360,90 380,110"
                      />
                    </svg>
                  </div>
                  <div className="chart-x-axis">
                    <span>14</span>
                    <span>28</span>
                  </div>
                </div>
                <div className="chart-y-label">Hormones Level</div>
                <div className="chart-x-label">Days</div>
                
                {/* Legend */}
                <div className="chart-legend">
                  <div className="legend-item">
                    <div className="legend-color estrogen"></div>
                    <span>Estrogen</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color progesterone"></div>
                    <span>Progesterone</span>
                  </div>
                </div>
              </div>
            </div>
                </div>
       
          </div>
        )}
      </div>
    </div>
  )
}
