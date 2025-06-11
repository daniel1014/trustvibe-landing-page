import i18n from "i18next"
import { initReactI18next } from "react-i18next"

// Default language for i18next.
const defaultLng = 'zh'; // Setting 'zh' as the application default directly

const resources = {
  en: {
    translation: {
      common: {
        title: "Trust Vibe\nA Faith-connected community hub for UK Chinese Christians",
        subtitle: "Find trusted builders, tutors & helpers within our faith community.",
        provideServices: "I Provide Services",
        needServices: "I Need Services",
        whyTrustVibe: "Why Trust Vibe?",
        mission: "Connecting faith & daily living in one trusted platform.",
        scripture: "We love because He first loved us. (1 John 4:19)",
        copyright: "© 2025 Trust Vibe. All rights reserved.",
        contact: "Contact",
        thankYou: "Thank you! We'll be in touch soon at your email.",
        submit: "Submit",
        back: "Back",
      },
      painPoints: {
        unsure: "Unsure which builder you can trust?",
        lack: "Lack church-recommended services?",
        need: "Need a reliable helper ASAP?",
        trust: "Building Trust",
        community: "Faith Community",
        reliability: "Reliable Help",
        trustDesc: "Find service providers vetted by your own church community.",
        communityDesc: "Connect with Christians who share your values and faith.",
        reliabilityDesc: "Get help when you need it from people you can trust.",
      },
      story: {
        headline: "Why Trust Vibe?",
        subheadline: "Understanding Our Journey",
        card1: {
          title: "We once experienced...",
          content: "Wanting to renovate our homes but not knowing which builders we could truly trust",
        },
        card2: {
          title: "We once experienced...",
          content: "Having skills and talents but not knowing how to practically serve our church community",
        },
        card3: {
          title: "We once experienced...",
          content: "Attending church regularly in the UK, but feeling our faith life was disconnected from daily living",
        },
        answer: {
          title: "So, we built Trust Vibe.",
          subtitle: "A platform born out of shared struggles, grounded in faith, and built for trust.",
          content1: "We want people with a heart to serve to offer their gifts meaningfully,",
          content2: "and those seeking help to find peace of mind in a trusted, faith-filled community.",
        }
      },
      contact: {
        title: "Get in Touch",
        email: "Email",
        phone: "Phone",
        instagram: "Instagram",
        close: "Close",
      },
      forms: {
        servicesOffered: "Services Offered",
        churchAffiliation: "Church Affiliation",
        churchName: "Church Name",
        keyFeatures: "Key Features Desired on Platform",
        email: "Email",
        serviceNeeded: "Service Needed",
        mostImportantFactor: "Most Important Factor",
        additionalExpectations: "Additional Expectations",
        yes: "Yes",
        no: "No",
        building: "Building & Renovation",
        tutoring: "Tutoring",
        cleaning: "Cleaning",
        childcare: "Childcare",
        other: "Other",
        reviews: "Reviews & Ratings",
        verification: "Church Verification",
        messaging: "In-app Messaging",
        payments: "Secure Payments",
        price: "Price",
        quality: "Quality",
        speed: "Speed",
        churchConnection: "Church Connection",
      },
      segments: {
        getStartedToday: "Get Started Today",
        choosePath: "Choose your path and join our trusted community",
      },
    }
  },
  zh: {
    translation: {
      common: {
        title: "Trust Vibe\n英國華人基督徒的信任平台",
        subtitle: "在我們的信仰社區中尋找值得信賴的建築商、導師和助手。",
        provideServices: "提供服務",
        needServices: "需要服務",
        whyTrustVibe: "為什麼選擇 Trust Vibe？",
        mission: "在一個值得信賴的平台上連接信仰和日常生活。",
        scripture: "我們愛，因為神先愛我們。(約翰一書 4:19)",
        copyright: "© 2025 Trust Vibe. 版權所有。",
        contact: "聯繫我們",
        thankYou: "謝謝！我們很快會通過您的電子郵件與您聯繫。",
        submit: "提交",
        back: "返回",
      },
      painPoints: {
        unsure: "不確定哪個建築商可以信任？",
        lack: "缺乏教會推薦的服務？",
        need: "需要可靠的幫手嗎？",
        trust: "建立信任",
        community: "信仰社區",
        reliability: "可靠幫助",
        trustDesc: "尋找由您自己的教會社區審核的服務提供者。",
        communityDesc: "與分享您的價值觀和信仰的基督徒聯繫。",
        reliabilityDesc: "在需要時從您可以信任的人那裡獲得幫助。",
      },
      story: {
        headline: "為何設立「Trust Vibe」這個平台？",
        subheadline: "我們的故事",
        card1: {
          title: "我們曾經…",
          content: "想找人維修家居，卻苦於不認識可信賴的人幫忙",
        },
        card2: {
          title: "我們曾經…",
          content: "身懷才華，卻缺乏服侍教會群體的機會",
        },
        card3: {
          title: "我們曾經…",
          content: "雖身處英國教會，卻感到信仰生活與日常生活的分離",
        },
        answer: {
          title: "因此，我們創立了 Trust Vibe。",
          subtitle: "一個源於共同掙扎、植根於信仰、建立於信任的平台。",
          content1: "我們希望讓有心志服侍的肢體，能憑藉其恩賜才幹，為主內社群貢獻所長；",
          content2: "也讓尋求幫助的肢體，能在主內社群中，更安心地找到所需支援。",
        }
      },
      contact: {
        title: "聯繫我們",
        email: "電子郵件",
        phone: "電話",
        instagram: "Instagram",
        close: "關閉",
      },
      forms: {
        servicesOffered: "提供的服務",
        churchAffiliation: "你平常有去教會嗎",
        churchName: "教會名稱",
        keyFeatures: "平台上期望的主要功能",
        email: "電子郵件",
        serviceNeeded: "需要的服務",
        mostImportantFactor: "最重要的因素",
        additionalExpectations: "其他期望",
        yes: "是",
        no: "否",
        building: "建築與裝修",
        tutoring: "輔導",
        cleaning: "清潔",
        childcare: "托兒",
        other: "其他",
        reviews: "評論與評分",
        verification: "教會驗證",
        messaging: "應用內消息",
        payments: "安全支付",
        price: "價格",
        quality: "質量",
        speed: "速度",
        churchConnection: "教會聯繫",
      },
      segments: {
        getStartedToday: "今天就開始",
        choosePath: "選擇你有興趣的角色，加入我們信任的社區",
      },
    }
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: defaultLng,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false // React already safes from xss
    },
    debug: process.env.NODE_ENV === 'development',
  })

export default i18n
