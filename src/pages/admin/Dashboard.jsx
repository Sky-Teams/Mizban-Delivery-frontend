import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function Dashboard() {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-between">
      <h1>{t('THIS_IS_DASHBOARD')}</h1>
    </div>
  );
}
