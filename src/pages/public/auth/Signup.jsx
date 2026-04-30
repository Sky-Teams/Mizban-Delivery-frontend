import { useState,useEffect } from "react";
import useAuthStore from "../../../store/useAuthStore";
import courier from '../../../assets/png/courier1.png';
import logo from '../../../assets/png/logo.png';
import {isRTL} from '../../../utils/i18nHelper'
import {
  HiOutlineUser,
  HiOutlineMail,
  HiOutlinePhone ,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeOff,
  HiOutlineChevronDown,
} from "react-icons/hi";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import {useTranslation} from 'react-i18next';
import { ROUTE_PATHS } from "../../../routes/routePaths";
import { getPasswordRules, isPasswordValid } from '../../../utils/passwordRules';


const Signup = () => {

  const form =useAuthStore((state)=>state.form);
  const errors = useAuthStore(state=> state.errors);
  const loading = useAuthStore ( state => state.loading);
  const setField = useAuthStore (state => state.setField);
  const setErrors = useAuthStore ( state => state.setErrors);
  const signupUser = useAuthStore ( state => state.signupUser);
  const resetForm = useAuthStore (state =>state.resetForm);
  const hasError = useAuthStore(state => state.hasError);


  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const navigate = useNavigate();


  const {t,i18n} =useTranslation();

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
    setErrors({ ...errors, [name]: "", general: "" });
  };

  // handle Numeric Phone Input
  const handleNumericPhoneInput = (e) => {
    const onlyNumbers = e.target.value.replace(/\D/g, "");

    let errorMsg = "";
    if (onlyNumbers.length > 9) {
      errorMsg = "Phone number cannot exceed 9 digits";
    } else if (onlyNumbers && onlyNumbers[0] !== "7") {
      errorMsg = "The phone number must start with 7";
    }

    const slicedNumber = onlyNumbers.slice(0, 9);
    setField("phone", slicedNumber);

      setErrors({
      ...errors,
      phone: errorMsg,
      general: ""
    });
  };


  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await signupUser();

    if(result?.success){
      toast.success(result.message);
      navigate('/');
    }else if(result?.type !=='validation'){
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
              {t('welcome')}
              <img
                src={logo}
                alt="MizbanDelivery"
                className="h-8 sm:h-12 md:h-16 w-auto object-contain"
              />
            </h2>
            <p className="text-center text-gray-700  text-xs sm:text-sm font-medium leading-5">
              {t('description')}
            </p>  
             <p className="text-red-500 text-xs min-h-4">
            {errors.general ? t(errors.general) : ""}
          </p>
        </div>
        {/* Form */}
        <form className="mt-6 sm:mt-8 space-y-3" onSubmit={handleSubmit}>

          {/* Full Name */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm">
           {t('fullName')}
            </label>

            <div className="relative">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder={t('fullNamePlaceholder')}
                 className={`w-full h-9 sm:h-10 border rounded-md text-sm focus:outline-none focus:ring-2 ${inputPadding}
                 ${hasError('name') ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-orange-400'}`}
              />
              <HiOutlineUser
                className={`absolute top-1/2 -translate-y-1/2 text-gray-500 ${iconPosition} ${errors.general? 'text-red-500' : ''}`}
                size={18}
    />     
            </div>
             {errors.name && (
              <p className="text-red-500 text-xs mt-0.5">{t(errors.name)}</p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm">
              {t("phone")}
            </label>

            <div className="relative">
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleNumericPhoneInput}
                placeholder={t("phonePlaceholder")}
                className={`w-full h-9 sm:h-10 border rounded-md text-sm focus:outline-none focus:ring-2
                ${inputPadding}
                ${hasError('phone') ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-orange-400'}
              `}
              />

              <HiOutlinePhone
              className={`absolute top-1/2 -translate-y-1/2 text-gray-500 ${iconPosition} ${errors.general? 'text-red-500' : ''}`}
              size={18}
            />
            </div>

            {errors.phone && (
              <p className="text-red-500 text-xs mt-0.5">{t(errors.phone)}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm">
              {t('email')}
            </label>

            <div className="relative">
              
                
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder={t('emailPlaceholder')}
                className={`w-full h-9 sm:h-10 border rounded-md text-sm focus:outline-none focus:ring-2 ${inputPadding}
                ${hasError('email') ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-orange-400'}
              `}
              />
             <HiOutlineMail
              className={`absolute top-1/2 -translate-y-1/2 ${iconPosition} ${errors.general? 'text-red-500' : 'text-gray-500'}`}
              size={18}
            />

            </div>
             {errors.email && (
              <p className="text-red-500 text-xs mt-0.5">{t(errors.email)}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative">

            <label className="block text-gray-700 font-semibold mb-2 text-sm">
              {t('password')}
            </label>

            <div className="relative">
               {form.password ? (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute top-1/2 -translate-y-1/2 cursor-pointer ${iconPosition} text-gray-500 `}
                >
                  {showPassword ? <HiOutlineEyeOff size={18} strokeWidth={1.5} /> : <HiOutlineEye size={18} strokeWidth={1.5} />}
                </button>
              ) : (
                <HiOutlineLockClosed
                  className={`absolute top-1/2 -translate-y-1/2 text-gray-500 ${iconPosition} ${errors.general? 'text-red-500' : ''}`}
                  size={18}
                />
              )}
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder={t('passwordPlaceholder')}
                 className={`w-full h-9 sm:h-10 border rounded-md px-4 text-sm focus:outline-none focus:ring-2 ${inputPadding}
                 ${hasError('password') ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-orange-400'}`}
              />
              
              </div>
               {errors.password && (
              <p className="text-red-500 text-xs mt-0.5">{t(errors.password)}</p>
            )}

            {/* Responsive Tooltip */}
            {form.password &&  !allPasswordValid &&(
              <div className="
                mt-3 sm:absolute sm:left-full sm:ml-4 sm:top-8
                bg-white shadow-lg rounded-lg border p-3 w-full sm:w-56 text-xs space-y-2 z-20
              ">
                <div className="flex items-center gap-2">
                  {passwordRules.length ? (
                    <FiCheckCircle className="text-green-500" />
                  ) : (
                    <FiXCircle className="text-red-500" />
                  )}
                  {t('passwordRules.length')}
                </div>

                <div className="flex items-center gap-2">
                  {passwordRules.uppercase ? (
                    <FiCheckCircle className="text-green-500" />
                  ) : (
                    <FiXCircle className="text-red-500" />
                  )}
                  {t('passwordRules.uppercase')}
                </div>

                <div className="flex items-center gap-2">
                  {passwordRules.special ? (
                    <FiCheckCircle className="text-green-500" />
                  ) : (
                    <FiXCircle className="text-red-500" />
                  )}
                  {t('passwordRules.special')}
                </div>

                <div className="flex items-center gap-2">
                  {passwordRules.number ? (
                    <FiCheckCircle className="text-green-500" />
                  ) : (
                    <FiXCircle className="text-red-500" />
                  )}
                  {t('passwordRules.number')}
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm">
              {t('confirmPassword')}
            </label>

            <div className="relative">
              {form.confirmPassword ? (
                <button
                  type="button"
                  onClick={() => setShowConfirmPass(!showConfirmPass)}
                  className={`absolute top-1/2 -translate-y-1/2 cursor-pointer ${iconPosition} text-gray-500 `}
                >
                  {showConfirmPass ? <HiOutlineEyeOff size={18} strokeWidth={1.5} /> : <HiOutlineEye size={18} strokeWidth={1.5} />}
                </button>
              ) : (
                <HiOutlineLockClosed
                  className={`absolute top-1/2 -translate-y-1/2 text-gray-500 ${iconPosition} ${errors.general? 'text-red-500' : ''}`}
                  size={18}
                />
              )}
              <input
                type={showConfirmPass ? "text" : "password"}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder={t('confirmPasswordPlaceholder')}
                className={`w-full h-9 sm:h-10 border rounded-md text-sm focus:outline-none focus:ring-2 ${inputPadding}
                ${hasError("confirmPassword") ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-orange-400'}
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
            {loading ? t('creating') : t('signUp')}
          </button>

          {/* Footer */}
          <p className="text-center text-xs sm:text-sm text-gray-700">
           {t('privacyText')}{" "}
            <span className="text-orange-500 underline cursor-pointer">
             {t('privacyPolicy')}
            </span>
          </p>

          <p className="text-center text-xs sm:text-sm text-gray-700 pt-2">
            {t('alreadyHaveAccount')}{" "}
            <Link to={ROUTE_PATHS.LOGIN} className="text-orange-500 underline">
              {t('login')}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
