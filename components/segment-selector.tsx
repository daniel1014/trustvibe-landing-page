"use client"

import { useAtom } from "jotai"
import { formTypeAtom } from "@/lib/atoms"
import { useTranslation } from "./i18n-provider"
import { motion } from "framer-motion"
import { BoxIcon as Toolbox, Search } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function SegmentSelector() {
  const { t } = useTranslation()
  const [, setFormType] = useAtom(formTypeAtom)

  const segments = [
    {
      type: "provider",
      icon: <Toolbox className="h-16 w-16 text-white mb-6" />,
      title: t("common.provideServices"),
      gradient: "from-teal-500 to-teal-600",
      hoverGradient: "from-teal-600 to-teal-700",
      bgGradient: "from-teal-50 to-teal-100 dark:from-teal-900/30 dark:to-teal-800/30",
    },
    {
      type: "user",
      icon: <Search className="h-16 w-16 text-white mb-6" />,
      title: t("common.needServices"),
      gradient: "from-amber-500 to-amber-600",
      hoverGradient: "from-amber-600 to-amber-700",
      bgGradient: "from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/30",
    },
  ]

  return (
    <section className="relative py-20 px-6 md:px-12 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-teal-50/30 to-amber-50/30 dark:from-gray-900 dark:via-teal-950/30 dark:to-amber-950/30" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-teal-700 to-amber-600 bg-clip-text text-transparent mb-4">
            {t("segments.getStartedToday")}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {t("segments.choosePath")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {segments.map((segment, index) => (
            <motion.div
              key={segment.type}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card
                className="relative h-full cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border-2 border-transparent hover:border-white/50 overflow-hidden"
                onClick={() => setFormType(segment.type as "provider" | "user")}
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${segment.bgGradient} opacity-50`} />

                <CardContent className="relative z-10 flex flex-col items-center justify-center p-12 h-full min-h-[300px]">
                  {/* Icon with gradient background */}
                  <div
                    className={`p-6 bg-gradient-to-br ${segment.gradient} group-hover:bg-gradient-to-br group-hover:${segment.hoverGradient} rounded-2xl shadow-lg transition-all duration-300 mb-6`}
                  >
                    {segment.icon}
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-4">
                    {segment.title}
                  </h3>

                  <div className="w-16 h-1 bg-gradient-to-r from-teal-500 to-amber-500 rounded-full" />
                </CardContent>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
