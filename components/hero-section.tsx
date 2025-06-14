"use client"

import { useAtom } from "jotai"
import { formTypeAtom } from "@/lib/atoms"
import { useTranslation } from "./i18n-provider"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function HeroSection() {
  const { t } = useTranslation()
  const [, setFormType] = useAtom(formTypeAtom)

  return (
    <section className="relative min-h-screen flex flex-col lg:flex-row items-center lg:justify-center px-6 md:px-12 py-20 pt-32 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-white to-amber-50 dark:from-teal-950 dark:via-gray-900 dark:to-amber-950" />

      {/* Decorative Elements */}
      <div className="absolute top-32 left-10 w-32 h-32 bg-gradient-to-br from-teal-400/20 to-teal-600/20 rounded-full blur-xl" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-amber-400/20 to-amber-600/20 rounded-full blur-xl" />

      {/* Left Section - Text Content */}
      <div className="relative z-10 max-w-2xl lg:max-w-xl xl:max-w-2xl">
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-teal-700 via-teal-600 to-teal-800 bg-clip-text text-transparent mb-6 leading-tight whitespace-pre-line"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {t("common.title")}
        </motion.h1>
        <motion.p
          className="text-lg sm:text-xl md:text-2xl lg:text-xl xl:text-2xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {t("common.subtitle")}
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 px-8 py-4 text-lg font-semibold"
            onClick={() => setFormType("provider")}
          >
            {t("common.provideServices")}
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-teal-600 text-teal-700 hover:bg-gradient-to-r hover:from-teal-50 hover:to-teal-100 dark:hover:from-teal-900 dark:hover:to-teal-800 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 px-8 py-4 text-lg font-semibold"
            onClick={() => setFormType("user")}
          >
            {t("common.needServices")}
          </Button>
        </motion.div>
      </div>

      {/* Right Section - Image with Pain Points */}
      <div className="relative mt-12 lg:mt-0 lg:ml-8 xl:ml-12 flex-shrink-0">
        <motion.div
          className="relative w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] lg:w-[450px] lg:h-[450px] xl:w-[500px] xl:h-[500px]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {/* Hero Image */}
          <img
            src="/images/hero.png"
            alt="Trust Vibe - Connecting UK Chinese Christians with trusted service providers"
            className="relative z-10 w-full h-full object-cover rounded-2xl overflow-hidden"
          />

          {/* Subtle background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-teal-400/20 via-amber-400/10 to-teal-600/20 rounded-2xl blur-xl -z-10" />
        </motion.div>

        <PainPointOverlay />
      </div>
    </section>
  )
}

function PainPointOverlay() {
  const { t } = useTranslation()

  const painPoints = [
    {
      text: t("painPoints.unsure"),
      position: "top-4 -left-4 sm:-left-8 lg:-left-12",
      delay: 0.8,
      mobilePosition: "top-2 left-2",
    },
    {
      text: t("painPoints.lack"),
      position: "top-1/2 -right-4 sm:-right-8 lg:-right-16",
      delay: 1.0,
      mobilePosition: "top-1/3 right-2",
    },
    {
      text: t("painPoints.need"),
      position: "bottom-4 -left-4 sm:-left-8 lg:-left-12",
      delay: 1.2,
      mobilePosition: "bottom-2 left-2",
    },
  ]

  return (
    <>
      {painPoints.map((point, index) => (
        <motion.div
          key={index}
          className={`absolute ${point.position} sm:${point.position} lg:${point.position} bg-gradient-to-br from-white via-teal-50 to-amber-50 dark:from-gray-800 dark:via-teal-900 dark:to-amber-900 p-3 sm:p-4 rounded-xl shadow-xl max-w-[160px] sm:max-w-[200px] lg:max-w-[220px] z-20 border border-teal-200 dark:border-teal-700`}
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 0.95, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: point.delay }}
        >
          <p className="text-xs sm:text-sm font-medium text-gray-800 dark:text-gray-200 leading-tight">{point.text}</p>
          <div className="absolute -bottom-2 left-4 w-4 h-4 bg-gradient-to-br from-white to-teal-50 dark:from-gray-800 dark:to-teal-900 transform rotate-45 border-r border-b border-teal-200 dark:border-teal-700" />
        </motion.div>
      ))}
    </>
  )
}
