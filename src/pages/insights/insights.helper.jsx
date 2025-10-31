import { useMemo, useState } from 'react'
import { Chevron } from '../../assets/index.js'

export default function useInsightsHelper() {
  const [activeTab, setActiveTab] = useState('Summary')
  const [expandedCards, setExpandedCards] = useState({})

  const toggleCard = (cardId) => {
    setExpandedCards(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }))
  }

  const ChevronDownIcon = ({ rotated = false }) => (
    <img
      className={rotated ? 'chevron rotated' : 'chevron'}
      src={Chevron}
      width="20"
      height="20"
      alt="Chevron"
    />
  )

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
          { name: 'FSH', value: '-ve' }
        ],
        medication: {
          name: 'Paracetamol',
          dosage: '650mg',
          frequency: 'Daily'
        }
      }
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
          { name: 'FSH', value: '-ve' }
        ],
        medication: {
          name: 'Paracetamol',
          dosage: '650mg',
          frequency: 'Daily'
        }
      }
    }
  ]), [])

  return {
    activeTab,
    setActiveTab,
    expandedCards,
    toggleCard,
    ChevronDownIcon,
    cycleData
  }
}


