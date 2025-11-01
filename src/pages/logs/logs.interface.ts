export type BooleanOptions = Record<string, boolean>

export type UrinaryHormones = {
  lh: 'positive' | 'negative' | ''
  fsh: 'positive' | 'negative' | ''
  estrogen: 'positive' | 'negative' | ''
  progesterone: 'positive' | 'negative' | ''
}

export type Medication = {
  id: string
  name: string
  dosage: string
  time: string
}

export type TrackingData = {
  bleeding: BooleanOptions
  vulvalSensation: BooleanOptions
  cervicalFluid: BooleanOptions
  mood: BooleanOptions
  symptoms: BooleanOptions
  sleepDisturbances: BooleanOptions
  basalBodyTemperature: string
  temperatureUnit: 'F' | 'C'
  urinaryHormones: UrinaryHormones
  medications: Medication[]
  notes: string
}

export type OptionItem = { key: string; label: string; isAdd?: boolean }

export type UseLogsHelperReturn = {
  selectedDate: string
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>
  showMedicationModal: boolean
  setShowMedicationModal: React.Dispatch<React.SetStateAction<boolean>>
  trackingData: TrackingData
  setTrackingData: React.Dispatch<React.SetStateAction<TrackingData>>
  handleTrackingChange: (section: keyof TrackingData, key: string, value: boolean | string) => void
  handleHormoneChange: (hormone: keyof UrinaryHormones, value: UrinaryHormones[keyof UrinaryHormones]) => void
  handleDateChange: (date: string) => void
  handleAddMedication: () => void
  handleSaveMedication: (medication: Medication) => void
  handleCloseMedicationModal: () => void
  handleEditMedication: (index: number) => void
  handleDeleteMedication: (index: number) => void
  bleedingOptions: OptionItem[]
  vulvalSensationOptions: OptionItem[]
  cervicalFluidOptions: OptionItem[]
  moodOptions: OptionItem[]
  symptomsOptions: OptionItem[]
  sleepDisturbancesOptions: OptionItem[]
}


