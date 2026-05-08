import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { HiShieldExclamation } from 'react-icons/hi';

export default function AccessDenied() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
      <HiShieldExclamation className="text-red-500 text-6xl mb-4" />
      <h1 className="text-2xl font-bold text-gray-800 mb-2">{t('ACCESS_DENIED_TITLE')}</h1>
      <p className="text-gray-600 mb-6">{t('ACCESS_DENIED_MESSAGE')}</p>
      <button
        onClick={() => navigate(-1)}
        className="px-6 py-2 cursor-pointer bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all"
      >
        {t('GO_BACK')}
      </button>
    </div>
  );
}
