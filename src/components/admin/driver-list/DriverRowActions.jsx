import React from "react";
import { createPortal } from "react-dom";
import { PiDotsThreeVertical, PiPencilSimple, PiTrash } from "react-icons/pi";
import { useTranslation } from "react-i18next";

export default function DriverRowActions({
  driverId,
  openMenuId,
  menuPosition,
  menuRef,
  onToggleMenu,
  onEditDriver,
  onDeleteDriver,
}) {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  return (
    <div className="relative text-right">
      <button
        type="button"
        onClick={(event) => onToggleMenu(event, driverId)}
        className="rounded-full p-2 hover:bg-gray-100"
        aria-label={t("Open driver actions")}
      >
        <PiDotsThreeVertical size={18} />
      </button>

      {openMenuId === driverId &&
        createPortal(
          <div
            ref={menuRef}
            style={{
              position: "absolute",
              top: menuPosition?.top,
              left: isRTL
                ? (menuPosition?.left || 0) + 140
                : menuPosition?.left,
            }}
            className="z-[9999] w-40 rounded-xl border border-gray-100 bg-white py-2 shadow-lg"
          >
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onEditDriver(driverId);
              }}
              className="flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50"
            >
              <PiPencilSimple size={14} />
              {t("Edit")}
            </button>

            <button
              type="button"
              onClick={(event) => onDeleteDriver(event, driverId)}
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

