"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Mail, Phone, Instagram, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslation } from "./i18n-provider"
import { useState } from "react"

interface ContactPopupProps {
  isOpen: boolean
  onClose: () => void
}

export function ContactPopup({ isOpen, onClose }: ContactPopupProps) {
  const { t } = useTranslation()
  const [copiedItem, setCopiedItem] = useState<string | null>(null)

  const copyToClipboard = async (text: string, item: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedItem(item)
      setTimeout(() => setCopiedItem(null), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const contactInfo = [
    {
      id: "email",
      icon: <Mail className="h-5 w-5" />,
      label: t("contact.email"),
      value: "trustvibedev@gmail.com",
      href: "mailto:trustvibedev@gmail.com",
      gradient: "from-teal-500 to-teal-600",
    },
    {
      id: "phone",
      icon: <Phone className="h-5 w-5" />,
      label: t("contact.phone"),
      value: "+44 7432 336788",
      href: "tel:+447432336788",
      gradient: "from-amber-500 to-amber-600",
    },
    {
      id: "instagram",
      icon: <Instagram className="h-5 w-5" />,
      label: t("contact.instagram"),
      value: "@trustvibe_uk",
      href: "https://instagram.com/trustvibe_uk",
      gradient: "from-pink-500 to-purple-600",
    },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Popup */}
          <motion.div
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-4"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-teal-200/50 dark:border-teal-700/50 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-teal-500 to-amber-500 p-6 text-white">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold">{t("contact.title")}</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="text-white hover:bg-white/20 rounded-full"
                  >
                    <X className="h-5 w-5" />
                    <span className="sr-only">{t("contact.close")}</span>
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {contactInfo.map((contact, index) => (
                  <motion.div
                    key={contact.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                    className="group"
                  >
                    <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 hover:shadow-md transition-all duration-200">
                      <div className="flex items-center space-x-4">
                        <div className={`p-2 bg-gradient-to-r ${contact.gradient} rounded-lg shadow-md`}>
                          <div className="text-white">{contact.icon}</div>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{contact.label}</p>
                          <a
                            href={contact.href}
                            className="text-lg font-semibold text-gray-900 dark:text-gray-100 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                          >
                            {contact.value}
                          </a>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => copyToClipboard(contact.value, contact.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-gray-200 dark:hover:bg-gray-600"
                      >
                        {copiedItem === contact.id ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Footer */}
              <div className="bg-gradient-to-r from-teal-50 to-amber-50 dark:from-teal-900/30 dark:to-amber-900/30 p-4 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">Building trust within our faith community</p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
