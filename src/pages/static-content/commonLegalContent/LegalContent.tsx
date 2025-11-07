import { Card } from '@/components/ui/card'

export default function LegalContent({ title, content }) {
  return (
    <div className="home-container">
      <Card >
        <h2 className="title-style">{title}</h2>
        <div className="pages-list">
        <div className="static-content-section">
          <div className="static-content-body">
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
        </div>
      </Card>
    </div>
  )
}



