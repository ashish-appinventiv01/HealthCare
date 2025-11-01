export type Reminder = {
  id: string
  title: string
  schedule: string
  enabled: boolean
}

export type UseRemindersHelperReturn = {
  reminders: Reminder[]
  setReminders: React.Dispatch<React.SetStateAction<Reminder[]>>
  openModal: boolean
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  toggleReminder: (id: string) => void
  deleteReminder: (id: string) => void
}


