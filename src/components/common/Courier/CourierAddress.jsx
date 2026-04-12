import React from "react";
import Select from "./Select";
import { useTranslation } from "react-i18next";

export default function CourierAddress({ formData, handleChange }) {
  const { t } = useTranslation();

  return (
    <>
      <div>
        <label className="text-sm text-gray-600">{t("homeAddress")}</label>
        <textarea
          name="homeAddress"
          value={formData.homeAddress}
          onChange={handleChange}
          placeholder={t("homeAddress")}
          className="w-full border rounded-xl p-2 mt-2"
        />
      </div>
      <Select
        label={t("status")}
        name="status"
        value={formData.status}
        onChange={handleChange}
        options={[
          { value: "offline", label: t("offline") },
          { value: "idle", label: t("idle") },
          { value: "assigned", label: t("assigned") },
          { value: "delivering", label: t("delivering") },
        ]}
      />
    </>
  );
}
