import React from "react";
import { createPortal } from "react-dom";
import {
  PiDotsThreeVertical,
  PiPencilSimple,
  PiTrash,
} from "react-icons/pi";
import { useTranslation } from "react-i18next";

export default function CourierRowActions({
  courierId,
  openMenuId,
  menuPosition,
  menuRef,
  onToggleMenu,
  onEditCourier,
  onDeleteCourier,
}) {
  const { t } = useTranslation();

  return (
    <div className="relative text-right">
      <button
        type="button"
        onClick={(event) => onToggleMenu(event, courierId)}
        className="rounded-full p-2 hover:bg-gray-100"
        aria-label={t("Open courier actions")}
      >
        <PiDotsThreeVertical size={18} />
      </button>

      {openMenuId === courierId &&
        createPortal(
          <div
            ref={menuRef}
            style={{
              position: "absolute",
              top: menuPosition?.top,
              left: menuPosition?.left,
            }}
            className="z-[9999] w-40 rounded-xl border border-gray-100 bg-white py-2 shadow-lg"
          >
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onEditCourier(courierId);
              }}
              className="flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50"
            >
              <PiPencilSimple size={14} />
              {t("Edit")}
            </button>

            <button
              type="button"
              onClick={(event) => onDeleteCourier(event, courierId)}
              className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50"
            >
              <PiTrash size={14} />
              {t("Delete")}
            </button>
          </div>,
          document.body,
        )}
    </div>
  );
}
