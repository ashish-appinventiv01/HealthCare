import { useState } from 'react'

// Calendar Icon Component
const CalendarIcon = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="44" height="44" rx="8" fill="#2483C5" fillOpacity="0.1"/>
    <path d="M18.2471 22H16.2471C15.1441 22 14.2471 22.897 14.2471 24V26C14.2471 27.103 15.1441 28 16.2471 28H18.2471C19.3501 28 20.2471 27.103 20.2471 26V24C20.2471 22.897 19.3501 22 18.2471 22ZM16.2471 26V24H18.2471V26H16.2471ZM29.2471 12H28.2471V11C28.2471 10.448 27.8001 10 27.2471 10C26.6941 10 26.2471 10.448 26.2471 11V12H18.2471V11C18.2471 10.448 17.8001 10 17.2471 10C16.6941 10 16.2471 10.448 16.2471 11V12H15.2471C12.4901 12 10.2471 14.243 10.2471 17V29C10.2471 31.757 12.4901 34 15.2471 34H29.2471C32.0041 34 34.2471 31.757 34.2471 29V17C34.2471 14.243 32.0041 12 29.2471 12ZM15.2471 14H29.2471C30.9011 14 32.2471 15.346 32.2471 17V18H12.2471V17C12.2471 15.346 13.5931 14 15.2471 14ZM29.2471 32H15.2471C13.5931 32 12.2471 30.654 12.2471 29V20H32.2471V29C32.2471 30.654 30.9011 32 29.2471 32Z" fill="#2483C5"/>
  </svg>
)

// Arrow Left Icon Component
const ArrowLeftIcon = () => (
  <svg width="13" height="21" viewBox="0 0 13 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.60665 10.3654L12.6684 18.4271L10.365 20.7305L1.23978e-05 10.3654L10.365 0.000469208L12.6684 2.30379L4.60665 10.3654Z" fill="#191919"/>
  </svg>
)

// Arrow Right Icon Component
const ArrowRightIcon = () => (
  <svg width="13" height="21" viewBox="0 0 13 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.06175 10.3651L0 2.30333L2.30335 0L12.6684 10.3651L2.30335 20.73L0 18.4267L8.06175 10.3651Z" fill="#191919"/>
  </svg>
)

export default function DateSelector({ 
  selectedDate, 
  onDateChange, 
  dateDisplayText = "Today, 03 September, 2025",
  showCalendarIcon = true,
  className = ""
}) {
  // Generate calendar days (showing 13 days as in the design)
  const generateCalendarDays = () => {
    const days = []
    const currentDate = parseInt(selectedDate)
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    
    // Generate 6 days before and 6 days after the selected date
    for (let i = -6; i <= 6; i++) {
      const dayNumber = currentDate + i
      if (dayNumber >= 1 && dayNumber <= 31) {
        const dayOfWeek = daysOfWeek[(new Date(2025, 8, dayNumber).getDay())] // September 2025
        const isSelected = String(dayNumber).padStart(2, '0') === selectedDate
        
        days.push({
          number: String(dayNumber).padStart(2, '0'),
          day: dayOfWeek,
          isSelected
        })
      }
    }
    return days
  }

  const handleDateSelect = (date) => {
    onDateChange(date)
  }

  const handlePreviousDate = () => {
    const currentDate = parseInt(selectedDate)
    const newDate = currentDate - 1
    if (newDate >= 1) {
      onDateChange(String(newDate).padStart(2, '0'))
    }
  }

  const handleNextDate = () => {
    const currentDate = parseInt(selectedDate)
    const newDate = currentDate + 1
    if (newDate <= 31) {
      onDateChange(String(newDate).padStart(2, '0'))
    }
  }

  return (
    <div className={`date-selector ${className}`}>
      <div className="date-display">
        <span className="date-text">{dateDisplayText}</span>
        {showCalendarIcon && <CalendarIcon />}
      </div>

      {/* Calendar Strip */}
      <div className="calendar-strip">
        <button className="nav-arrow" onClick={handlePreviousDate}>
          <ArrowLeftIcon />
        </button>
        {generateCalendarDays().map((day, index) => (
          <button
            key={index}
            className={`calendar-day ${day.isSelected ? 'selected' : ''}`}
            onClick={() => handleDateSelect(day.number)}
          >
            <span className="day-number">{day.number}</span>
            <span className="day-name">{day.day}</span>
          </button>
        ))}
        <button className="nav-arrow" onClick={handleNextDate}>
          <ArrowRightIcon />
        </button>
      </div>
    </div>
  )
}
