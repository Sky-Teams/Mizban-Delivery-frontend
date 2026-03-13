export default function OrderStates({ order }) {
  if (!order || !order.status) return null;

  const status = order.status.toLowerCase();

  const styles = {
    pending: "text-orange-500 bg-orange-50",
    delivered: "text-green-600 bg-green-50",
    cancelled: "text-red-600 bg-red-50",
    assigned: "text-blue-600 bg-blue-50"
  };

  return (
    <div className="flex flex-col gap-1">
      <span className={`px-3 py-1 rounded-full uppercase text-sm font-bold w-fit border ${styles[status] || "bg-gray-100"}`}>
        {order.status}
      </span>
      
      {status === "delivered" && order.deliveredAt && (
        <p className="text-[13px] text-gray-500 ml-1">At {order.deliveredAt}</p>
      )}
      {status === "assigned" && order.courier && (
        <p className="text-[13px] text-gray-500 capitalize ml-1">Assigned Courier: {order.courier}</p>
      )}
      {status === "cancelled" && order.cancellationReason && (
        <p className="text-[13px] text-red-400 ml-1 ">Reason: {order.cancellationReason}</p>
      )}
    </div>
  );
}
