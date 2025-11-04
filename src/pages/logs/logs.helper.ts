import { useMemo, useState } from 'react'
import type { TrackingData, UseLogsHelperReturn, UrinaryHormones, OptionItem, Medication } from './logs.interface'

export default function useLogsHelper(): UseLogsHelperReturn {
  const [selectedDate, setSelectedDate] = useState<string>('03')
  const [showMedicationModal, setShowMedicationModal] = useState<boolean>(false)
  const [trackingData, setTrackingData] = useState<TrackingData>({
    bleeding: { heavy: false, medium: false, light: false, spotting: false, none: false },
    vulvalSensation: { dry: false, moist: false, wet: false, slippery: false, sticky: false, none: false },
    cervicalFluid: { white: false, yellow: false, thick: false, thin: false, watery: false, clear: false, lotion: false, pasty: false, streaked: false, cloudy: false, stretchy: false, none: false },
    mood: { happy: false, relaxed: false, anxious: false, irritable: false, tired: false, energetic: false, none: false },
    symptoms: { breastTenderness: false, cramps: false, bloating: false, perinealPain: false, acne: false, exercise: false, sleep: false, cravings: false, none: false },
    sleepDisturbances: { troubleSleeping: false, frequentWaking: false, restlessSleep: false, earlyWaking: false, insomnia: false, nightSweats: false, none: false },
    basalBodyTemperature: '',
    temperatureUnit: 'F',
    urinaryHormones: { lh: 'positive', fsh: '', estrogen: '', progesterone: '' },
    medications: [
      { id: 'med-1', name: 'Paracetamol', dosage: '650mg', time: 'day' },
    ],
    notes: '',
  })

  const handleTrackingChange: UseLogsHelperReturn['handleTrackingChange'] = (section, key, value) => {
    setTrackingData(prev => ({
      ...prev,
      [section]: {
        ...(prev as unknown as Record<string, unknown>)[section] as Record<string, unknown>,
        [key]: value,
      },
    }))
  }

  const handleHormoneChange: UseLogsHelperReturn['handleHormoneChange'] = (hormone, value) => {
    setTrackingData(prev => ({
      ...prev,
      urinaryHormones: {
        ...prev.urinaryHormones,
        [hormone]: value,
      },
    }))
  }

  const handleDateChange: UseLogsHelperReturn['handleDateChange'] = (date) => {
    setSelectedDate(date)
  }

  const handleAddMedication: UseLogsHelperReturn['handleAddMedication'] = () => {
    setShowMedicationModal(true)
  }

  const handleSaveMedication: UseLogsHelperReturn['handleSaveMedication'] = (medication) => {
    setTrackingData(prev => ({
      ...prev,
      medications: [...prev.medications, medication],
    }))
  }

  const handleCloseMedicationModal: UseLogsHelperReturn['handleCloseMedicationModal'] = () => {
    setShowMedicationModal(false)
  }

  const handleEditMedication: UseLogsHelperReturn['handleEditMedication'] = (index) => {
    console.log('Edit medication at index:', index)
  }

  const handleDeleteMedication: UseLogsHelperReturn['handleDeleteMedication'] = (index) => {
    setTrackingData(prev => ({
      ...prev,
      medications: prev.medications.filter((_, i) => i !== index),
    }))
  }

  const bleedingOptions: OptionItem[] = useMemo(() => ([
    { key: 'heavy', label: 'Heavy' },
    { key: 'medium', label: 'Medium' },
    { key: 'light', label: 'Light' },
    { key: 'spotting', label: 'Spotting' },
    { key: 'none', label: 'None' },
    { key: 'add', label: 'Add', isAdd: true },
  ]), [])

  const vulvalSensationOptions: OptionItem[] = useMemo(() => ([
    { key: 'dry', label: 'Dry' },
    { key: 'moist', label: 'Moist' },
    { key: 'wet', label: 'Wet' },
    { key: 'slippery', label: 'Slippery' },
    { key: 'sticky', label: 'Sticky' },
    { key: 'none', label: 'None' },
    { key: 'add', label: 'Add', isAdd: true },
  ]), [])

  const cervicalFluidOptions: OptionItem[] = useMemo(() => ([
    { key: 'white', label: 'White' },
    { key: 'yellow', label: 'Yellow' },
    { key: 'thick', label: 'Thick' },
    { key: 'thin', label: 'Thin' },
    { key: 'watery', label: 'Watery' },
    { key: 'clear', label: 'Clear' },
    { key: 'lotion', label: 'Lotion' },
    { key: 'pasty', label: 'Pasty' },
    { key: 'streaked', label: 'Streaked' },
    { key: 'cloudy', label: 'Cloudy' },
    { key: 'stretchy', label: 'Stretchy' },
    { key: 'none', label: 'None' },
    { key: 'add', label: 'Add', isAdd: true },
  ]), [])

  const moodOptions: OptionItem[] = useMemo(() => ([
    { key: 'happy', label: 'Happy' },
    { key: 'relaxed', label: 'Relaxed' },
    { key: 'anxious', label: 'Anxious' },
    { key: 'irritable', label: 'Irritable' },
    { key: 'tired', label: 'Tired' },
    { key: 'energetic', label: 'Energetic' },
    { key: 'none', label: 'None' },
    { key: 'add', label: 'Add', isAdd: true },
  ]), [])

  const symptomsOptions: OptionItem[] = useMemo(() => ([
    { key: 'breastTenderness', label: 'Breast\nTenderness' },
    { key: 'cramps', label: 'Cramps' },
    { key: 'bloating', label: 'Bloating' },
    { key: 'perinealPain', label: 'Perineal\nPain' },
    { key: 'acne', label: 'Acne' },
    { key: 'exercise', label: 'Exercise' },
    { key: 'sleep', label: 'Sleep' },
    { key: 'cravings', label: 'Cravings' },
    { key: 'none', label: 'None' },
    { key: 'add', label: 'Add', isAdd: true },
  ]), [])

  const sleepDisturbancesOptions: OptionItem[] = useMemo(() => ([
    { key: 'troubleSleeping', label: 'Trouble\nSleeping' },
    { key: 'frequentWaking', label: 'Frequent\nWaking' },
    { key: 'restlessSleep', label: 'Restless\nSleep' },
    { key: 'earlyWaking', label: 'Early\nWaking' },
    { key: 'insomnia', label: 'Insomnia' },
    { key: 'nightSweats', label: 'Night\nSweats' },
    { key: 'none', label: 'None' },
    { key: 'add', label: 'Add', isAdd: true },
  ]), [])

  return {
    selectedDate,
    setSelectedDate,
    showMedicationModal,
    setShowMedicationModal,
    trackingData,
    setTrackingData,
    handleTrackingChange,
    handleHormoneChange,
    handleDateChange,
    handleAddMedication,
    handleSaveMedication,
    handleCloseMedicationModal,
    handleEditMedication,
    handleDeleteMedication,
    bleedingOptions,
    vulvalSensationOptions,
    cervicalFluidOptions,
    moodOptions,
    symptomsOptions,
    sleepDisturbancesOptions,
  }
}


