import { useTranslation } from 'react-i18next';
import { toLocaleDigits } from '../../../utils/numberConverter';
import i18next from 'i18next';

export default function DriverOrderStatusbar({ orders = [], currentStatus, setCurrentStatus }) {
  const { t } = useTranslation();
  const currentLang = i18next.language;

  const baseButton = 'px-4 pb-2 transition-colors duration-200 hover:text-orange-500 cursor-pointer';

  const activeButton = 'text-orange-500 border-b-2 border-orange-500 font-semibold';

  // filtering the data that is comign from the backend,
  const completedOrders = orders.filter((order) => order.status === 'delivered');
  const cancelledOrders = orders.filter((order) => order.status === 'cancelled');
  const rejectedOrders = orders.filter((order) => order.status === 'rejected');
  const expiredOrders = orders.filter((order) => order.offer.status === 'expired');
  const returnedOrders = orders.filter((order) => order.status === 'returned');

  const handleStatusButtonsClick = (status) => {
    setCurrentStatus(status);
  };

  const matchId = (id) => {
    return `${baseButton} ${currentStatus === id ? activeButton : ''}`;
  };

  return (
    <div className="p-4 w-full">
      <div className="flex md:justify-between items-center mb-[-2px] relative z-10">
        <button className={matchId('all')} onClick={() => handleStatusButtonsClick('all')}>
          {t('ALL')} ({toLocaleDigits(orders.length, currentLang)})
        </button>

        <button
          className={matchId('delivered')}
          onClick={() => handleStatusButtonsClick('delivered')}
        >
          {t('COMPLETED')} ({toLocaleDigits(completedOrders.length, currentLang)})
        </button>

        <button
          className={matchId('cancelled')}
          onClick={() => handleStatusButtonsClick('cancelled')}
        >
          {t('CANCELLED')} ({toLocaleDigits(cancelledOrders.length, currentLang)})
        </button>

        <button
          className={matchId('rejected')}
          onClick={() => handleStatusButtonsClick('rejected')}
        >
          {t('REJECTED')} ({toLocaleDigits(rejectedOrders.length, currentLang)})
        </button>

        <button className={matchId('expired')} onClick={() => handleStatusButtonsClick('expired')}>
          {t('EXPIRED')} ({toLocaleDigits(expiredOrders.length, currentLang)})
        </button>

        <button
          className={matchId('returned')}
          onClick={() => handleStatusButtonsClick('returned')}
        >
          {t('RETURNED')} ({toLocaleDigits(returnedOrders.length, currentLang)})
        </button>
      </div>

      <div className="bg-gray-200 w-full h-[2px]" />
    </div>
  );
}
