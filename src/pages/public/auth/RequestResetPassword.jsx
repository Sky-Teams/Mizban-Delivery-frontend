import { useTranslation } from 'react-i18next';
import { HiOutlineMail } from 'react-icons/hi';
import AuthLayoutCard from '../../../components/common/AuthLayoutCard';
import { isRTL } from '../../../utils/i18nHelper';
import { useState } from 'react';
import { resetPasswordSendRequest } from '../../../services/authService';
import toast from 'react-hot-toast';

const RequestResetPassword = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const rtl = isRTL();

  const iconPosition = rtl ? 'left-3' : 'right-3';
  const inputPadding = rtl ? 'pl-10 pr-4 text-right' : 'pr-10 pl-4 text-left';
  const textAlign = rtl ? 'text-right' : 'text-left';

  const handleResetPassword = async () => {
    setError('');
    if (!email.trim()) {
      setError(t('EMAIL_REQUIRED'));
      return;
    }
    setLoading(true);
    try {
      const response = await resetPasswordSendRequest(email);
      if (response) {
        toast.success(t('EMAIL_SENT'));
        setEmail('');
      }
    } catch (error) {
      console.error(error);
      const message = error?.message || t('EMAIL_NOT_SENT');
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayoutCard
      title={t('REQUEST_RESET_PASSWORD')}
      description={t('RESET_PASSWORD_PROCESS_DESCRIPTION')}
      showEmail={false}
      backLink="/login"
      backText={t('BACK_TO_LOGIN')}
    >
      {/* Email */}
      <div className="mb-5">
        <label className={`block text-sm font-medium mb-2 text-gray-700 ${textAlign}`}>
          {t('EMAIL')}
        </label>

        <div className="relative">
          <input
            type="email"
            placeholder={t('EMAIL_PLACEHOLDER')}
            className={`w-full border border-gray-300 rounded-md py-2 text-sm focus:outline-none 
              focus:ring-1 focus:ring-orange-400 ${inputPadding} ${error ? 'border-red-500' : 'border-gray-300'}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <HiOutlineMail
            className={`absolute top-1/2 -translate-y-1/2 text-gray-500 ${iconPosition}`}
            size={18}
          />
        </div>
        {error && <p className="text-sm my-2 text-left text-red-500 ">{error}</p>}
      </div>

      {/* Button */}
      <button
        className="w-full py-2.5 rounded-md text-white text-sm font-medium bg-orange-500 hover:bg-orange-600 transition"
        onClick={handleResetPassword}
      >
        {loading ? t('LOADING') : t('SEND_INSTRUCTIONS')}
      </button>
    </AuthLayoutCard>
  );
};

export default RequestResetPassword;
