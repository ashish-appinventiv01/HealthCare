import { useMemo, useState } from 'react'
import type { GoalsState, GoalKey, GoalItem, UseManageGoalHelperReturn } from './manage-goal.interface'

export default function useManageGoalHelper(): UseManageGoalHelperReturn {
  const [goals, setGoals] = useState<GoalsState>({
    periodPredictions: false,
    periodNotifications: false,
    fertilityEstimation: false,
    fertilityNotification: false,
    cycleDeviation: false,
    manageSymptoms: false,
  })

  const toggle = (key: GoalKey) => {
    setGoals(g => ({ ...g, [key]: !g[key] }))
  }

  const items: GoalItem[] = useMemo(() => ([
    { key: 'periodPredictions', label: 'Period Predictions' },
    { key: 'periodNotifications', label: 'Period Notifications' },
    { key: 'fertilityEstimation', label: 'Fertility Status Estimation' },
    { key: 'fertilityNotification', label: 'Fertility Status Notification' },
    { key: 'cycleDeviation', label: 'Cycle Deviation' },
    { key: 'manageSymptoms', label: 'Manage Symptoms' },
  ]), [])

  return { goals, toggle, items }
}


