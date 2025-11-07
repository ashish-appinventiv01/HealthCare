import React, { lazy } from 'react'
import { useParams } from 'react-router-dom'
import { getStaticRenderConfig, LEGAL_COPY } from './static-content.helper'

// Lazy-load to keep bundles small when a specific page isn't needed
const FAQs = lazy(() => import('./faq/FAQs'))
const LegalContent = lazy(() => import('./commonLegalContent/LegalContent'))


export default function StaticContent({ initialPage }: { initialPage?: string }) {
  const params = useParams()
  const page = (params && params.page) || initialPage || ''

  const cfg = getStaticRenderConfig(page)
  if (cfg.type === 'faqs') return <FAQs />
  if (cfg.type === 'legal' && cfg.legalKey) {
    return <LegalContent {...LEGAL_COPY[cfg.legalKey]} />
  }

  return (
    <div className="home-container">
      <div className="static-content-section">
        <h2 className="title-style">Not Found</h2>
        <p className="static-content-body" style={{ maxHeight: 'unset', overflowY: 'visible', paddingRight: 0 }}>
          Requested content is not available.
        </p>
      </div>
    </div>
  )
}


