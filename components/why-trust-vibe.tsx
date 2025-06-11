"use client"

import type React from "react"

import { useTranslation } from "./i18n-provider"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Home, Users, Heart, Sparkles } from "lucide-react"

export function WhyTrustVibe() {
  const { t } = useTranslation()

  return (
    <section className="relative py-20 px-6 md:px-12 overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-teal-50/50 to-amber-50/50 dark:from-gray-900 dark:via-teal-950/50 dark:to-amber-950/50" />

      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-teal-400/10 to-amber-400/10 rounded-full blur-xl" />
      <div className="absolute bottom-10 left-10 w-40 h-40 bg-gradient-to-br from-amber-400/10 to-teal-400/10 rounded-full blur-xl" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <HeaderSection />

        {/* Story Cards */}
        <div className="space-y-12 mb-16">
          <StoryCard
            icon={<Home className="h-6 w-6" />}
            title={t("story.card1.title")}
            content={t("story.card1.content")}
            delay={0.2}
            gradient="from-teal-50 to-teal-100 dark:from-teal-900/30 dark:to-teal-800/30"
          />
          <StoryCard
            icon={<Users className="h-6 w-6" />}
            title={t("story.card2.title")}
            content={t("story.card2.content")}
            delay={0.4}
            gradient="from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/30"
          />
          <StoryCard
            icon={<Heart className="h-6 w-6" />}
            title={t("story.card3.title")}
            content={t("story.card3.content")}
            delay={0.6}
            gradient="from-teal-50 via-amber-50 to-teal-100 dark:from-teal-900/30 dark:via-amber-900/30 dark:to-teal-800/30"
          />
        </div>

        {/* Answer Reveal */}
        <AnswerReveal />
      </div>
    </section>
  )
}

function HeaderSection() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8 }}
      className="text-center mb-16"
    >
      <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-700 via-teal-600 to-amber-600 bg-clip-text text-transparent mb-4">
        {t("story.headline")}
      </h2>
      <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed">{t("story.subheadline")}</p>
    </motion.div>
  )
}

interface StoryCardProps {
  icon: React.ReactNode
  title: string
  content: string
  delay: number
  gradient: string
}

function StoryCard({ icon, title, content, delay, gradient }: StoryCardProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.95 }}
      transition={{ duration: 0.8, delay }}
      className="group"
    >
      <div
        className={`relative bg-gradient-to-br ${gradient} p-8 md:p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] border border-white/50 dark:border-gray-700/50 backdrop-blur-sm`}
      >
        {/* Icon and Title */}
        <div className="flex items-center justify-center mb-6">
          <div className="p-3 bg-white/80 dark:bg-gray-800/80 rounded-full shadow-md mr-4">
            <div className="text-teal-600 dark:text-teal-400">{icon}</div>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">{title}</h3>
        </div>

        {/* Content */}
        <div className="text-center">
          <p className="text-lg md:text-xl font-medium text-gray-800 dark:text-gray-200 leading-relaxed">{content}</p>
        </div>

        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.div>
  )
}

function AnswerReveal() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.95 }}
      transition={{ duration: 1, delay: 0.8 }}
      className="group"
    >
      <div className="relative bg-gradient-to-br from-teal-100 via-amber-50 to-teal-50 dark:from-teal-900/50 dark:via-amber-900/30 dark:to-teal-800/50 p-10 md:p-12 rounded-3xl shadow-2xl border-2 border-teal-200/50 dark:border-teal-700/50 backdrop-blur-sm overflow-hidden">
        {/* Sparkle Icon */}
        <div className="flex justify-center mb-8">
          <div className="p-4 bg-gradient-to-br from-teal-500 to-amber-500 rounded-full shadow-lg">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
        </div>

        {/* Main Answer */}
        <div className="text-center mb-8">
          <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-teal-700 to-amber-600 bg-clip-text text-transparent mb-4">
            {t("story.answer.title")}
          </h3>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 italic leading-relaxed">
            {t("story.answer.subtitle")}
          </p>
        </div>

        {/* Content Points */}
        <div className="space-y-4 mb-6">
          <div className="flex items-start">
            <span className="text-green-500 text-xl mr-3 mt-1">✅</span>
            <p className="text-lg md:text-xl font-medium text-gray-800 dark:text-gray-200 leading-relaxed">
              {t("story.answer.content1")}
            </p>
          </div>
          <div className="flex items-start">
            <span className="text-green-500 text-xl mr-3 mt-1">✅</span>
            <p className="text-lg md:text-xl font-medium text-gray-800 dark:text-gray-200 leading-relaxed">
              {t("story.answer.content2")}
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-teal-400/20 to-amber-400/20 rounded-full blur-xl" />
        <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-amber-400/20 to-teal-400/20 rounded-full blur-xl" />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.div>
  )
}
