import { useTranslation } from 'react-i18next';
import { toLocaleDigits, toLocalePrice } from '../../../utils/numberConverter';
import i18next from 'i18next';
import useOrderHistoryStore from '../../../store/orders/useOrderHistoryStore';

const statusStyles = {
  delivered: 'text-[rgba(39,207,56,1)]  bg-[rgba(220,249,224,0.2)] font-bold',
  completed: 'text-[rgba(39,207,56,1)] bg-[rgba(220,249,224,0.2)] font-bold',
  expired: 'bg-[rgba(23,23,23,0.05)] font-bold rounded',
  rejected: 'bg-[rgba(255,204,204,0.4)] rounded font-bold text-red-600',
  cancelled: 'bg-[rgba(255,204,204,0.4)]  rounded font-bold text-red-600',
  returned: 'bg-[rgba(255,240,194,0.2)] font-bold  text-[rgba(255,193,20,1)]',
};
export default function OrderHistoryTable({ displayData }) {
  const fetching = useOrderHistoryStore((state) => state.fetching);

  const filteringError = useOrderHistoryStore((state) => state.errors[state.currentOrderStatus]);
  const { t } = useTranslation();
  const currentLang = i18next.language;

  const currentOrderStatus = useOrderHistoryStore((state) => state.currentOrderStatus);

  return (
    <div className="">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-200 bg-[#ff9d85]">
            <th className="py-3 px-4 font-bold text-center text-sm">{t('CODE')}</th>
            <th className="py-3 px-4 font-bold text-center text-sm">{t('DATE')}</th>
            <th className="py-3 px-4 font-bold text-center text-sm">{t('YOUR_INCOME')}</th>
            <th className="py-3 px-4 font-bold text-center text-sm">{t('DELIVERY_ADDRESS')}</th>
            <th className="py-3 px-4 font-bold text-center text-sm">{t('CUSTOMER')}</th>
            <th className="py-3 px-4 font-bold text-center text-sm">{t('RESTAURANT')}</th>
            <th className="py-3 px-4 font-bold text-center text-sm">{t('STATUS')}</th>
          </tr>
        </thead>

        <tbody>
          {fetching ? (
            <tr>
              <td colSpan="7" className="py-10">
                <div className="font-bold text-center w-full">{t('LOADING_ORDERS')}</div>
              </td>
            </tr>
          ) : filteringError ? (
            <tr>
              <td colSpan="7" className="py-10">
                <div className="font-bold text-center w-full text-red-600">{filteringError}</div>
              </td>
            </tr>
          ) : displayData.length === 0 ? (
            <tr>
              <td colSpan="7" className="py-10">
                <div className="font-bold text-center w-full">
                  {currentOrderStatus === 'all'
                    ? t('NO_ORDERS_FOUND')
                    : `${t('NO')} ${t(currentOrderStatus)} ${t('ORDERS_FOUND_FILTER')}`}
                </div>
              </td>
            </tr>
          ) : (
            displayData.map((order) => {
              return (
                <tr key={order._id} className="border-b border-gray-300">
                  <td className="p-3">{order._id}</td>
                  <td className="p-3 text-center">
                    {toLocaleDigits(
                      order.createdAt.split('T')[0].split('-').reverse().join('-'),
                      currentLang,
                    )}
                  </td>
                  <td className="p-3 text-center">
                    {toLocalePrice(order.finalPrice, currentLang)} {t('AFN')}
                  </td>
                  <td className="p-3">{order.receiver.address}</td>
                  <td className="p-3 text-center">{order.receiver.name}</td>
                  <td className="p-3 text-center">{order.sender.name}</td>
                  <td className="p-3">
                    <div
                      className={`${statusStyles[order.status]} relative py-1 px-3 capitalize text-center flex items-center justify-center min-h-[40px]`}
                    >
                      {(order.status === 'expired' ||
                        order.status === 'rejected' ||
                        order.status === 'cancelled') && (
                        <div className="absolute top-0 left-0 right-0 px-2 flex justify-between items-center pointer-events-none">
                          <div className="w-[6px] h-[6px] rounded-full bg-white mt-1"></div>
                          <div className="w-[6px] h-[6px] rounded-full bg-white mt-1"></div>
                        </div>
                      )}
                      <span className="leading-none">{t(order.status.toUpperCase())}</span>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
