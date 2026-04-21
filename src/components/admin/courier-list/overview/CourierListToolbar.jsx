import React from "react";
import { PiMagnifyingGlass, PiPlus } from "react-icons/pi";
import { useTranslation } from "react-i18next";

export default function CourierListToolbar({
  searchQuery,
  onSearchChange,
  onAddCourier,
}) {
  const { t } = useTranslation();

  return (
    <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="relative w-full max-w-md">
        <PiMagnifyingGlass
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder={t("Search drivers by name, ID or ...")}
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-12 pr-4 text-sm focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <button
        type="button"
        onClick={onAddCourier}
        className="flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-600"
      >
        <PiPlus size={16} className="font-bold" />
        {t("Add Courier")}
      </button>
    </div>
  );
}
