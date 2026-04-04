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
        type="text"
        value={toLocaleDigits(formData.maxWeightKg, lng)}
        onChange={handleChange}
        placeholder={toLocaleDigits("50", lng)}
      />
      <Input
        label={t("maxPackages")}
        name="maxPackages"
        type="text"
        value={toLocaleDigits(formData.maxPackages, lng)}
        onChange={handleChange}
        placeholder={toLocaleDigits("10", lng)}
      />
    </div>
  );
}
