
import {useState} from 'react';
import {useNavigate,Link} from 'react-router-dom';
import useAuthStore from '../../../store/useAuthStore';
import courier from '../../../assets/png/courier1.png';
import {
  HiOutlineUser,
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeOff,
  HiOutlineChevronDown,
} from "react-icons/hi";
import toast from 'react-hot-toast';
import {useTranslation} from 'react-i18next';


const Login = () => {
    const form = useAuthStore(state => state.form);
    const errors = useAuthStore ( state => state.errors);
    const loading =useAuthStore ( state => state.loading);
    const setField = useAuthStore (state => state.setField);
    const setErrors = useAuthStore ( state => state.setErrors);
    const loginUser = useAuthStore ( state => state.loginUser);

    const [showPassword,setShowPassword]=useState(false);
    const navigate= useNavigate();

    const {t,i18n} =useTranslation();

    const isRTL = i18n.language === 'en';
    const iconPosition = isRTL ? 'right-3' : 'left-3';
    const inputPadding = isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4';


    const handleChange=(e)=>{
        const {name,value}=e.target;
        setField(name,value);

        if(errors[name]){
            setErrors({
                ...errors,
                [name]:""
            });
        }
    };

    const handleSubmit = (e) =>{
        e.preventDefault();
        loginUser(navigate,toast);
    }
return (
    <div className="min-h-screen flex items-center justify-center relative px-4 py-6 bg-gray-50 overflow-hidden">

      {/* Image */}
      <img
        src={courier}
        alt="delivery"
        className="
          absolute bottom-0 left-0
          w-24 sm:w-32 md:w-44 lg:w-52
          opacity-90
          pointer-events-none
        "
      />

      {/* Card */}
      <div className="
        bg-white shadow-lg rounded-xl
        w-full max-w-md
        p-5 sm:p-6 md:p-8
        z-10
      ">

        {/* Header */}
        <div className="text-center mb-5 sm:mb-6">
          <div className="w-14 sm:w-16 h-[2px] bg-orange-400 mx-auto mb-3 sm:mb-4"></div>

          <h2 className="text-xl sm:text-2xl font-bold leading-tight">
            {t('welcome')}{" "}
            <span className="text-orange-500 italic">
              MizbanDelivery
            </span>
          </h2>

          <p className="text-gray-600 mt-2 text-xs sm:text-sm">
            {t('smartPartner')}
          </p>
        </div>

        {/* General Error */}
        {errors.general && (
          <p className="text-red-500 text-xs sm:text-sm text-center mb-4">
            {errors.general}
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          dir={i18n.language === 'en' ? 'ltr' : 'rtl'}
        >

          {/* Email */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              {t('email')}
            </label>

            <div className="relative">
              <HiOutlineMail className={`absolute ${iconPosition} top-1/2 -translate-y-1/2 text-gray-500 ${errors.email ? 'text-red-500' : 'text-gray-500'}`}/>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder={t('enterEmail')}
                className={`w-full border rounded-md py-2.5 text-sm focus:outline-none focus:ring-1 ${inputPadding}
                ${
                  errors.email
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-orange-400"
                }`}
              />
            </div>

            <p className="text-red-500 text-xs pt-1">{t(errors.email)}</p>
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
                  className={`absolute top-1/2 -translate-y-1/2 text-gray-500 ${iconPosition} ${errors.password ? 'text-red-500' : 'text-gray-500'}`}
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
                ${errors.password ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-orange-400'}`}
              />
              
              </div>
              {errors.password && (
              <p className="text-red-500 text-xs mt-0.5">{t(errors.password)}</p>
            )}
          </div>
          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 rounded-md text-white text-sm sm:text-base font-medium transition cursor-pointer
            ${
              loading
                ? "bg-orange-400 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600"
            }`}
          >
            {loading ? t("signingIn") : t("login")}
          </button>

          {/* Links */}
          <div className="text-center text-xs sm:text-sm">
            <p>
              {t('forgotPassword')}{" "}
              <button type="button" className="underline">
                {t('requestNewPassword')}
              </button>
            </p>
          </div>

          <div className="text-center text-xs sm:text-sm pt-2">
            {t('newHere')}{" "}
            <Link to="/signup" className="underline">
              {t('createAccount')}
            </Link>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Login;
