import { useTranslation } from 'react-i18next';
import { toLocaleDigits, toLocalePrice } from '../../../utils/numberConverter';
import i18next from 'i18next';
import useOrderHistoryStore from '../../../store/orders/useOrderHistoryStore';

export default function OrderHistoryTable({ displayData }) {
    const statusStyles = {
        delivered: "text-[rgba(39,207,56,1)]  bg-[rgba(220,249,224,0.2)] font-bold",
        completed: "text-[rgba(39,207,56,1)] bg-[rgba(220,249,224,0.2)] font-bold",
        expired: "bg-[rgba(23,23,23,0.05)] font-bold rounded",
        rejected: "bg-[rgba(255,204,204,0.4)] rounded font-bold text-red-600",
        cancelled: "bg-[rgba(255,204,204,0.4)]  rounded font-bold text-red-600",
        returned: "bg-[rgba(255,240,194,0.2)] font-bold  text-[rgba(255,193,20,1)]",
    };

    const fetching = useOrderHistoryStore((state) => state.fetching);

    const filteringError = useOrderHistoryStore(
        (state) => state.errors[state.currentOrderStatus]
    );
    const { t } = useTranslation();
    const currentLang = i18next.language;

    const currentOrderStatus = useOrderHistoryStore(
        (state) => state.currentOrderStatus
    );

    return (
        <div className="">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-gray-200 bg-[#ff9d85]">
                        <th className="py-3 px-4 font-bold text-center text-sm">{t("Code")}</th>
                        <th className="py-3 px-4 font-bold text-center text-sm">{t("Date")}</th>
                        <th className="py-3 px-4 font-bold text-center text-sm">{t("YourIncome")}</th>
                        <th className="py-3 px-4 font-bold text-center text-sm">{t("Delivery Address")}</th>
                        <th className="py-3 px-4 font-bold text-center text-sm">{t("Customer")}</th>
                        <th className="py-3 px-4 font-bold text-center text-sm">{t("Restaurant")}</th>
                        <th className="py-3 px-4 font-bold text-center text-sm">{t("Status")}</th>
                    </tr>
                </thead>

                <tbody>
                    {fetching ? (
                        <tr>
                            <td colSpan="7" className="py-10">
                                <div className='font-bold text-center w-full'>
                                    {t("Loading orders...")}
                                </div>
                            </td>
                        </tr>
                    ) : filteringError ? (
                        <tr>
                            <td colSpan="7" className="py-10">
                                <div className='font-bold text-center w-full text-red-600'>
                                    {filteringError}
                                </div>
                            </td>
                        </tr>
                    ) : displayData.length === 0 ? (
                        <tr>
                            <td colSpan="7" className="py-10">
                                <div className='font-bold text-center w-full'>
                                    {currentOrderStatus === "all"
                                        ? t("No orders found!")
                                        : `${t("No")} ${t(currentOrderStatus)} ${t("orders found for this filter!")}`}
                                </div>
                            </td>
                        </tr>
                    ) : (
                        displayData.map((order) => {
                            return (
                                <tr key={order._id} className={fetching ? "opacity-50" : ""}>
                                    <td className="p-3">{order._id}</td>
                                    <td className="p-3 text-center">
                                        {toLocaleDigits(
                                            order.createdAt.split('T')[0].split('-').reverse().join('-'),
                                            currentLang
                                        )}
                                    </td>
                                    <td className="p-3 text-center">
                                        {toLocalePrice(order.finalPrice, currentLang)} {t("AFN")}
                                    </td>
                                    <td className="p-3">{order.receiver.address}</td>
                                    <td className="p-3 text-center">{order.receiver.name}</td>
                                    <td className="p-3 text-center">{order.sender.name}</td>
                                    <td className="p-3">
                                        <div className={`${statusStyles[order.status]} relative py-1 px-3 capitalize text-center flex items-center justify-center min-h-[40px]`}>
                                            {(order.status === "expired" || order.status === "rejected" || order.status === "cancelled") && (
                                                <div className='absolute top-0 left-0 right-0 px-2 flex justify-between items-center pointer-events-none'>
                                                    <div className='w-[6px] h-[6px] rounded-full bg-white mt-1'></div>
                                                    <div className='w-[6px] h-[6px] rounded-full bg-white mt-1'></div>
                                                </div>
                                            )}
                                            <span className="leading-none">{t(order.status)}</span>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                    )}
                </tbody>
            </table>
        </div>
    );
}