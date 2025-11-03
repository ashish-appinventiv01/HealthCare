import { useMemo, useState } from 'react'
import type { ActiveTab, UseInsightsHelperReturn } from './insights.interface'

export default function useInsightsHelper(): UseInsightsHelperReturn {
  const [activeTab, setActiveTab] = useState<ActiveTab>('Summary')
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({})

  const toggleCard = (cardId: string) => {
    setExpandedCards(prev => ({
      ...prev,
      [cardId]: !prev[cardId],
    }))
  }

  const cycleData = useMemo(() => ([
    {
      id: 'current',
      title: 'Current Cycle - 3 Days',
      subtitle: 'Started Sept 10',
      isCurrent: true,
      details: {
        period: 'Period',
        observations: 'Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum',
        fluid: 'Pasty & Dry',
        bbt: '22.7 F',
        symptoms: 'Bloating & Anxious',
        hormones: [
          { name: 'LH', value: '+ve' },
          { name: 'FSH', value: '-ve' },
        ],
        medication: {
          name: 'Paracetamol',
          dosage: '650mg',
          frequency: 'Daily',
        },
      },
    },
    {
      id: 'previous',
      title: 'Cycle - 27 Days',
      subtitle: 'Aug 14- Sept 9',
      isCurrent: false,
      details: {
        period: 'Period',
        observations: 'Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum',
        fluid: 'Pasty & Dry',
        bbt: '22.7 F',
        symptoms: 'Bloating & Anxious',
        hormones: [
          { name: 'LH', value: '+ve' },
          { name: 'FSH', value: '-ve' },
        ],
        medication: {
          name: 'Paracetamol',
          dosage: '650mg',
          frequency: 'Daily',
        },
      },
    },
  ]), [])

  return {
    activeTab,
    setActiveTab,
    expandedCards,
    toggleCard,
    cycleData,
  }
}




