import { MoreVertical } from 'lucide-react'; 
import OrderStatusBadge from '../../components/common/OrderStatusBadge';

const OrdersTable = ({ orders }) => {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-100 bg-white shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50/50">
          <tr className="text-gray-400 text-[11px] uppercase tracking-wider">
            <th className="py-4 px-6 font-semibold">Order ID</th>
            <th className="py-4 px-6 font-semibold">Customer</th>
            <th className="py-4 px-6 font-semibold">Payment</th>
            <th className="py-4 px-6 font-semibold text-center">Status</th>
            <th className="py-4 px-6 font-semibold text-right">Total</th>
            <th className="py-4 px-6 font-semibold text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {orders.map((order) => (
            <tr key={order.id} className="group hover:bg-orange-50/30 transition-all duration-200 cursor-pointer">
              <td className="py-4 px-6">
                <span className="font-mono text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded">
                  {order.id}
                </span>
              </td>

              <td className="py-4 px-6">
                <div className="flex flex-col">
                  <span className="font-bold text-gray-900">{order.customer.name}</span>
                  <span className="text-[11px] text-gray-400">{order.customer.phone}</span>
                </div>
              </td>

              <td className="py-4 px-6">
                <span className="text-sm text-gray-600">{order.paymentStatus}</span>
              </td>

              <td className="py-4 px-6 text-center">
                <OrderStatusBadge status={order.status} />
              </td>

              <td className="py-4 px-6 text-right font-black text-gray-900">
                {order.total.toLocaleString()} AFN
              </td>

              <td className="py-4 px-6 text-right">
                <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
                  <MoreVertical size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default OrdersTable