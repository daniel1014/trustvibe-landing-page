"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useAtom } from "jotai"
import { localeAtom, i18nInitializedAtom } from "@/lib/atoms"

interface I18nContextType {
  t: (key: string) => string
  locale: string
  changeLanguage: (locale: string) => void
}

const I18nContext = createContext<I18nContextType | null>(null)

const translations = {
  en: {
    "common.title": "Trust Vibe: A Trust-First Hub for UK Chinese Christians",
    "common.subtitle": "Find trusted builders, tutors & helpers within our faith community.",
    "common.provideServices": "I Provide Services",
    "common.needServices": "I Need Services",
    "common.whyTrustVibe": "Why Trust Vibe?",
    "common.mission": "Connecting faith & daily living in one trusted platform.",
    "common.scripture": "We love because He first loved us. (1 John 4:19)",
    "common.copyright": "© 2025 Trust Vibe. All rights reserved.",
    "common.contact": "Contact",
    "common.thankYou": "Thank you! We'll be in touch soon at your email.",
    "common.submit": "Submit",
    "common.back": "Back",
    "painPoints.unsure": "Unsure which builder you can trust?",
    "painPoints.lack": "Lack church-recommended services?",
    "painPoints.need": "Need a reliable helper ASAP?",
    "painPoints.trust": "Building Trust",
    "painPoints.community": "Faith Community",
    "painPoints.reliability": "Reliable Help",
    "painPoints.trustDesc": "Find service providers vetted by your own church community.",
    "painPoints.communityDesc": "Connect with Christians who share your values and faith.",
    "painPoints.reliabilityDesc": "Get help when you need it from people you can trust.",
    // English storytelling content
    "story.headline": "Why Trust Vibe?",
    "story.subheadline": "Understanding Our Journey",
    "story.card1.title": "We once experienced...",
    "story.card1.content": "Wanting to renovate our homes but not knowing which builders we could truly trust",
    "story.card2.title": "We once experienced...",
    "story.card2.content": "Having skills and talents but not knowing how to practically serve our church community",
    "story.card3.title": "We once experienced...",
    "story.card3.content":
      "Attending church regularly in the UK, but feeling our faith life was disconnected from daily living",
    "story.answer.title": "So, we built Trust Vibe.",
    "story.answer.subtitle": "A platform born out of shared struggles, grounded in faith, and built for trust.",
    "story.answer.content1": "We want people with a heart to serve to offer their gifts meaningfully,",
    "story.answer.content2": "and those seeking help to find peace of mind in a trusted, faith-filled community.",
    // Contact information
    "contact.title": "Get in Touch",
    "contact.email": "Email",
    "contact.phone": "Phone",
    "contact.instagram": "Instagram",
    "contact.close": "Close",
    "forms.servicesOffered": "Services Offered",
    "forms.churchAffiliation": "Church Affiliation",
    "forms.churchName": "Church Name",
    "forms.keyFeatures": "Key Features Desired on Platform",
    "forms.email": "Email",
    "forms.serviceNeeded": "Service Needed",
    "forms.mostImportantFactor": "Most Important Factor",
    "forms.additionalExpectations": "Additional Expectations",
    "forms.yes": "Yes",
    "forms.no": "No",
    "forms.building": "Building & Renovation",
    "forms.tutoring": "Tutoring",
    "forms.cleaning": "Cleaning",
    "forms.childcare": "Childcare",
    "forms.other": "Other",
    "forms.reviews": "Reviews & Ratings",
    "forms.verification": "Church Verification",
    "forms.messaging": "In-app Messaging",
    "forms.payments": "Secure Payments",
    "forms.price": "Price",
    "forms.quality": "Quality",
    "forms.speed": "Speed",
    "forms.churchConnection": "Church Connection",
  },
  zh: {
    "common.title": "Trust Vibe: 英國華人基督徒的信任平台",
    "common.subtitle": "在我們的信仰社區中尋找值得信賴的建築商、導師和助手。",
    "common.provideServices": "我提供服務",
    "common.needServices": "我需要服務",
    "common.whyTrustVibe": "為什麼選擇 Trust Vibe？",
    "common.mission": "在一個值得信賴的平台上連接信仰和日常生活。",
    "common.scripture": "我們愛，因為神先愛我們。(約翰一書 4:19)",
    "common.copyright": "© 2025 Trust Vibe. 版權所有。",
    "common.contact": "聯繫我們",
    "common.thankYou": "謝謝！我們很快會通過您的電子郵件與您聯繫。",
    "common.submit": "提交",
    "common.back": "返回",
    "painPoints.unsure": "不確定哪個建築商可以信任？",
    "painPoints.lack": "缺乏教會推薦的服務？",
    "painPoints.need": "需要可靠的幫手嗎？",
    "painPoints.trust": "建立信任",
    "painPoints.community": "信仰社區",
    "painPoints.reliability": "可靠幫助",
    "painPoints.trustDesc": "尋找由您自己的教會社區審核的服務提供者。",
    "painPoints.communityDesc": "與分享您的價值觀和信仰的基督徒聯繫。",
    "painPoints.reliabilityDesc": "在需要時從您可以信任的人那裡獲得幫助。",
    // Chinese storytelling content
    "story.headline": "為何有「Trust Vibe」這個平台？",
    "story.subheadline": "共鳴區",
    "story.card1.title": "我地曾經…",
    "story.card1.content": "想整屋但唔知邊個 builder 信得過",
    "story.card2.title": "我地曾經…",
    "story.card2.content": "有才華但唔知點樣幫到教會群體",
    "story.card3.title": "我地曾經…",
    "story.card3.content": "喺英國教會聚會，但信仰生活同日常生活係分開嘅",
    "story.answer.title": "所以，我哋建立 Trust Vibe。",
    "story.answer.subtitle": "一個源於共同掙扎、植根於信仰、建立於信任的平台。",
    "story.answer.content1": "我哋想讓有心服侍嘅人可以用才幹服侍群體，",
    "story.answer.content2": "讓搵緊幫手嘅人喺主內更放心咁尋找幫助。",
    // Contact information
    "contact.title": "聯繫我們",
    "contact.email": "電子郵件",
    "contact.phone": "電話",
    "contact.instagram": "Instagram",
    "contact.close": "關閉",
    "forms.servicesOffered": "提供的服務",
    "forms.churchAffiliation": "教會隸屬關係",
    "forms.churchName": "教會名稱",
    "forms.keyFeatures": "平台上期望的主要功能",
    "forms.email": "電子郵件",
    "forms.serviceNeeded": "需要的服務",
    "forms.mostImportantFactor": "最重要的因素",
    "forms.additionalExpectations": "其他期望",
    "forms.yes": "是",
    "forms.no": "否",
    "forms.building": "建築與裝修",
    "forms.tutoring": "輔導",
    "forms.cleaning": "清潔",
    "forms.childcare": "托兒",
    "forms.other": "其他",
    "forms.reviews": "評論與評分",
    "forms.verification": "教會驗證",
    "forms.messaging": "應用內消息",
    "forms.payments": "安全支付",
    "forms.price": "價格",
    "forms.quality": "質量",
    "forms.speed": "速度",
    "forms.churchConnection": "教會聯繫",
  },
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useAtom(localeAtom)
  const [, setInitialized] = useAtom(i18nInitializedAtom)
  const [currentLocale, setCurrentLocale] = useState(locale)

  useEffect(() => {
    setCurrentLocale(locale)
    setInitialized(true)
  }, [locale, setInitialized])

  const t = (key: string): string => {
    const langCode = currentLocale === "en-UK" ? "en" : "zh"
    return translations[langCode]?.[key] || key
  }

  const changeLanguage = (newLocale: string) => {
    const locale = newLocale === "en" ? "en-UK" : "zh-TW"
    setLocale(locale)
  }

  const contextValue: I18nContextType = {
    t,
    locale: currentLocale,
    changeLanguage,
  }

  return <I18nContext.Provider value={contextValue}>{children}</I18nContext.Provider>
}

export function useTranslation() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error("useTranslation must be used within I18nProvider")
  }
  return context
}
