import React from "react";

export default function FormButtons({ navigate, isEdit, t }) {
  return (
    <div className="flex gap-4">
      <button
        type="submit"
        className="bg-orange-500 text-white px-6 py-2 rounded-xl"
      >
        {isEdit ? t("updateCourier") : t("saveCourier")}
      </button>
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="bg-gray-300 px-6 py-2 rounded-xl"
      >
        {t("cancel")}
      </button>
    </div>
  );
}
