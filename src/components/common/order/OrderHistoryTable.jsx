import { useTranslation } from 'react-i18next';
import useOrderStore from '../../../store/useOrderStore';
import { toLocaleDigits, toLocalePrice } from '../../../utils/numberConverter';
import i18next from 'i18next';

export default function OrderHistoryTable({displayData}) {
    const statusStyles = {
        delivered: "text-[rgba(39,207,56,1)] p-2 capitalize bg-[rgba(220,249,224,0.2)] font-bold",
        expired: "bg-[rgba(23,23,23,0.05)] p-2 capitalize font-bold rounded",
        rejected: "bg-[rgba(255,204,204,0.4)] p-2 capitalize rounded font-bold text-red-600",
        cancelled: "bg-[rgba(255,204,204,0.4)] p-2 capitalize rounded font-bold text-red-600",
        returned: "bg-[rgba(255,240,194,0.2)] p-2 font-bold capitalize text-[rgba(255,193,20,1)]",
    };
    const {t} = useTranslation()
    const currentLang = i18next.language
    const currentOrderStatus = useOrderStore((state)=> state.currentOrderStatus)
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
                    {displayData.length === 0 ? (
                        <tr>
                            <td colSpan="7" className="py-10">
                                <div className='font-bold text-center w-full'>
                                    {currentOrderStatus === "all" ? "No orders!" : `No ${currentOrderStatus} orders!`}
                                </div>
                            </td>
                        </tr>
                    ) :
                    displayData.map((order) => {
                        return (
                            <tr className="">
                                <td className="p-3">{order.id}</td>
                                <td className="p-3">{toLocaleDigits(order.createdAt.split('T')[0].split('-').reverse().join('-'), currentLang)}</td>
                                <td className="p-3">{toLocalePrice(order.finalPrice, currentLang)} {t("AFN")} </td>
                                <td className="p-3">{order.receiver.address}</td>
                                <td className="p-3">{order.receiver.name}</td>
                                <td className="p-3">{order.sender.name}</td>
                                <td className="p-3 ">

                                    <div className={`${statusStyles[order.status]} || text-500-gray capitalize text-center`}>
                                    {(order.status === "expired" || order.status === "rejected" || order.status === "cancelled")&& (
                                        <div className='flex justify-between'>
                                            <div className='w-2 h-2 rounded-[50%] bg-white'></div>
                                            <div className='w-2 h-2 rounded-[50%] bg-white'></div>
                                        </div>
                                    )}
                                        <span className='p-4 text-center'> {t(order.status)}</span>

                                    </div></td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>
        </div>
    )
}
