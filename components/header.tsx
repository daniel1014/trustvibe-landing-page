"use client"

import { useState } from "react"
import { useAtom } from "jotai"
import { localeAtom, type Locale } from "@/lib/atoms"
import { useTranslation } from "./i18n-provider"
import { Heart, Mail, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { ContactPopup } from "@/components/contact-popup"
import { motion } from "framer-motion"

export function Header() {
  const { t, changeLanguage } = useTranslation()
  const [locale, setLocale] = useAtom(localeAtom)
  const [isContactOpen, setIsContactOpen] = useState(false)

  const toggleLanguage = () => {
    const newLocale: Locale = locale === "en-UK" ? "zh-TW" : "en-UK"
    setLocale(newLocale)
    changeLanguage(newLocale === "en-UK" ? "en" : "zh")
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-teal-200/50 dark:border-teal-700/50">
        <div className="flex justify-between items-center px-6 md:px-12 py-4">
          {/* Logo and Title - Top Left */}
          <motion.div
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center mr-3 shadow-lg">
              <Heart className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-teal-700 to-teal-600 bg-clip-text text-transparent">
                Trust Vibe
              </h1>
              <p className="text-xs text-gray-600 dark:text-gray-400 hidden sm:block">Faith • Community • Trust</p>
            </div>
          </motion.div>

          {/* Contact, Language Switcher and Theme Toggle - Top Right */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Contact Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsContactOpen(true)}
              className="hidden sm:flex items-center gap-2 border-teal-200 text-teal-700 hover:bg-teal-50 dark:border-teal-700 dark:text-teal-300 dark:hover:bg-teal-900/30 transition-all duration-200"
            >
              <Mail className="h-4 w-4" />
              <span className="hidden md:inline">{t("common.contact")}</span>
            </Button>

            {/* Language Switcher */}
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center gap-2 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white border-0 shadow-md transition-all duration-200"
            >
              <Globe className="h-4 w-4" />
              <span className="text-sm font-medium">{locale === "en-UK" ? "中文" : "EN"}</span>
            </Button>

            {/* Theme Toggle */}
            <ThemeToggle />
          </motion.div>
        </div>
      </header>

      {/* Contact Popup */}
      <ContactPopup isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  )
}
