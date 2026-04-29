import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDriverStore } from '../../store/useDriverStore';
import DriverForm from '../../components/admin/DriverForm';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';

export default function AddDriver() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const addDriver = useDriverStore((s) => s.addDriver);
  const { t } = useTranslation();

  const handleSubmit = async (formData) => {
    try {
      setIsSubmitting(true);
      await addDriver(formData);
      toast.success(t('Driver Added Successfully'));
      navigate('/drivers');
    } catch (error) {
      toast.error(error.message || t('Failed to create driver'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">{t('Add Driver')}</h1>

      <DriverForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  );
}
