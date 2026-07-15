import { useTranslation } from 'react-i18next';
import { LiveLocation } from '../../components/liveDemo';

export default function Dashboard() {
  const { t } = useTranslation();

  return (
    <div>
      {t('THIS_IS_DASHBOARD')}
      <div>
        <LiveLocation />
      </div>
    </div>
  );
}
