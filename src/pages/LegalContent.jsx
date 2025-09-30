import { Card } from '@/components/ui/card'

export default function LegalContent({ title, content }) {
  return (
    <div className="reminders-shell">
      <Card className="settings-card">
        <h2 style={{ margin: '16px 0 24px 8px', color: '#1a79bd' }}>{title}</h2>
        <div style={{  borderRadius: 8, padding: 10 }}>
          <div
            style={{
              color: '#3b5162',
              lineHeight: 1.7,
              fontSize: 14,
              maxHeight: '60vh',
              overflowY: 'auto',
              paddingRight: 8,
            }}
          >
            {Array.isArray(content)
              ? content.map((paragraph, idx) => (
                  <p
                    key={idx}
                    style={{ margin: idx === 0 ? '0 0 16px 0' : '16px 0 16px 0' }}
                  >
                    {paragraph}
                  </p>
                ))
              : <p style={{ margin: 0 }}>{content}</p>}
          </div>
        </div>
      </Card>
    </div>
  )
}


