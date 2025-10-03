import { useState } from 'react'

export default function TrackingSection({ title, options, type = 'circular', hasInfoIcon = false, onChange, isTwoRow = false }) {
  const [selectedOptions, setSelectedOptions] = useState(
    options.reduce((acc, option) => ({
      ...acc,
      [option.key]: option.selected || false
    }), {})
  )
  const [showTooltip, setShowTooltip] = useState(false)

  const handleOptionChange = (optionKey) => {
    if (optionKey === 'add') {
      // Handle add functionality
      return
    }

    const newState = { ...selectedOptions }
    
    // For circular type, allow multiple selections
    newState[optionKey] = !newState[optionKey]
    
    setSelectedOptions(newState)
    
    if (onChange) {
      onChange(optionKey, newState[optionKey])
    }
  }

  // Split options into two rows for cervical fluid appearance
  const firstRowOptions = isTwoRow ? options.slice(0, 8) : options
  const secondRowOptions = isTwoRow ? options.slice(8) : []

  const getTooltipContent = () => {
    if (title === 'Vulval Sensation') {
      return 'Vulval sensation refers to how you feel at the vaginal opening. A few times during the day, pause and pay gentle attention to this area of your body. Ask yourself: does it feel dry (a sense of nothing), sticky (the labia may stick together), wet, or slippery? Simply notice without judgment. At the end of the day, record the most noticeable or wettest sensation you experienced.'
    }
    return 'Information about this tracking section.'
  }

  const InfoIcon = () => (
    <div 
      className="info-icon-container"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <img src="/src/assets/icons/Icon.svg" alt="info" width="15" height="15" />
      {showTooltip && (
        <div className="tooltip">
          <div className="tooltip-content">
            {getTooltipContent()}
          </div>
        </div>
      )}
    </div>
  )

  const CircularOption = ({ option }) => {
    const isSelected = selectedOptions[option.key]
    const isAdd = option.isAdd

    if (isAdd) {
      return (
        <div className="tracking-option add-option" onClick={() => handleOptionChange(option.key)}>
          <div className="option-circle add-circle">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.25 2.5H3.75C3.05964 2.5 2.5 3.05964 2.5 3.75V16.25C2.5 16.9404 3.05964 17.5 3.75 17.5H16.25C16.9404 17.5 17.5 16.9404 17.5 16.25V3.75C17.5 3.05964 16.9404 2.5 16.25 2.5Z" stroke="#0D99FF" strokeWidth="2" strokeLinejoin="round"/>
              <path d="M10 6.66699V13.3337M6.66669 10.0003H13.3334" stroke="#0D99FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="option-label">{option.label}</span>
        </div>
      )
    }

    return (
      <div className="tracking-option" onClick={() => handleOptionChange(option.key)}>
        <div className={`option-circle ${isSelected ? 'selected' : ''}`}>
          {isSelected && (
            <>
              <div className="option-image">
                <img src="/src/assets/icons/selected_option.svg" alt="selected option" width="18" height="18" />
              </div>
              <div className="selection-indicator">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="10" cy="10" r="10" fill="white"/>
                  <path d="M10 1.667C5.41666 1.667 1.66666 5.417 1.66666 10.0003C1.66666 14.5837 5.41666 18.3337 10 18.3337C14.5833 18.3337 18.3333 14.5837 18.3333 10.0003C18.3333 5.417 14.5833 1.667 10 1.667ZM8.33333 14.167L4.16666 10.0003L5.34166 8.8253L8.33333 11.8087L14.6583 5.4837L15.8333 6.667L8.33333 14.167Z" fill="#2483C5"/>
                </svg>
              </div>
            </>
          )}
          {!isSelected && (
            <div className="option-image">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.818 18C1.2998 18 0.867414 17.8267 0.520863 17.4802C0.174312 17.1337 0.000656128 16.701 0 16.182V1.818C0 1.29976 0.173656 0.867414 0.520863 0.520863C0.868071 0.174312 1.30052 0.000656128 1.818 0H16.1831C16.7006 0 17.133 0.173656 17.4802 0.520863C17.8275 0.868071 18.0007 1.30052 18 1.818V16.1831C18 16.7006 17.8267 17.133 17.4802 17.4802C17.1337 17.8275 16.701 18.0007 16.182 18H1.818ZM1.818 16.875H16.1831C16.3556 16.875 16.5142 16.803 16.659 16.659C16.8037 16.515 16.8757 16.356 16.875 16.182V1.818C16.875 1.64471 16.803 1.48571 16.659 1.341C16.515 1.19629 16.356 1.12429 16.182 1.125H1.818C1.64471 1.125 1.48571 1.197 1.341 1.341C1.19629 1.485 1.12429 1.644 1.125 1.818V16.1831C1.125 16.3556 1.197 16.5142 1.341 16.659C1.485 16.8037 1.6436 16.8757 1.8169 16.875M3.9375 14.0625H14.2357L11.0554 9.82124L8.11354 13.5427L6.14479 11.1634L3.9375 14.0625Z" fill="#0D99FF"/>
              </svg>
            </div>
          )}
        </div>
        <span className="option-label">{option.label}</span>
      </div>
    )
  }

  return (
    <div className="tracking-section">
      <div className="logs-section-header">
        <h3 className="logs-section-title" >{title}</h3>
        {hasInfoIcon && (
          <div className="section-info-icon">
            <InfoIcon />
          </div>
        )}
      </div>
      
      <div className={`tracking-options ${type} ${isTwoRow ? 'two-row' : ''}`}>
        {isTwoRow ? (
          <>
            <div className="tracking-row">
              {firstRowOptions.map((option) => (
                <CircularOption key={option.key} option={option} />
              ))}
            </div>
            <div className="tracking-row">
              {secondRowOptions.map((option) => (
                <CircularOption key={option.key} option={option} />
              ))}
            </div>
          </>
        ) : (
          options.map((option) => (
            <CircularOption key={option.key} option={option} />
          ))
        )}
      </div>
    </div>
  )
}
