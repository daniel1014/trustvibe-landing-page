import { atom } from "jotai"

export type FormType = "provider" | "user" | null
export type Locale = "en-UK" | "zh-TW"

export const formTypeAtom = atom<FormType>(null)
export const formDataAtom = atom<Record<string, any>>({})
export const submittedAtom = atom(false)
export const localeAtom = atom<Locale>("en-UK")
export const i18nInitializedAtom = atom(false)
