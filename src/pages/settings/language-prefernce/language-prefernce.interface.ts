export type LanguageCode = string

export type UseLanguagePreferenceHelperReturn = {
  language: LanguageCode
  setLanguage: React.Dispatch<React.SetStateAction<LanguageCode>>
  handleChange: (value: LanguageCode) => void
}




