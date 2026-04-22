import React from "react";
import { useTranslation } from "react-i18next";

const Select = React.forwardRef(({ label, options, error, ...props }, ref) => {
  const { t } = useTranslation();
  return (
    <div>
      <label className="text-sm text-gray-600">{label}</label>
      <select
        ref={ref}
        {...props}
        className="w-full border rounded-xl p-2 mt-2"
      >
        <option value="">{t("select") || t("Select")}</option>
        {options.map((opt) => {
          const option = typeof opt === "string" ? { value: opt, label: opt } : opt;
          return (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </select>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
});

export default Select;
