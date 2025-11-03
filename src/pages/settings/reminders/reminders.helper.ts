import { useState } from 'react'
import type { UseRemindersHelperReturn, Reminder } from './reminders.interface'

export default function useRemindersHelper(): UseRemindersHelperReturn {
  const [reminders, setReminders] = useState<Reminder[]>([
    { id: 'daily', title: 'Daily Log Reminder', schedule: '10:00 AM, Daily', enabled: true },
    { id: 'medicine', title: 'Medicine Log Reminder', schedule: '10:00 AM, Daily', enabled: false },
  ])
  const [openModal, setOpenModal] = useState<boolean>(false)

  const toggleReminder: UseRemindersHelperReturn['toggleReminder'] = (id) => {
    setReminders(items => items.map(r => (r.id === id ? { ...r, enabled: !r.enabled } : r)))
  }

  const deleteReminder: UseRemindersHelperReturn['deleteReminder'] = (id) => {
    setReminders(items => items.filter(r => r.id !== id))
  }

  return { reminders, setReminders, openModal, setOpenModal, toggleReminder, deleteReminder }
}




