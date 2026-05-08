import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDriverStore } from '../../store/useDriverStore';
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

  const drivers = useDriverStore((s) => s.drivers);
  const updateDriver = useDriverStore((s) => s.updateDriver);
  const getDriverById = useDriverStore((s) => s.getDriverById);
  const fetchDriverById = useDriverStore((s) => s.fetchDriverById);

  useEffect(() => {
    const loadDriver = async () => {
      setLoadingDriver(true);

      // 1. try local store first
      let found = getDriverById(id);

      // 2. if not found  fetch from API
      if (!found) {
        try {
          found = await fetchDriverById(id);
        } catch (err) {
          found = null;
        }
      }

      setLocalDriver(found);
      setLoadingDriver(false);
    };

    loadDriver();
  }, [id]);

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
      toast.error(error?.message || t('FAILED_TO_UPDATE_DRIVER'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">{t('EDIT_DRIVER')}</h1>

      <DriverForm
        initialData={{
          ...localDriver,
          userId: localDriver.userId,
          image: localDriver.image,
        }}
        onSubmit={handleSubmit}
        isEdit
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
