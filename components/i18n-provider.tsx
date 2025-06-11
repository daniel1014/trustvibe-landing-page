"use client"

import type React from "react"
import { I18nextProvider, useTranslation as useReactI18nextTranslation } from "react-i18next"
import i18nInstance from "@/i18n"
import { useAtom } from "jotai"
import { i18nInitializedAtom } from "@/lib/atoms" // localeAtom is removed
import { useEffect } from "react"


// You might still want a context if you need to pass down more than just t and i18n
// For now, react-i18next's useTranslation will be the primary way to get t and i18n
// interface I18nContextType {
//   t: (key: string) => string
//   locale: string // This would be i18n.language
//   changeLanguage: (locale: string) => void // This would be i18n.changeLanguage
// }
// const I18nContext = createContext<I18nContextType | null>(null)


export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [, setInitialized] = useAtom(i18nInitializedAtom)

  useEffect(() => {
    // Simply mark i18n as initialized once the provider mounts.
    // i18next instance is already configured with a default language in i18n.ts.
    setInitialized(true)
  }, [setInitialized])

  return <I18nextProvider i18n={i18nInstance}>{children}</I18nextProvider>
}

// Re-export or modify your useTranslation hook
export function useTranslation() {
  const { t, i18n: i18nNextInstance } = useReactI18nextTranslation();

  // changeLanguage now directly calls i18next's changeLanguage.
  // It expects "en" or "zh".
  const changeLanguage = (newLangCode: 'en' | 'zh') => {
    i18nNextInstance.changeLanguage(newLangCode);
  };

  return {
    t, // The translation function
    i18n: i18nNextInstance, // The i18next instance
    // 'locale' in "en-UK" format is removed as localeAtom is removed.
    // Components should rely on i18n.language ("en" or "zh").
    currentLanguage: i18nNextInstance.language, // "en" | "zh"
    changeLanguage, // Function to change language (accepts "en" | "zh")
  };
}
