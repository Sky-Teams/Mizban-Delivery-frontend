import useOrderStore from '../../../store/useOrderStore';

export default function OrderHistoryTable() {
    const orders = useOrderStore((state) => state.orders)
    const statusStyles = {
        delivered: "text-green-600 font-bold",
        expired: "bg-gray-400 p-2 font-bold rounded text-red-600",
        cancelled: "bg-red-100 p-2 rounded font-bold text-red-600",
        returned: "bg-yellow-50 p-2 font-bold text-yellow-600",
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-gray-200 bg-[#ff9d85]">
                        <th className="py-3 px-4 font-bold text-center text-sm">Code</th>
                        <th className="py-3 px-4 font-bold text-center text-sm">Date</th>
                        <th className="py-3 px-4 font-bold text-center text-sm">Your income</th>
                        <th className="py-3 px-4 font-bold text-center text-sm">Delivery address</th>
                        <th className="py-3 px-4 font-bold text-center text-sm">Customer</th>
                        <th className="py-3 px-4 font-bold text-center text-sm">Restaurant</th>
                        <th className="py-3 px-4 font-bold text-center text-sm">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => {
                        return (
                            <tr className="">
                                <td className="p-3">{order.id}</td>
                                <td className="p-3">{order.createdAt.split('T')[0].split('-').reverse().join('-')}</td>
                                <td className="p-3">{order.finalPrice} AFN</td>
                                <td className="p-3">{order.receiver.address}</td>
                                <td className="p-3">{order.receiver.name}</td>
                                <td className="p-3">{order.sender.name}</td>
                                <td className="p-3 "><span className={`${statusStyles[order.status]} || text-500-gray`}>{order.status}</span></td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>
        </div>
    )
}
