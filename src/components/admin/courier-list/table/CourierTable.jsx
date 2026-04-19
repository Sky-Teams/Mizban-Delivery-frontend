import React from "react";
import { PiStarFill } from "react-icons/pi";
import { useTranslation } from "react-i18next";
import {
  toLocaleDigits,
  toLocalePrice,
} from "../../../../utils/numberConverter";
import CourierStatusBadge from "../shared/CourierStatusBadge";
import CourierRowActions from "./CourierRowActions";

function TableHead({ direction }) {
  const { t } = useTranslation();
  const textAlign = direction === "rtl" ? "text-right" : "text-left";
  const deliveriesAlign = direction === "rtl" ? "text-start" : "text-center";
  const alignTitleText = `pb-4 ${textAlign}`;

  return (
    <thead>
      <tr className="border-b border-gray-100 text-xs font-semibold uppercase text-gray-400">
        <th className={alignTitleText}>{t("Driver")}</th>
        <th className={alignTitleText}>{t("Status")}</th>
        <th className={alignTitleText}>{t("Vehicle")}</th>
        <th className={alignTitleText}>{t("Rating")}</th>
        <th className={alignTitleText}>{t("Last Active")}</th>
        <th className={`pb-4 ${deliveriesAlign}`}>
          {t("Number of  Deliveries")}
        </th>
        <th className="pb-4" />
      </tr>
    </thead>
  );
}

function CourierTableState({ message, isError = false }) {
  return (
    <div
      className={`rounded-2xl border px-4 py-10 text-center text-sm ${
        isError
          ? "border-red-100 bg-red-50 text-red-500"
          : "border-gray-100 bg-white text-gray-500"
      }`}
    >
      {message}
    </div>
  );
}

export default function CourierTable({
  couriers,
  direction,
  lng,
  openMenuId,
  menuPosition,
  menuRef,
  isLoading,
  error,
  onRowClick,
  onToggleMenu,
  onEditCourier,
  onDeleteCourier,
}) {
  const { t } = useTranslation();

  if (error) {
    return (
      <CourierTableState message={t(error, { defaultValue: error })} isError />
    );
  }

  if (isLoading) {
    return <CourierTableState message={t("Loading...")} />;
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-white p-6">
      <h2 className="mb-6 text-base font-semibold">{t("Fleet Directory")}</h2>

      {couriers.length === 0 ? (
        <CourierTableState message={t("No couriers found")} />
      ) : (
        <table className="w-full min-w-[900px]">
          <TableHead direction={direction} />

          <tbody className="divide-y divide-gray-100">
            {couriers.map((courier) => {
              const rating = courier?.rating ?? 0;
              const deliveries = courier?.deliveries ?? 0;

              const image = courier?.image || "";
              const name = courier?.fullName || "";
              const contact = courier?.phone || "";
              const vehicle = courier?.vehicleType || "N/A";
              const lastActive = courier?.lastActive || "N/A";

              const initials = courier?.fullName
                ? courier.fullName
                    .trim()
                    .split(" ")
                    .slice(0, 2)
                    .map((p) => p[0]?.toUpperCase())
                    .join("")
                : "";

              return (
                <tr
                  key={courier.id}
                  onClick={() => onRowClick(courier)}
                  className="cursor-pointer transition hover:bg-gray-50"
                >
                  <td className="py-5">
                    <div className="flex items-center gap-3">
                      {image ? (
                        <img
                          src={image}
                          alt={name || "Courier profile"}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-xs font-semibold text-orange-600">
                          {initials}
                        </div>
                      )}

                      <div>
                        <p className="text-sm font-semibold">
                          {name || t("Unknown courier")}
                        </p>

                        <p className="text-xs text-gray-400">
                          {t("ID")}: {toLocaleDigits(courier.id, lng)}
                        </p>

                        <p className="text-xs text-gray-400">
                          {toLocaleDigits(contact, lng)}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="py-5">
                    <CourierStatusBadge status={courier.status} />
                  </td>

                  <td className="py-5 text-sm text-gray-500">{vehicle}</td>

                  <td className="py-5">
                    <div className="flex items-center gap-1">
                      <PiStarFill size={14} className="text-yellow-400" />
                      <span className="text-sm font-semibold">
                        {toLocalePrice(rating, lng)}
                      </span>
                    </div>
                  </td>

                  <td className="py-5 text-sm text-gray-500">{lastActive}</td>

                  <td className="py-5 text-center text-sm font-semibold">
                    {toLocaleDigits(deliveries, lng)}
                  </td>

                  <td className="py-5">
                    <CourierRowActions
                      courierId={courier.id}
                      openMenuId={openMenuId}
                      menuPosition={menuPosition}
                      menuRef={menuRef}
                      onToggleMenu={onToggleMenu}
                      onEditCourier={onEditCourier}
                      onDeleteCourier={onDeleteCourier}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
