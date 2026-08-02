import PendingDriverCard from './PendingDriverCard';
import { useDriverStore } from '../../../store/driver/useDriverStore';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function PendingDriverGrid({ drivers }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const error = useDriverStore((state) => state.error);
  const loading = useDriverStore((state) => state.isLoading);

  if (!drivers) {
    return <div className="p-10 text-center text-gray-500">{t('NO_PENDING_REQUSET_FOUND')}</div>;
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center">
        <p className="font-semibold text-red-600">
          {error.message || t('FAILED_TO_FETCH_PENDING_DRIVERS')}
        </p>

        {error.code && <p className="mt-2 text-sm text-red-500">{error.code}</p>}
      </div>
    );
  }

  if (loading) {
    return <div className="p-10 text-center text-gray-500">{t('LOADING')}</div>;
  }

  const handleOnSelectDriver = (driver) => {
    navigate(`${driver._id}/driver-details`);
  };

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {drivers.map((driver) => (
        <PendingDriverCard
          key={driver._id}
          driver={driver}
          onClick={() => handleOnSelectDriver(driver)}
        />
      ))}
    </div>
  );
}
