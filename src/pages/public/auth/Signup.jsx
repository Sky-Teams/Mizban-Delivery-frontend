import { useState, useEffect } from 'react';
import useAuthStore from '../../../store/useAuthStore';
import courier from '../../../assets/png/courier1.png';
import logo from '../../../assets/png/logo.png';
import { isRTL } from '../../../utils/i18nHelper';
import {
  HiOutlineUser,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeOff,
  HiOutlineChevronDown,
} from 'react-icons/hi';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getPasswordRules, isPasswordValid } from '../../../utils/passwordRules';

const Signup = () => {
  const form = useAuthStore((state) => state.form);
  const errors = useAuthStore((state) => state.errors);
  const loading = useAuthStore((state) => state.loading);
  const setField = useAuthStore((state) => state.setField);
  const setErrors = useAuthStore((state) => state.setErrors);
  const signupUser = useAuthStore((state) => state.signupUser);
  const resetForm = useAuthStore((state) => state.resetForm);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const navigate = useNavigate();

  const { t } = useTranslation();

  const rtl = isRTL();

  const iconPosition = rtl ? 'right-3' : 'left-3';
  const inputPadding = rtl ? 'pr-10 pl-4' : 'pl-10 pr-4';

  useEffect(() => {
    resetForm();
  }, []);

  const passwordRules = getPasswordRules(form.password);

  const allPasswordValid = isPasswordValid(form.password);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setField(name, value);

    // remove error when user types
    setErrors({ ...errors, [name]: '', general: '' });
  };

  // handle Numeric Phone Input
  const handleNumericPhoneInput = (e) => {
    const onlyNumbers = e.target.value;

    setField('phone', onlyNumbers);

    setErrors({
      ...errors,
      phone: '',
      general: '',
    });
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await signupUser();

    if (result?.success) {
      toast.success(result.message);
      navigate('/');
    } else if (result?.type !== 'validation') {
      toast.error(result?.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-8 bg-gray-50">
      <img
        src={courier}
        alt="delivery"
        className="block absolute -bottom-2 left-0 w-36 md:w-52 lg:w-64"
      />

      {/* Card */}
      <div className="bg-white w-full max-w-md rounded-2xl shadow-md px-5 sm:px-8 py-8 sm:py-10 relative z-10">
        {/* Header */}
        <div className="text-center mb-5 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold leading-tight flex items-center justify-center ">
            {t('WELCOME_AFTER_SIGNUP')}
            <img
              src={logo}
              alt="MizbanDelivery"
              className="h-8 sm:h-12 md:h-16 w-auto object-contain"
            />
          </h2>
          <p className="text-center text-gray-700  text-xs sm:text-sm font-medium leading-5">
            {t('DESCRIPTION')}
          </p>
          <p className="text-red-500 text-xs min-h-4">{errors.general ? t(errors.general) : ''}</p>
        </div>
        {/* Form */}
        <form className="mt-6 sm:mt-8 space-y-3" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm">
              {t('FULL_NAME_LABEL')}
            </label>

            <div className="relative">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder={t('FULL_NAME_PLACEHOLDER')}
                className={`w-full h-9 sm:h-10 border rounded-md text-sm focus:outline-none focus:ring-2 ${inputPadding}
                 ${errors.name ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-orange-400'}`}
              />
              <HiOutlineUser
                className={`absolute top-1/2 -translate-y-1/2 text-gray-500 ${iconPosition} ${errors.general ? 'text-red-500' : ''}`}
                size={18}
              />
            </div>
            {errors.name && <p className="text-red-500 text-xs mt-0.5">{t(errors.name)}</p>}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm">{t('PHONE')}</label>

            <div className="relative">
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleNumericPhoneInput}
                placeholder={t('PHONE_PLACEHOLDER')}
                className={`w-full h-9 sm:h-10 border rounded-md text-sm focus:outline-none focus:ring-2
                ${inputPadding}
                ${errors.phone ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-orange-400'}
              `}
              />

              <HiOutlinePhone
                className={`absolute top-1/2 -translate-y-1/2 text-gray-500 ${iconPosition} ${errors.general ? 'text-red-500' : ''}`}
                size={18}
              />
            </div>

            {errors.phone && <p className="text-red-500 text-xs mt-0.5">{t(errors.phone)}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm">{t('EMAIL')}</label>

            <div className="relative">
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder={t('EMAIL_PLACEHOLDER')}
                className={`w-full h-9 sm:h-10 border rounded-md text-sm focus:outline-none focus:ring-2 ${inputPadding}
                ${errors.email ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-orange-400'}
              `}
              />
              <HiOutlineMail
                className={`absolute top-1/2 -translate-y-1/2 ${iconPosition} ${errors.general ? 'text-red-500' : 'text-gray-500'}`}
                size={18}
              />
            </div>
            {errors.email && <p className="text-red-500 text-xs mt-0.5">{t(errors.email)}</p>}
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-gray-700 font-semibold mb-2 text-sm">
              {t('PASSWORD')}
            </label>

            <div className="relative">
              {form.password ? (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute top-1/2 -translate-y-1/2 cursor-pointer ${iconPosition} text-gray-500 `}
                >
                  {showPassword ? (
                    <HiOutlineEyeOff size={18} strokeWidth={1.5} />
                  ) : (
                    <HiOutlineEye size={18} strokeWidth={1.5} />
                  )}
                </button>
              ) : (
                <HiOutlineLockClosed
                  className={`absolute top-1/2 -translate-y-1/2 text-gray-500 ${iconPosition} ${errors.general ? 'text-red-500' : ''}`}
                  size={18}
                />
              )}
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder={t('PASSWORD_PLACEHOLDER')}
                className={`w-full h-9 sm:h-10 border rounded-md px-4 text-sm focus:outline-none focus:ring-2 ${inputPadding}
                 ${errors.password ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-orange-400'}`}
              />
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-0.5">{t(errors.password)}</p>}

            {/* Responsive Tooltip */}
            {form.password && !allPasswordValid && (
              <div
                className="
                mt-3 sm:absolute sm:left-full sm:ml-4 sm:top-8
                bg-white shadow-lg rounded-lg border p-3 w-full sm:w-56 text-xs space-y-2 z-20
              "
              >
                <div className="flex items-center gap-2">
                  {passwordRules.length ? (
                    <FiCheckCircle className="text-green-500" />
                  ) : (
                    <FiXCircle className="text-red-500" />
                  )}
                  {t('PASSWORD_RULES_LENGTH')}
                </div>

                <div className="flex items-center gap-2">
                  {passwordRules.uppercase ? (
                    <FiCheckCircle className="text-green-500" />
                  ) : (
                    <FiXCircle className="text-red-500" />
                  )}
                  {t('PASSWORD_RULES_UPPERCASE')}
                </div>

                <div className="flex items-center gap-2">
                  {passwordRules.special ? (
                    <FiCheckCircle className="text-green-500" />
                  ) : (
                    <FiXCircle className="text-red-500" />
                  )}
                  {t('PASSWORD_RULES_SPECIAL')}
                </div>

                <div className="flex items-center gap-2">
                  {passwordRules.number ? (
                    <FiCheckCircle className="text-green-500" />
                  ) : (
                    <FiXCircle className="text-red-500" />
                  )}
                  {t('PASSWORD_RULES_NUMBER')}
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm">
              {t('CONFIRM_PASSWORD')}
            </label>

            <div className="relative">
              {form.confirmPassword ? (
                <button
                  type="button"
                  onClick={() => setShowConfirmPass(!showConfirmPass)}
                  className={`absolute top-1/2 -translate-y-1/2 cursor-pointer ${iconPosition} text-gray-500 `}
                >
                  {showConfirmPass ? (
                    <HiOutlineEyeOff size={18} strokeWidth={1.5} />
                  ) : (
                    <HiOutlineEye size={18} strokeWidth={1.5} />
                  )}
                </button>
              ) : (
                <HiOutlineLockClosed
                  className={`absolute top-1/2 -translate-y-1/2 text-gray-500 ${iconPosition} ${errors.general ? 'text-red-500' : ''}`}
                  size={18}
                />
              )}
              <input
                type={showConfirmPass ? 'text' : 'password'}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder={t('CONFIRM_PASSWORD_PLACEHOLDER')}
                className={`w-full h-9 sm:h-10 border rounded-md text-sm focus:outline-none focus:ring-2 ${inputPadding}
                ${errors.confirmPassword ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-orange-400'}
                `}
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-0.5">{t(errors.confirmPassword)}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-9 sm:h-10 bg-orange-500 hover:bg-orange-600 text-white mt-1 sm:mt-2 font-semibold rounded-md transition text-sm sm:text-base cursor-pointer"
          >
            {loading ? t('CREATING') : t('SIGNUP')}
          </button>

          {/* Footer */}
          <p className="text-center text-xs sm:text-sm text-gray-700">
            {t('PRIVACY_TEXT')}{' '}
            <span className="text-orange-500 underline cursor-pointer">{t('PRIVACY_POLICY')}</span>
          </p>

          <p className="text-center text-xs sm:text-sm text-gray-700 pt-2">
            {t('ALREADY_HAVE_AN_ACCOUNT')}{' '}
            <Link to="/login" className="text-orange-500 underline">
              {t('login')}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
