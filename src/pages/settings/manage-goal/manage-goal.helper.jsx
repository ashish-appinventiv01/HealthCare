import { useMemo, useState } from 'react'

export default function useManageGoalHelper() {
  const [goals, setGoals] = useState({
    periodPredictions: false,
    periodNotifications: false,
    fertilityEstimation: false,
    fertilityNotification: false,
    cycleDeviation: false,
    manageSymptoms: false
  })

  const toggle = (key) => {
    setGoals((g) => ({ ...g, [key]: !g[key] }))
  }

  const items = useMemo(() => ([
    { key: 'periodPredictions', label: 'Period Predictions' },
    { key: 'periodNotifications', label: 'Period Notifications' },
    { key: 'fertilityEstimation', label: 'Fertility Status Estimation' },
    { key: 'fertilityNotification', label: 'Fertility Status Notification' },
    { key: 'cycleDeviation', label: 'Cycle Deviation' },
    { key: 'manageSymptoms', label: 'Manage Symptoms' }
  ]), [])

  return {
    goals,
    toggle,
    items
  }
}


