import { useEffect, useMemo, useState } from 'react'
import DatePicker from '../common/DatePicker.jsx'
import TimePicker from '../common/TimePicker.jsx'
import MUITextField from '../common/MUITextField.jsx'
import MUISelect from '../common/MUISelect.jsx'

const FREQUENCIES = ['Daily', 'Weekly', 'Monthly', 'Once']

const ArrowCircle = ({ className }) => (
  <div
    aria-hidden
    className={className}
    style={{
      width: 28,
      height: 28,
      borderRadius: '50%',
      backgroundColor: '#2483C5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'transform 0.2s ease',
      top: '14px'
    }}
  >
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 10l5 5 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
)

export default function ReminderModal({ open, onClose, onSave }) {
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [frequency, setFrequency] = useState('Daily')

  useEffect(() => {
    if (open) {
      setTitle('')
      setDate('')
      setTime('')
      setFrequency('Daily')
    }
  }, [open])

  const canSave = useMemo(() => title.trim().length > 0 && time, [title, time])

  const formatTime = (t) => {
    if (!t) return ''
    const [h, m] = t.split(':').map((s) => parseInt(s, 10))
    const ampm = h >= 12 ? 'PM' : 'AM'
    const hr = ((h + 11) % 12) + 1
    const mm = String(m).padStart(2, '0')
    return `${hr}:${mm} ${ampm}`
  }

  const formatDate = (d) => {
    if (!d) return ''
    const dt = new Date(d + 'T00:00:00')
    return dt.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const handleSave = () => {
    if (!canSave) return
    const id = `r-${Date.now()}`
    const scheduleParts = []
    if (date) scheduleParts.push(formatDate(date))
    if (time) scheduleParts.push(formatTime(time))
    if (frequency) scheduleParts.push(frequency)
    onSave?.({ id, title: title.trim(), schedule: scheduleParts.join(', '), enabled: false })
    onClose?.()
  }

  if (!open) return null

  return (
    <div className="reminder-modal-backdrop" onClick={onClose}>
      <div className="reminder-modal" onClick={(e) => e.stopPropagation()}>
        <div className="reminder-modal-content">
          <h3 className="reminder-modal-title">Add Reminder</h3>

          <div className="reminder-form">
            <div className="reminder-field">
              <MUITextField
                label={"Title"}
                value={title}
                onChange={setTitle}
                placeholder="Enter Title"
              />
            </div>

            <div className="reminder-field">
           
              <DatePicker
                label={"Date"}
                value={date}
                onChange={(newVal) => setDate(newVal)}
                placeholder="Select Date"
              />
            </div>

            <div className="reminder-field">
              <TimePicker
                label={"Time"}
                value={time}
                onChange={(newVal) => setTime(newVal)}
                placeholder="Select the time"
                minutesStep={5}
              />
            </div>

            <div className="reminder-field">
              <MUISelect
                label={"Frequency"}
                value={frequency}
                onChange={setFrequency}
                options={FREQUENCIES}
                SelectProps={{ IconComponent: ArrowCircle }}
              />
            </div>
          </div>

          <div className="reminder-modal-actions">
            <button className="reminder-modal-button cancel" onClick={onClose}>Cancel</button>
            <button
              className={`reminder-modal-button save ${canSave ? 'enabled' : 'disabled'}`}
              onClick={handleSave}
              disabled={!canSave}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}


