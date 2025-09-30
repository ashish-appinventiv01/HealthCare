import { useState } from 'react'
import { Card } from '@/components/ui/card'

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState(0)

  const faqs = [
    {
      q: 'What is Basal Body Temperature (BBT)?',
      a:
        "Basal Body Temperature (BBT) is your body’s lowest resting temperature, usually measured right after waking up in the morning, before getting out of bed or doing any activity. It reflects subtle changes in your hormones during the menstrual cycle.",
    },
    { q: 'Lorem Ipsum', a: 'Answer content goes here.' },
    { q: 'Lorem Ipsum', a: 'Answer content goes here.' },
    { q: 'Lorem Ipsum', a: 'Answer content goes here.' },
    { q: 'Lorem Ipsum', a: 'Answer content goes here.' },
    { q: 'Lorem Ipsum', a: 'Answer content goes here.' },
  ]

  return (
    <div className="reminders-shell">
      <Card className="settings-card">
        <h2 style={{ margin: '16px 0 24px 0', color: '#1a79bd', paddingLeft: 16 }}>FAQs</h2>
        <div style={{ padding: 16 }}>
          <div className="faq-list">
            {faqs.map((item, index) => {
              const isOpen = openIndex === index
              return (
                <div key={index} className="faq-item">
                  <button
                    className="faq-question"
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                  >
                    <span>{item.q}</span>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={isOpen ? 'chev up' : 'chev'}
                    >
                      <path d="M7.41 8.59L12 13.17L16.59 8.59L18 10L12 16L6 10L7.41 8.59Z" fill="#2483C5"/>
                    </svg>
                  </button>
                  {isOpen && (
                    <div className="faq-answer">
                      {item.a}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </Card>
    </div>
  )
}


