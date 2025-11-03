export type GoalKey =
  | 'periodPredictions'
  | 'periodNotifications'
  | 'fertilityEstimation'
  | 'fertilityNotification'
  | 'cycleDeviation'
  | 'manageSymptoms'

export type GoalsState = Record<GoalKey, boolean>

export type GoalItem = { key: GoalKey; label: string }

export type UseManageGoalHelperReturn = {
  goals: GoalsState
  toggle: (key: GoalKey) => void
  items: GoalItem[]
}




