export type DashboardFormData = {
  name: string
  email: string
  phone: string
  dob: string
}

export type UseDashboardHelperReturn = {
  formData: DashboardFormData
  setFormData: React.Dispatch<React.SetStateAction<DashboardFormData>>
  showPhoneModal: boolean
  setShowPhoneModal: React.Dispatch<React.SetStateAction<boolean>>
  dobInputRef: React.RefObject<HTMLInputElement | null>
  handleInputChange: <K extends keyof DashboardFormData>(field: K, value: DashboardFormData[K]) => void
  handlePhoneClick: () => void
  handlePhoneVerify: (phoneNumber: string) => void
  openDobPicker: () => void
}


