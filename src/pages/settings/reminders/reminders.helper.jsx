import { useState } from 'react'

export default function useRemindersHelper() {
  const [reminders, setReminders] = useState([
    { id: 'daily', title: 'Daily Log Reminder', schedule: '10:00 AM, Daily', enabled: true },
    { id: 'medicine', title: 'Medicine Log Reminder', schedule: '10:00 AM, Daily', enabled: false }
  ])
  const [openModal, setOpenModal] = useState(false)

  const toggleReminder = (id) => {
    setReminders((items) => items.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r)))
  }

  const deleteReminder = (id) => {
    setReminders((items) => items.filter((r) => r.id !== id))
  }

  return {
    reminders,
    setReminders,
    openModal,
    setOpenModal,
    toggleReminder,
    deleteReminder
  }
}


