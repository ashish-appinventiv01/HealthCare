import { useState } from 'react'
import deleteIcon from '@/assets/icons/delete_icon.svg'
import ReminderModal from '@/components/Modals/ReminderModal.jsx'

export default function Reminders() {
  const [reminders, setReminders] = useState([
    { id: 'daily', title: 'Daily Log Reminder', schedule: '10:00 AM, Daily', enabled: true },
    { id: 'medicine', title: 'Medicine Log Reminder', schedule: '10:00 AM, Daily', enabled: false },
  ])
  const [openModal, setOpenModal] = useState(false)

  const toggleReminder = (id) => {
    setReminders((items) => items.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r)))
  }

  const deleteReminder = (id) => {
    setReminders((items) => items.filter((r) => r.id !== id))
  }

  return (
    <div className="reminders-shell">
      <div className="reminders-header">
        <div className="reminders-title">Reminders</div>
        <div className="reminders-actions">
          <button
            type="button"
            className="reminders-add"
            onClick={() => setOpenModal(true)}
          >
            <span className="reminders-add-label">+ Add</span>
          </button>
        </div>
      </div>

      <div className="reminders-list">
        {reminders.map((r) => (
          <div key={r.id} className="reminder-item">
            <div className="reminder-item-main">
              <div className="reminder-item-title">{r.title}</div>
              <div className="reminder-item-sub">{r.schedule}</div>
            </div>

            <button
              aria-label={r.enabled ? 'Disable reminder' : 'Enable reminder'}
              onClick={() => toggleReminder(r.id)}
              className={`reminder-toggle ${r.enabled ? 'on' : 'off'}`}
            >
              <div className="reminder-toggle-knob" />
            </button>

            <button
              aria-label="Delete reminder"
              onClick={() => deleteReminder(r.id)}
              className="reminder-delete"
            >
              <img src={deleteIcon} alt="Delete" className="reminder-delete-icon" />
            </button>
          </div>
        ))}
      </div>

      <ReminderModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSave={(newReminder) => setReminders((list) => [...list, newReminder])}
      />
    </div>
  )
}


