"use client"

import { useTranslation } from "./i18n-provider"
import { useAtom } from "jotai"
import { formDataAtom } from "@/lib/atoms"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"

// Define types for our service data structure
type ServiceExpertise = "beginner" | "amateur" | "professional"
type ServiceItem = {
  id: string
  expertise: ServiceExpertise
}

// Central configuration for expertise levels
const expertiseLevelKeys: ServiceExpertise[] = ["beginner", "amateur", "professional"];

const DEFAULT_EXPERTISE_LEVEL: ServiceExpertise = "beginner";

// Helper to get configuration for an expertise level, including translated label
const getExpertiseConfig = (level: ServiceExpertise, t: (key: string) => string) => {
  switch (level) {
    case "beginner":
      return {
        sliderValue: 16, // Snap point on 0-100 scale
        label: t("forms.beginner"),
        colorClass: "bg-sky-500 dark:bg-sky-700",
      }
    case "amateur":
      return {
        sliderValue: 50,
        label: t("forms.amateur"),
        colorClass: "bg-amber-500 dark:bg-amber-700",
      }
    case "professional":
      return {
        sliderValue: 83,
        label: t("forms.professional"),
        colorClass: "bg-emerald-500 dark:bg-emerald-700",
      }
    default: // Should not happen with typed ServiceExpertise
      return {
        sliderValue: 16,
        label: t("forms.beginner"),
        colorClass: "bg-sky-500 dark:bg-sky-700",
      }
  }
}

export function BuilderForm() {
  const { t } = useTranslation()
  const [formData, setFormData] = useAtom(formDataAtom)

  const servicesData: ServiceItem[] = formData.services || []

  const handleServiceChange = (serviceId: string, checked: boolean) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        services: [...(prev.services || []), { id: serviceId, expertise: DEFAULT_EXPERTISE_LEVEL }]
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        services: (prev.services || []).filter((s: ServiceItem) => s.id !== serviceId)
      }))
    }
  }

  const handleExpertiseChange = (serviceId: string, currentSliderValue: number) => {
    let newExpertise: ServiceExpertise = DEFAULT_EXPERTISE_LEVEL;
    // Determine expertise category based on slider's raw value
    if (currentSliderValue <= 33) { // 0-33
      newExpertise = "beginner";
    } else if (currentSliderValue <= 66) { // 34-66
      newExpertise = "amateur";
    } else { // 67-100
      newExpertise = "professional";
    }

    setFormData((prev) => ({
      ...prev,
      services: (prev.services || []).map((s: ServiceItem) =>
        s.id === serviceId ? { ...s, expertise: newExpertise } : s
      )
    }))
  }

  const getSliderPositionForExpertise = (serviceId: string): number => {
    const service = servicesData.find((s) => s.id === serviceId)
    const expertise = service?.expertise || DEFAULT_EXPERTISE_LEVEL
    return getExpertiseConfig(expertise, t).sliderValue
  }

  const getCurrentExpertiseLabel = (serviceId: string): string => {
    const service = servicesData.find((s) => s.id === serviceId)
    const expertise = service?.expertise || DEFAULT_EXPERTISE_LEVEL
    return getExpertiseConfig(expertise, t).label
  }

  const getCurrentExpertiseColorClass = (serviceId: string): string => {
    const service = servicesData.find((s) => s.id === serviceId)
    const expertise = service?.expertise || DEFAULT_EXPERTISE_LEVEL
    return getExpertiseConfig(expertise, t).colorClass
  }
  
  const serviceOptions = [
    { id: "handyman", label: t("forms.handyman") },
    { id: "electrical", label: t("forms.electrical") },
    { id: "tutoring", label: t("forms.tutoring") },
    { id: "cleaning", label: t("forms.cleaning") },
    { id: "childcare", label: t("forms.childcare") },
    { id: "other", label: t("forms.other") },
  ]

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleCheckboxChange = (field: string, value: string) => {
    const currentValues: string[] = formData[field] || []
    let newValues: string[]

    if (currentValues.includes(value)) {
      newValues = currentValues.filter((v: string) => v !== value)
      if (field === "ukStatus" && value === "other") {
        setFormData((prev) => ({ ...prev, [field]: newValues, ukStatusOtherDetail: "" }))
        return
      }
    } else {
      newValues = [...currentValues, value]
    }
    setFormData((prev) => ({ ...prev, [field]: newValues }))
  }

  const ukStatusOptions = [
    { id: "workingProfessional", label: t("forms.statusWorkingProfessional") },
    { id: "student", label: t("forms.statusStudent") },
    { id: "newImmigrant", label: t("forms.statusNewImmigrant") },
    { id: "jobSeeker", label: t("forms.statusJobSeeker") },
    { id: "retired", label: t("forms.statusRetired") },
    { id: "churchLeader", label: t("forms.statusChurchLeader") },
    { id: "other", label: t("forms.statusOther") },
  ]

  const features = [
    { id: "reviews", label: t("forms.reviews") },
    { id: "verification", label: t("forms.verification") },
    { id: "messaging", label: t("forms.messaging") },
    { id: "payments", label: t("forms.payments") },
  ]

  return (
    <div className="space-y-6">
      <div>
        <Label className="text-base font-medium mb-2 block">
          {t("forms.servicesOffered")} <span className="text-red-500">*</span>
        </Label>
        <div className="grid grid-cols-2 gap-3">
          {serviceOptions.map((serviceOpt) => (
            <div key={serviceOpt.id} className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`service-${serviceOpt.id}`}
                  checked={servicesData.some((s) => s.id === serviceOpt.id)}
                  onCheckedChange={(checked) => handleServiceChange(serviceOpt.id, checked as boolean)}
                />
                <Label htmlFor={`service-${serviceOpt.id}`}>{serviceOpt.label}</Label>
              </div>
              
              {servicesData.some((s) => s.id === serviceOpt.id) && (
                <div className="pl-6 space-y-2 mt-1">
                  <Label className="text-xs text-gray-500 dark:text-gray-400">
                    {t("forms.expertiseLevel")}
                  </Label>
                  <div className="flex items-center space-x-3">
                    <Slider
                      value={[getSliderPositionForExpertise(serviceOpt.id)]}
                      min={0}
                      max={100}
                      step={1}
                      onValueChange={(value) => handleExpertiseChange(serviceOpt.id, value[0])}
                      className="w-[180px]"
                      rangeColorClass={getCurrentExpertiseColorClass(serviceOpt.id)}
                    />
                    <span className="text-xs font-medium w-16 text-center">
                      {getCurrentExpertiseLabel(serviceOpt.id)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        {servicesData.some((s) => s.id === "other") && (
          <div className="mt-3">
            <Input
              id="servicesOtherDetail"
              placeholder={t("forms.serviceOtherPlaceholder")}
              value={formData.servicesOtherDetail || ""}
              onChange={(e) => setFormData((prev) => ({ ...prev, servicesOtherDetail: e.target.value }))}
              className="text-sm"
            />
          </div>
        )}
      </div>

      <div>
        <Label className="text-base font-medium mb-2 block">
          {t("forms.ukStatusQuestion")} <span className="text-red-500">*</span>
        </Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {ukStatusOptions.map((status) => (
            <div key={status.id} className="flex items-center space-x-2">
              <Checkbox
                id={`ukStatus-${status.id}`}
                checked={(formData.ukStatus || []).includes(status.id)}
                onCheckedChange={() => handleCheckboxChange("ukStatus", status.id)}
              />
              <Label htmlFor={`ukStatus-${status.id}`}>{status.label}</Label>
            </div>
          ))}
        </div>
        {(formData.ukStatus || []).includes("other") && (
          <div className="mt-3">
            <Input
              id="ukStatusOtherDetail"
              placeholder={t("forms.statusOtherPlaceholder")}
              value={formData.ukStatusOtherDetail || ""}
              onChange={(e) => handleChange("ukStatusOtherDetail", e.target.value)}
              className="text-sm"
            />
          </div>
        )}
      </div>

      <div>
        <Label className="text-base font-medium mb-2 block">
          {t("forms.churchAffiliation")} <span className="text-red-500">*</span>
        </Label>
        <RadioGroup
          value={formData.churchAffiliation || ""}
          onValueChange={(value) => handleChange("churchAffiliation", value)}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="church-yes" />
            <Label htmlFor="church-yes">{t("forms.yes")}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="church-no" />
            <Label htmlFor="church-no">{t("forms.no")}</Label>
          </div>
        </RadioGroup>
      </div>

      {formData.churchAffiliation === "yes" && (
        <div>
          <Label htmlFor="churchName" className="text-base font-medium mb-2 block">
            {t("forms.churchName")} <span className="text-red-500">*</span>
          </Label>
          <Input
            id="churchName"
            value={formData.churchName || ""}
            onChange={(e) => handleChange("churchName", e.target.value)}
          />
        </div>
      )}
      
      {/* <div>
        <Label className="text-base font-medium mb-2 block">{t("forms.keyFeatures")}</Label>
        <div className="grid grid-cols-2 gap-3">
          {features.map((feature) => (
            <div key={feature.id} className="flex items-center space-x-2">
              <Checkbox
                id={`feature-${feature.id}`}
                checked={(formData.features || []).includes(feature.id)}
                onCheckedChange={() => handleCheckboxChange("features", feature.id)}
              />
              <Label htmlFor={`feature-${feature.id}`}>{feature.label}</Label>
            </div>
          ))}
        </div>
      </div> */}

      <div>
        <Label htmlFor="email" className="text-base font-medium mb-2 block">
          {t("forms.email")} <span className="text-red-500">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          required
          value={formData.email || ""}
          onChange={(e) => handleChange("email", e.target.value)}
        />
      </div>
    </div>
  )
}
