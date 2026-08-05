import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDriverStore } from '../../store/driver/useDriverStore';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/order/Button';

export default function Dashboard() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleDriverVerificationHandle = () => {
    navigate('driver-verification');
  };

  return (
    <div className="flex items-center justify-between">
      <h1>{t('THIS_IS_DASHBOARD')}</h1>
      <Button text={'Driver Verification'} onClick={handleDriverVerificationHandle} />
    </div>
  );
}
