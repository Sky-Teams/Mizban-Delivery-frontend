import React, { useMemo } from "react";
import { PiCheckCircle, PiTrophy, PiTruck } from "react-icons/pi";
import { useTranslation } from "react-i18next";
import { toLocaleDigits } from "../../../../utils/numberConverter";
import { COURIER_STATUS } from "../../../../utils/types";

function StatCard({ label, value, icon, iconBg }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6">
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconBg}`}
      >
        {icon}
      </div>

      <div className="mt-4">
        <p className="text-xs text-gray-400">{label}</p>
        <p className="text-2xl font-semibold">{value}</p>
      </div>
    </div>
  );
}

export default function CourierStats({ couriers, lng }) {
  const { t } = useTranslation();

  const stats = useMemo(() => {
    const total = couriers.length;

    const active = couriers.filter(
      (c) =>
        c.status === COURIER_STATUS.IDLE ||
        c.status === COURIER_STATUS.DELIVERING,
    ).length;

    const pending = couriers.filter(
      (c) => c.status === COURIER_STATUS.PENDING,
    ).length;

    return { total, active, pending };
  }, [couriers]);

  return (
    <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-3">
      <StatCard
        label={t("Total Drivers")}
        value={toLocaleDigits(stats.total, lng)}
        icon={<PiTruck size={22} className="text-blue-500" />}
        iconBg="bg-blue-100"
      />

      <StatCard
        label={t("Active Now")}
        value={toLocaleDigits(stats.active, lng)}
        icon={<PiCheckCircle size={22} className="text-emerald-500" />}
        iconBg="bg-emerald-100"
      />

      <StatCard
        label={t("Pending Approval")}
        value={toLocaleDigits(stats.pending, lng)}
        icon={<PiTrophy size={22} className="text-orange-500" />}
        iconBg="bg-orange-100"
      />
    </div>
  );
}
