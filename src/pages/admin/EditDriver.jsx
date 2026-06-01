import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDriverStore } from '../../store/driver/useDriverStore';
import DriverForm from '../../components/admin/DriverForm';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';

export default function EditDriver() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingDriver, setLoadingDriver] = useState(true);
  const [localDriver, setLocalDriver] = useState(null);

  const updateDriver = useDriverStore((state) => state.updateDriver);
  const getDriverById = useDriverStore((state) => state.getDriverById);
  const fetchDriverById = useDriverStore((state) => state.fetchDriverById);

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
    return <div>{t('LOADING')}</div>;
  }

  if (!localDriver) {
    return <div>{t('DRIVER_NOT_FOUND')}</div>;
  }

  const handleSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      await updateDriver(id, data);
      toast.success(t('UPDATE_DRIVER'));
      navigate('/drivers');
    } catch (error) {
      toast.error(t(error?.message || t('DRIVER_UPDATE_FAILED')));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">{t('EDIT_DRIVER')}</h1>

      <DriverForm initialData={localDriver} onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  );
}
