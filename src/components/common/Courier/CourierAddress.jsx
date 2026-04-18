import React from "react";
import Select from "./Select";
import { useTranslation } from "react-i18next";
import { COURIER_STATUS } from "../../../utils/types";

export default function CourierAddress({ formData, handleChange }) {
  const { t } = useTranslation();

  return (
    <>
      <div>
        <label className="text-sm text-gray-600">{t("homeAddress")}</label>
        <textarea
          name="address"
          value={formData.address}
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
        options={Object.values(COURIER_STATUS).map((status) => ({
          value: status,
          label: t(status),
        }))}
      />
    </>
  );
}
