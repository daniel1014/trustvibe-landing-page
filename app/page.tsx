"use client"

import { I18nProvider } from "@/components/i18n-provider"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { WhyTrustVibe } from "@/components/why-trust-vibe"
import { SegmentSelector } from "@/components/segment-selector"
import { SlideOutForm } from "@/components/slide-out-form"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <I18nProvider>
      <div className="min-h-screen relative">
        <Header />

        <main>
          <HeroSection />
          <WhyTrustVibe />
          <SegmentSelector />
          <SlideOutForm />
          <Footer />
        </main>
      </div>
    </I18nProvider>
  )
}
