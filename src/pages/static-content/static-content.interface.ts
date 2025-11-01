import type React from 'react'
export type LegalKey = 'terms' | 'privacy'

export type LegalCopyEntry = {
  title: string
  content: string[]
}

export type LegalCopy = Record<LegalKey, LegalCopyEntry>

export type StaticRenderConfig =
  | { type: 'faqs' }
  | { type: 'legal'; legalKey: LegalKey }
  | { type: 'not_found' }

export type UseStaticContentHelperReturn = {
  LEGAL_COPY: LegalCopy
  createLegalPage: (pageKey: LegalKey) => () => React.ReactElement
  normalizeStaticPage: (page?: string) => string
  getStaticRenderConfig: (page?: string) => StaticRenderConfig
}


