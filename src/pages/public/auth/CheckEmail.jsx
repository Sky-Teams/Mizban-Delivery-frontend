import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AuthLayoutCard from '../../../components/common/AuthLayoutCard';

const CheckEmail = ({ email }) => {
  const { t } = useTranslation();
  return (
    <AuthLayoutCard
      title={t('CHECK_YOUR_EMAIL')}
      description={t('CONFIRM_EMAIL_DSECRIPTION')}
      email={email}
    >
      {/* Button */}
      <button className="w-full py-2.5 rounded-md mt-3 text-white text-sm sm:text-base font-medium bg-orange-500 hover:bg-orange-600 transition cursor-pointer">
        {t('OPEN_EMAIL')}
      </button>

      {/* Bottom Links */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-1 text-xs sm:text-sm gap-2">
        <button className="text-gray-700">
          {t('DIDNT_RECIEVED_THE_LINK_QUESTION')}{' '}
          <span className="underline cursor-pointer">{t('RESEND')}</span>
        </button>

        <Link to="/otp-verification" className="text-orange-500 font-medium">
          {t('MANUAL_OTP')}
        </Link>
      </div>

      {/* Timer */}
      <p className="text-[10px] sm:text-xs text-gray-400 flex flex-col sm:flex-row justify-between items-center">
        {t('LINK_EXPIRATION_DURATION')}
      </p>
    </AuthLayoutCard>
  );
};

export default CheckEmail;
