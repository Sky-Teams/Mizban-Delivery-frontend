import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AuthLayoutCard from '../../../components/common/AuthLayoutCard';
import { HiOutlineLockClosed } from 'react-icons/hi';
import { isRTL } from '../../../utils/i18nHelper';
import { ROUTE_PATHS } from '../../../routes/routePaths';

const ResetPassword = () => {
  const { t, i18n } = useTranslation();

  const rtl = isRTL();
  const textAlign = rtl ? 'text-right' : 'text-left';

  return (
    <AuthLayoutCard
      title={t('REQUEST_RESET_PASSWORD')}
      description={t('RESET_PASSWORD_PROCESS_DESCRIPTION')}
      showEmail={false}
      backLink={ROUTE_PATHS.LOGIN}
      backText=""
    >
      {/* New Password */}
      <div className={`${textAlign} mb-6 `}>
        <label className="block text-sm font-medium mb-1 text-gray-700">{t('newPassword')}</label>

        <div className="relative">
          <input
            type="password"
            placeholder={t('ENTER_NEW_PASSWORD')}
            className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-orange-400"
          />
          <HiOutlineLockClosed
            size={16}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          />
        </div>
      </div>

      {/* Confirm Password */}
      <div className={`${textAlign} mb-8`}>
        <label className="block text-sm font-medium mb-1 text-gray-700">
          {t('CONFIRM_PASSWORD')}
        </label>

        <input
          type="password"
          placeholder={t('REPEAT_PASSWORD')}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-400"
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-between gap-4">
        <button className="flex-1 py-2 rounded-sm bg-orange-500 text-white text-sm font-medium hover:bg-orange-600 transition">
          {t('RESET_PASSWORD')}
        </button>

        <Link
          to={ROUTE_PATHS.LOGIN}
          className="flex-1 py-2 rounded-sm border border-orange-400 text-orange-500 text-sm font-medium text-center hover:bg-orange-50 transition"
        >
          {t('CANCEL_RESET')}
        </Link>
      </div>
    </AuthLayoutCard>
  );
};

export default ResetPassword;
