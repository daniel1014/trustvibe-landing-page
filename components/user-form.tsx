"use client"

import { useTranslation } from "./i18n-provider"
import { useAtom } from "jotai"
import { formDataAtom } from "@/lib/atoms"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"

export function UserForm() {
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

  const factors = [
    { id: "price", label: t("forms.price") },
    { id: "quality", label: t("forms.quality") },
    { id: "speed", label: t("forms.speed") },
    { id: "churchConnection", label: t("forms.churchConnection") },
  ]

  return (
    <div className="space-y-6">
      <div>
        <Label className="text-base font-medium mb-2 block">
          {t("forms.serviceNeeded")} <span className="text-red-500">*</span>
        </Label>
        <div className="grid grid-cols-2 gap-3">
          {services.map((service) => (
            <div key={service.id} className="flex items-center space-x-2">
              <Checkbox
                id={`service-${service.id}`}
                checked={(formData.servicesNeeded || []).includes(service.id)}
                onCheckedChange={() => handleCheckboxChange("servicesNeeded", service.id)}
              />
              <Label htmlFor={`service-${service.id}`}>{service.label}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-base font-medium mb-2 block">
          {t("forms.mostImportantFactor")} <span className="text-red-500">*</span>
        </Label>
        <RadioGroup
          value={formData.importantFactor || ""}
          onValueChange={(value) => handleChange("importantFactor", value)}
        >
          {factors.map((factor) => (
            <div key={factor.id} className="flex items-center space-x-2">
              <RadioGroupItem value={factor.id} id={`factor-${factor.id}`} />
              <Label htmlFor={`factor-${factor.id}`}>{factor.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <Label htmlFor="expectations" className="text-base font-medium mb-2 block">
          {t("forms.additionalExpectations")}
        </Label>
        <Textarea
          id="expectations"
          value={formData.expectations || ""}
          onChange={(e) => handleChange("expectations", e.target.value)}
          rows={4}
        />
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
