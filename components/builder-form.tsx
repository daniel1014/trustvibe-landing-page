"use client"

import { useTranslation } from "./i18n-provider"
import { useAtom } from "jotai"
import { formDataAtom } from "@/lib/atoms"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function BuilderForm() {
  const { t } = useTranslation()
  const [formData, setFormData] = useAtom(formDataAtom)

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleCheckboxChange = (field: string, value: string) => {
    const currentValues = formData[field] || []
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v: string) => v !== value)
      : [...currentValues, value]

    setFormData((prev) => ({ ...prev, [field]: newValues }))
  }

  const services = [
    { id: "building", label: t("forms.building") },
    { id: "tutoring", label: t("forms.tutoring") },
    { id: "cleaning", label: t("forms.cleaning") },
    { id: "childcare", label: t("forms.childcare") },
    { id: "other", label: t("forms.other") },
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
          {services.map((service) => (
            <div key={service.id} className="flex items-center space-x-2">
              <Checkbox
                id={`service-${service.id}`}
                checked={(formData.services || []).includes(service.id)}
                onCheckedChange={() => handleCheckboxChange("services", service.id)}
              />
              <Label htmlFor={`service-${service.id}`}>{service.label}</Label>
            </div>
          ))}
        </div>
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

      <div>
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
      </div>

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
