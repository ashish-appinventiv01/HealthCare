export type Hormone = { name: string; value: string }

export type Medication = {
  name: string
  dosage: string
  frequency: string
}

export type CycleDetails = {
  period: string
  observations: string
  fluid: string
  bbt: string
  symptoms: string
  hormones: Hormone[]
  medication: Medication
}

export type Cycle = {
  id: string
  title: string
  subtitle: string
  isCurrent: boolean
  details: CycleDetails
}

export type ActiveTab = 'Summary' | 'Chart'

export type UseInsightsHelperReturn = {
  activeTab: ActiveTab
  setActiveTab: React.Dispatch<React.SetStateAction<ActiveTab>>
  expandedCards: Record<string, boolean>
  toggleCard: (cardId: string) => void
  cycleData: Cycle[]
}


