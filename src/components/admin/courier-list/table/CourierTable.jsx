import React from "react";
import { PiStarFill } from "react-icons/pi";
import { useTranslation } from "react-i18next";
import {
  toLocaleDigits,
  toLocalePrice,
} from "../../../../utils/numberConverter";
import CourierStatusBadge from "../shared/CourierStatusBadge";
import CourierRowActions from "./CourierRowActions";
import {
  getCourierContact,
  getCourierDeliveries,
  getCourierImage,
  getCourierInitials,
  getCourierLastActive,
  getCourierRating,
  getCourierVehicleLabel,
} from "../shared/courierListUtils";

function TableHead({ direction }) {
  const { t } = useTranslation();
  const textAlign = direction === "rtl" ? "text-right" : "text-left";
  const deliveriesAlign = direction === "rtl" ? "text-start" : "text-end";

  return (
    <thead>
      <tr className="border-b border-gray-100 text-xs font-semibold uppercase text-gray-400">
        <th className={`pb-4 ${textAlign}`}>{t("Driver")}</th>
        <th className={`pb-4 ${textAlign}`}>{t("Status")}</th>
        <th className={`pb-4 ${textAlign}`}>{t("Vehicle")}</th>
        <th className={`pb-4 ${textAlign}`}>{t("Rating")}</th>
        <th className={`pb-4 ${textAlign}`}>{t("Last Active")}</th>
        <th className={`pb-4 ${deliveriesAlign}`}>{t("Deliveries")}</th>
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
    return <CourierTableState message={t(error, { defaultValue: error })} isError />;
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
              const rating = getCourierRating(courier);
              const deliveries = getCourierDeliveries(courier);
              const image = getCourierImage(courier);

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
                          alt={courier.fullName || "Courier profile"}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-xs font-semibold text-orange-600">
                          {getCourierInitials(courier)}
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-semibold">
                          {courier.fullName || t("Unknown courier")}
                        </p>
                        <p className="text-xs text-gray-400">
                          {t("ID")}: {toLocaleDigits(courier.id, lng)}
                        </p>
                        <p className="text-xs text-gray-400">
                          {toLocaleDigits(getCourierContact(courier), lng)}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="py-5">
                    <CourierStatusBadge status={courier.status} />
                  </td>

                  <td className="py-5 text-sm text-gray-500">
                    {getCourierVehicleLabel(courier)}
                  </td>

                  <td className="py-5">
                    <div className="flex items-center gap-1">
                      <PiStarFill size={14} className="text-yellow-400" />
                      <span className="text-sm font-semibold">
                        {toLocalePrice(rating, lng)}
                      </span>
                    </div>
                  </td>

                  <td className="py-5 text-sm text-gray-500">
                    {getCourierLastActive(courier)}
                  </td>

                  <td className="py-5 text-right text-sm font-semibold">
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
