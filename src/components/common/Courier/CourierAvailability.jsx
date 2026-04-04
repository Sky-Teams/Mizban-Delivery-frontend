import React from "react";
import Input from "./Input";
import { useTranslation } from "react-i18next";

export default function CourierAvailability({
  formData,
  handleChange,
  errors,
  setRef,
}) {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Input
        label={t("shiftStart")}
        name="shiftStart"
        type="time"
        value={formData.shiftStart}
        onChange={handleChange}
      />
      <Input
        label={t("shiftEnd")}
        name="shiftEnd"
        type="time"
        value={formData.shiftEnd}
        onChange={handleChange}
        error={errors.shiftEnd}
        ref={(el) => setRef("shiftEnd", el)}
      />
    </div>
  );
}
