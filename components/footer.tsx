"use client"

import { useTranslation } from "./i18n-provider"
import { Heart } from "lucide-react"

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="relative bg-gradient-to-br from-gray-100 via-teal-50/50 to-amber-50/50 dark:from-gray-900 dark:via-teal-950/50 dark:to-amber-950/50 py-12 px-6 md:px-12 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-teal-400/10 to-amber-400/10 rounded-full blur-xl" />
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-br from-amber-400/10 to-teal-400/10 rounded-full blur-xl" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center mr-3 shadow-lg">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-teal-700 to-teal-600 bg-clip-text text-transparent">
                Trust Vibe
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 max-w-md">{t("common.copyright")}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 italic font-medium bg-gradient-to-r from-teal-600 to-amber-600 bg-clip-text text-transparent">
              {t("common.scripture")}
            </p>
          </div>

          <div className="text-center md:text-right">
            <p className="text-sm text-gray-500 dark:text-gray-400">Building trust within our faith community</p>
          </div>
        </div>

        {/* Bottom border with gradient */}
        <div className="mt-8 pt-6 border-t border-gradient-to-r from-teal-200 via-amber-200 to-teal-200 dark:from-teal-700 dark:via-amber-700 dark:to-teal-700">
          <div className="w-full h-1 bg-gradient-to-r from-teal-500 via-amber-500 to-teal-500 rounded-full opacity-50" />
        </div>
      </div>
    </footer>
  )
}
