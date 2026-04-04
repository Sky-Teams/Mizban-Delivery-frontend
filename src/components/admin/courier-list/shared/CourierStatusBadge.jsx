import React from "react";
import { normalizeStatus } from "./courierListUtils";

const styles = {
  Active: "bg-emerald-100 text-emerald-600",
  Idle: "bg-yellow-100 text-yellow-600",
  Delivering: "bg-blue-100 text-blue-600",
  "Pending Approval": "bg-orange-100 text-orange-600",
  Suspended: "bg-red-100 text-red-500",
  Offline: "bg-slate-100 text-slate-600",
  Unknown: "bg-gray-100 text-gray-500",
};

export default function CourierStatusBadge({ status }) {
  const normalizedStatus = normalizeStatus(status);

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
        styles[normalizedStatus] || styles.Unknown
      }`}
    >
      <span className="h-2 w-2 rounded-full bg-current" />
      {normalizedStatus}
    </span>
  );
}
