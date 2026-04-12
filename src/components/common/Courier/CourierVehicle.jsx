import React from "react";
import Input from "./Input";
import Select from "./Select";
import { useTranslation } from "react-i18next";

export default function CourierVehicle({
  formData,
  handleChange,
  errors,
  setRef,
}) {
  const { t } = useTranslation();

  return (
    <>
      <h2 className="text-xl font-semibold">{t("vehicleInfo")}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label={t("vehicleType")}
          name="vehicleType"
          value={formData.vehicleType}
          onChange={handleChange}
          options={[
            { value: "bike", label: t("bike") },
            { value: "motorbike", label: t("motorbike") },
            { value: "car", label: t("car") },
            { value: "van", label: t("van") },
          ]}
          error={errors.vehicleType}
          ref={(el) => setRef("vehicleType", el)}
        />
        <Input
          label={t("vehicleRegistration")}
          name="vehicleRegistration"
          value={formData.vehicleRegistration}
          onChange={handleChange}
          error={errors.vehicleRegistration}
          placeholder="ABC1234"
          ref={(el) => setRef("vehicleRegistration", el)}
        />
      </div>
    </>
  );
}
