import React from "react";

const styles = {
  active: "bg-emerald-100 text-emerald-600",
  idle: "bg-yellow-100 text-yellow-600",
  delivering: "bg-blue-100 text-blue-600",
  pending: "bg-orange-100 text-orange-600",
  suspended: "bg-red-100 text-red-500",
  offline: "bg-slate-100 text-slate-600",
};

const labels = {
  active: "Active",
  idle: "Idle",
  delivering: "Delivering",
  pending: "Pending Approval",
  suspended: "Suspended",
  offline: "Offline",
};

export default function CourierStatusBadge({ status }) {
  const key = (status || "offline").toLowerCase();

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
        styles[key] || "bg-gray-100 text-gray-500"
      }`}
    >
      <span className="h-2 w-2 rounded-full bg-current" />
      {labels[key] || "Unknown"}
    </span>
  );
}
