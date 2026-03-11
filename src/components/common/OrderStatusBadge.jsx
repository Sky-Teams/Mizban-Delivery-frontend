const OrderStatusBadge = ({ status }) => {
  const statusConfig = {
    PENDING: {
      bg: "bg-amber-50",
      text: "text-amber-700",
      dot: "bg-amber-400",
    },
    ASSIGNED: {
      bg: "bg-blue-50",
      text: "text-blue-700",
      dot: "bg-blue-400",
    },
    DELIVERED: {
      bg: "bg-emerald-50",
      text: "text-emerald-700",
      dot: "bg-emerald-500",
    },
    CANCELLED: {
      bg: "bg-rose-50",
      text: "text-rose-700",
      dot: "bg-rose-400",
    },
  };

  const config = statusConfig[status.toUpperCase()] || {
    bg: "bg-gray-50",
    text: "text-gray-600",
    dot: "bg-gray-300",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase ${config.bg} ${config.text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {status}
    </span>
  );
};

export default OrderStatusBadge;