import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDriverStore } from '../../store/useDriverStore';
import DriverForm from '../../components/admin/DriverForm';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { getServerMessage } from '../../utils/i18nHelper';

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
      navigate('/drivers');
    } catch (error) {
      toast.error(getServerMessage(error, t('Failed to update driver')));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">{t('Edit Driver')}</h1>

      <DriverForm
        initialData={{
          ...localDriver,
        }}
        onSubmit={handleSubmit}
        isEdit
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
