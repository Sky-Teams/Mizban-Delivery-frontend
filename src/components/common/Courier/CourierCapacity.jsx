import React from "react";
import Input from "./Input";
import { useTranslation } from "react-i18next";
import { toLocaleDigits } from "../../../utils/numberConverter";
import i18n from "../../../i18n";

export default function CourierCapacity({ formData, handleChange }) {
  const { t } = useTranslation();
  const lng = i18n.language;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Input
        label={t("maxWeight")}
        name="maxWeightKg"
        type="number"
        min="0"
        step="1"
        value={formData.maxWeightKg}
        onChange={handleChange}
        placeholder={toLocaleDigits("50", lng)}
      />
      <Input
        label={t("maxPackages")}
        name="maxPackages"
        type="number"
        min="0"
        step="1"
        value={formData.maxPackages}
        onChange={handleChange}
        placeholder={toLocaleDigits("10", lng)}
      />
    </div>
  );
}
