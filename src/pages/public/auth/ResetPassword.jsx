import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AuthLayoutCard from '../../../components/common/AuthLayoutCard';
import { HiOutlineLockClosed } from 'react-icons/hi';
import { isRTL } from '../../../utils/i18nHelper';
import { resetPassword } from '../../../services/authService';
import { useState } from 'react';
import { FaEye } from 'react-icons/fa6';
import toast from 'react-hot-toast';

const ResetPassword = () => {
  const [errors, setErrors] = useState({
    newPassword: '',
    confirmPassword: '',
    samePasswords: '',
  });
  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { t } = useTranslation();
  const { resetToken } = useParams();

  const rtl = isRTL();
  const textAlign = rtl ? 'text-right' : 'text-left';

  const handleResetPassword = async () => {
    const newErrors = {
      newPassword: '',
      confirmPassword: '',
      samePasswords: '',
    };

    if (!newPassword) {
      newErrors.newPassword = t('NEW_PASSWORD_IS_REQUIRED');
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = t('CONFIRM_PASSWORD_IS_REQUIRED');
    }

    setErrors(newErrors);

    if (newPassword !== confirmPassword) {
      newErrors.samePasswords = t('PASSWORDS_NOT_IDENTICAL');
    }

    if (newErrors.newPassword || newErrors.confirmPassword || newErrors.samePasswords) {
      return;
    }

    try {
      setLoading(true);
      setErrors({
        newPassword: '',
        confirmPassword: '',
        samePasswords: '',
      });
      const res = await resetPassword(resetToken, newPassword, confirmPassword);
      if (res) {
        toast.success(t('PASSWORD_RESET_SUCCESS'));
      }
      console.log('here is the final process!');
    } catch (error) {
      console.log('FULL ERROR OBJECT:', error);
      console.log('RESPONSE:', error?.response);
      console.log('BODY:', error?.response?.body);

      const message = error?.message || t('PASSWORD_RESET_ERROR');
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayoutCard
      title={t('REQUEST_RESET_PASSWORD')}
      description={t('CREATE_NEW_PASSWORD')}
      showEmail={false}
      backLink="/login"
      backText=""
    >
      <div>
        <h1 className="text-red-500 my-1 text-sm">{errors.samePasswords}</h1>
      </div>
      {/* New Password */}
      <div className={`${textAlign} mb-6 `}>
        <label className="block text-sm font-medium mb-1 text-gray-700">{t('NEW_PASSWORD')}</label>

        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder={t('ENTER_NEW_PASSWORD')}
            className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-orange-400"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button
            size={16}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <HiOutlineLockClosed /> : <FaEye />}
          </button>
        </div>
        {errors.newPassword && (
          <p className="text-red-500 text-left text-sm">{errors.newPassword}</p>
        )}
      </div>

      {/* Confirm Password */}
      <div className={`${textAlign} mb-8`}>
        <label className="block text-sm font-medium mb-1 text-gray-700">
          {t('CONFIRM_PASSWORD')}
        </label>
        <div className="relative">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder={t('REPEAT_PASSWORD')}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-400"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            size={16}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
          >
            {showConfirmPassword ? <HiOutlineLockClosed /> : <FaEye />}
          </button>
        </div>

        {errors.confirmPassword && (
          <p className="text-red-500 text-left text-sm">{errors.confirmPassword}</p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-between gap-4">
        <button
          className="flex-1 py-2 rounded-sm bg-orange-500 text-white text-sm font-medium hover:bg-orange-600 transition"
          onClick={handleResetPassword}
        >
          {loading ? t('LOADING') : t('RESET_PASSWORD')}
        </button>

        <Link
          to="/login"
          className="flex-1 py-2 rounded-sm border border-orange-400 text-orange-500 text-sm font-medium text-center hover:bg-orange-50 transition"
        >
          {t('CANCEL_RESET')}
        </Link>
      </div>
    </AuthLayoutCard>
  );
};

export default ResetPassword;
