import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDriverStore } from '../../store/driver/useDriverStore';
import PendingDriverGrid from '../../components/admin/driverVerification/PendingDriverGrid';

export default function DriverVerification() {
  const { t } = useTranslation();

  const fetchPendingDriver = useDriverStore((state) => state.fetchPendingDriver);
  const pendingDrivers = useDriverStore((state) => state.pendingDrivers);
  const totalDrivers = useDriverStore((state) => state.totalDrivers);
  const isLoading = useDriverStore((state) => state.isLoading);
  const error = useDriverStore((state) => state.error);

  useEffect(() => {
    fetchPendingDriver();
  }, [fetchPendingDriver]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="mx-auto">
        <h1 className="mb-6 text-2xl font-bold text-black">
          {t('PENDING_DRIVER_REQUESTS')} ({totalDrivers})
        </h1>

        <PendingDriverGrid drivers={pendingDrivers} />
      </div>
    </div>
  );
}
