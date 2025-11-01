import { ArrowRight, ArrowLeft, DateSelectorCalendar } from '../../../assets'

interface DateSelectorProps {
  selectedDate: string
  onDateChange: (value: string) => void
  dateDisplayText?: string
  showCalendarIcon?: boolean
  className?: string
}

export default function DateSelector({ 
  selectedDate, 
  onDateChange, 
  dateDisplayText = "Today, 03 September, 2025",
  showCalendarIcon = true,
  className = ""
}: DateSelectorProps) {
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

  const handleDateSelect = (date: string) => {
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
        {showCalendarIcon && (
          <img src={DateSelectorCalendar} alt="calendar" width={44} height={44} />
        )}
      </div>

      {/* Calendar Strip */}
      <div className="calendar-strip">
        <button className="nav-arrow" onClick={handlePreviousDate}>
          <img src={ArrowLeft} alt="previous" width={13} height={21} />
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
          <img src={ArrowRight} alt="next" width={13} height={21} />
        </button>
      </div>
    </div>
  )
}
