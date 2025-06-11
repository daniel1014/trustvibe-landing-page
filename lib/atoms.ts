import { atom } from "jotai"

export type FormType = "provider" | "user" | null
// Locale type and localeAtom are no longer needed for active language management.
// export type Locale = "en-UK" | "zh-TW"

export const formTypeAtom = atom<FormType>(null)
export const formDataAtom = atom<Record<string, any>>({})
export const submittedAtom = atom(false)
// export const localeAtom = atom<Locale>("zh-TW") // Removed

// This atom can still be useful to know when the I18nProvider has mounted and i18next is ready.
export const i18nInitializedAtom = atom(false)
