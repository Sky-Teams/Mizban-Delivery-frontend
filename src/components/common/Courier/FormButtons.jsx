import React from "react";

export default function FormButtons({ navigate, isEdit, isSubmitting, t }) {
  return (
    <div className="flex gap-4">
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-orange-500 text-white px-6 py-2 rounded-xl disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? t("Loading...") : isEdit ? t("updateCourier") : t("saveCourier")}
      </button>
      <button
        type="button"
        disabled={isSubmitting}
        onClick={() => navigate(-1)}
        className="bg-gray-300 px-6 py-2 rounded-xl disabled:cursor-not-allowed disabled:opacity-70"
      >
        {t("cancel")}
      </button>
    </div>
  );
}
