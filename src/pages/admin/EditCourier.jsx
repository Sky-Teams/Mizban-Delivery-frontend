import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCourierStore } from '../../store/useCourierStore';
import CourierForm from '../../components/admin/CourierForm';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';

export default function EditCourier() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingCourier, setLoadingCourier] = useState(true);
  const [localCourier, setLocalCourier] = useState(null);

  const couriers = useCourierStore((s) => s.couriers);
  const updateCourier = useCourierStore((s) => s.updateCourier);
  const getCourierById = useCourierStore((s) => s.getCourierById);
  const fetchCourierById = useCourierStore((s) => s.fetchCourierById);

  useEffect(() => {
    const loadCourier = async () => {
      setLoadingCourier(true);

      // 1. try local store first
      let found = getCourierById(id);

      // 2. if not found → fetch from API
      if (!found) {
        try {
          found = await fetchCourierById(id);
        } catch (err) {
          found = null;
        }
      }

      setLocalCourier(found);
      setLoadingCourier(false);
    };

    loadCourier();
  }, [id]);

  if (loadingCourier) {
    return <div>{t('Loading...')}</div>;
  }

  if (!localCourier) {
    return <div>{t('Courier not found')}</div>;
  }

  const handleSubmit = async (data) => {
    try {
      setIsSubmitting(true);

      await updateCourier(id, data);

      toast.success(t('updateCourier'));
      navigate('/drivers');
    } catch (error) {
      toast.error(error?.message || t('Failed to update courier'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">{t('Edit Courier')}</h1>

      <CourierForm
        initialData={{
          ...localCourier,
          userId: localCourier.userId,
          image: localCourier.image,
        }}
        onSubmit={handleSubmit}
        isEdit
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
