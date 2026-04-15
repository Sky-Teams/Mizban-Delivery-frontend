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
            { value: "car", label: t("car") },
            { value: "van", label: t("van") },
          ]}
          error={errors.vehicleType}
          ref={(el) => setRef("vehicleType", el)}
        />
        <Input
          label={t("vehicleRegistration")}
          name="vehicleRegistrationNumber"
          value={formData.vehicleRegistrationNumber}
          onChange={handleChange}
          error={errors.vehicleRegistrationNumber}
          placeholder="HR-4502312"
          ref={(el) => setRef("vehicleRegistrationNumber", el)}
        />
      </div>
    </>
  );
}
