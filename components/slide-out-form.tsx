"use client"

import type React from "react"

import { useState } from "react"
import { useTranslation } from "./i18n-provider"
import { useAtom } from "jotai"
import { formTypeAtom, formDataAtom, submittedAtom } from "@/lib/atoms"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BuilderForm } from "./builder-form"
import { UserForm } from "./user-form"
import { collection, addDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"

export function SlideOutForm() {
  const { t, currentLanguage } = useTranslation()
  const [formType, setFormType] = useAtom(formTypeAtom)
  const [formData, setFormData] = useAtom(formDataAtom)
  const [submitted, setSubmitted] = useAtom(submittedAtom)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleClose = () => {
    setFormType(null)
    setFormData({})
    setSubmitted(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await addDoc(collection(db, "waitingList"), {
        formType,
        responses: formData,
        email: formData.email,
        locale: currentLanguage,
        submittedAt: new Date(),
      })

      setSubmitted(true)
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!formType) return null

  return (
    <AnimatePresence>
      <motion.div
        key="slide-out-backdrop"
        className="fixed inset-0 bg-black/50 z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
      />

      <motion.div
        key="slide-out-panel"
        className="fixed top-0 right-0 bottom-0 w-full sm:w-[500px] lg:w-[600px] bg-white dark:bg-gray-900 shadow-2xl z-50 overflow-y-auto border-l border-teal-200/50 dark:border-teal-700/50"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 180 }}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              {formType === "provider" ? t("common.provideServices") : t("common.needServices")}
            </h2>
            <Button variant="ghost" size="icon" onClick={handleClose}>
              <X className="h-6 w-6" />
              <span className="sr-only">{t("common.back")}</span>
            </Button>
          </div>

          {submitted ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-12">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">{t("common.thankYou")}</h3>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit}>
              {formType === "provider" ? <BuilderForm /> : <UserForm />}

              <div className="mt-8 flex justify-between">
                <Button type="button" variant="outline" onClick={handleClose}>
                  {t("common.back")}
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white shadow-lg"
                >
                  {isSubmitting ? "..." : t("common.submit")}
                </Button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
