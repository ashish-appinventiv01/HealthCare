// Centralized static copy and helpers for static-content routing/rendering
import React, { lazy } from 'react'
import type { LegalCopy, LegalKey, StaticRenderConfig, UseStaticContentHelperReturn } from './static-content.interface'

export const LEGAL_COPY: LegalCopy = {
  terms: {
    title: 'Terms of Use',
    content: [
      'Terms of service are the legal agreements between a service provider and a person who wants to use that service. The person must agree to abide by the terms of service in order to use the offered service. Terms of service can also be merely a disclaimer, especially regarding the use of websites.',
      'These terms outline acceptable use, user responsibilities, limitations of liability, and other important legal points. By using the service, you agree to these terms.',
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    content: [
      'We value your privacy and are committed to protecting your personal information. This policy explains what data we collect, how we use it, and your rights regarding your data.',
      'We only collect information necessary to provide and improve our services and we implement appropriate safeguards to protect your data.',
    ],
  },
}

const LegalContent = lazy(() => import('./commonLegalContent/LegalContent'))

export function createLegalPage(pageKey: LegalKey) {
  return function LegalPage() {
    return React.createElement(LegalContent, { ...LEGAL_COPY[pageKey] })
  }
}

export function normalizeStaticPage(page?: string): string {
  return String(page || '')
    .toLowerCase()
    .replace(/^legal-/, '')
}

export function getStaticRenderConfig(page?: string): StaticRenderConfig {
  const key = normalizeStaticPage(page)
  if (key === 'faqs') return { type: 'faqs' }
  if (key === 'terms' || key === 'privacy') return { type: 'legal', legalKey: key as LegalKey }
  return { type: 'not_found' }
}

// Hook-style API to mirror other helpers (e.g., dashboard.helper)
export default function useStaticContentHelper(): UseStaticContentHelperReturn {
  return {
    LEGAL_COPY,
    createLegalPage,
    normalizeStaticPage,
    getStaticRenderConfig,
  }
}


