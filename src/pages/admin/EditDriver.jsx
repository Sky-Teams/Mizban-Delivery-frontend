import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDriverStore } from '../../store/useDriverStore';
import DriverForm from '../../components/admin/DriverForm';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { ROUTE_PATHS } from '../../routes/routePaths';

export default function EditDriver() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingDriver, setLoadingDriver] = useState(true);
  const [localDriver, setLocalDriver] = useState(null);

  const updateDriver = useDriverStore((s) => s.updateDriver);
  const getDriverById = useDriverStore((s) => s.getDriverById);
  const fetchDriverById = useDriverStore((s) => s.fetchDriverById);

  useEffect(() => {
    let isMounted = true;

    const loadDriver = async () => {
      setLoadingDriver(true);

      try {
        let found = getDriverById(id);

        if (!found) {
          found = await fetchDriverById(id);
        }

        if (isMounted) {
          setLocalDriver(found || null);
        }
      } catch {
        if (isMounted) {
          setLocalDriver(null);
        }
      } finally {
        if (isMounted) {
          setLoadingDriver(false);
        }
      }
    };

    loadDriver();

    return () => {
      isMounted = false;
    };
  }, [id, getDriverById, fetchDriverById]);

  if (loadingDriver) {
    return <div>{t('Loading...')}</div>;
  }

  if (!localDriver) {
    return <div>{t('Driver not found')}</div>;
  }

  const handleSubmit = async (data) => {
    try {
      setIsSubmitting(true);

      await updateDriver(id, data);

      toast.success(t('updateDriver'));
      navigate(ROUTE_PATHS.DRIVERS);
    } catch (error) {
      toast.error(t(error?.message || 'Failed to update driver'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">{t('Edit Driver')}</h1>

      <DriverForm
        initialData={localDriver}
        onSubmit={handleSubmit}
        isEdit
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
