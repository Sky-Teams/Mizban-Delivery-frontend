
import {useState} from 'react';
import useAuthStore from '../../store/useAuthStore';
import {FcGoogle} from 'react-icons/fc';
import { FiUser, FiMail, FiLock, FiPhone ,FiEye,FiEyeOff} from "react-icons/fi";
import toast from 'react-hot-toast';
import {useNavigate,Link} from 'react-router-dom';


const Signup=()=>{
    const {
      form,
      errors,
      loading,
      setField,
      setErrors,
      signupUser
    } = useAuthStore();

    const [showPassword,setShowPassword]=useState(false);
    const [showConfirmPass,setShowConfirmPass]=useState(false);

    const navigate=useNavigate();

    const passwordRules = {
      length: form.password.length >= 8,
      uppercase: /[A-Z]/.test(form.password),
      lowercase: /[a-z]/.test(form.password),
      number: /\d/.test(form.password),
    };

   

    const handleChange=(e)=>{
         const {name,value}=e.target;
         setField(name,value);

        // remove error when user types
         if(errors[name]){
          setErrors({
            ...errors,
            [name]:""
          });
         }
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

 
  setErrors({ ...errors, phone: errorMsg });
};

    // submit
   const handleSubmit = (e) => {
    e.preventDefault();
    signupUser(navigate, toast);
  };
 

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 md:px-10 w-full">
      <div className="grid md:grid-cols-2 items-center gap-6 md:gap-10 max-w-6xl w-full">

        {/* LEFT SIDE */}
        <div className="grid place-items-center relative">
          {/* Circle */}
          <img
            src="/svg/circles.svg"
            alt="circles"
            className="w-[300px] md:w-[500px] mx-auto"
          />

          {/* Phone */}
          <img
            src="/svg/phone.svg"
            alt="phone"
            className="absolute w-36 sm:w-42 md:w-52 lg:w-64 top-1/2 left-1/2 
                -translate-x-[60%] -translate-y-[40%] drop-shadow-2xl"
          />
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="max-w-md w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
            Join Us Now!!
          </h2>
          <p className="text-gray-400 mb-6 text-sm md:text-base">
            Let's Create your account
          </p>

          {/* FORM */}
          <form className="space-y-2" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {/* Name */}
              <div>
                <label className="block text-gray-700 mb-1 text-sm font-bold">
                  Name
                </label>

                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} strokeWidth={1.5}/>

                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className={`w-full pl-10 pr-4 py-1.5 md:py-2 border border-gray-300 rounded-md focus:border-white focus:outline-none focus:ring-2 focus:ring-orange-400
                    ${ errors.name ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-orange-400" }
                    `}
                  />
                  
                </div>
                <p className={`${errors.name ? "text-red-500" : ""} text-xs pt-1`}>{errors.name || '\u00A0'}</p>
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-700 mb-1 text-sm font-bold">
                  Email
                </label>
                <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} strokeWidth={1.5}/>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className={`w-full pl-10 pr-4 py-1.5 md:py-2 border border-gray-300 rounded-md focus:border-white focus:outline-none focus:ring-2 focus:ring-orange-400
                  ${
                   errors.email ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-orange-400"
                    }
                    `}
                    />
                    </div>
                   <p className={`${errors.email ? "text-red-500" : ""}  text-xs pt-1`}>{errors.email || "\u00A0"}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* Password */}

              <div>
                <label className="block text-gray-700 mb-1 text-sm font-bold">
                  Password
                </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} strokeWidth={1.5}/>
                <input
                  type={showPassword ? 'text': 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-4 py-1.5 md:py-2 border border-gray-300 rounded-md focus:border-white focus:outline-none focus:ring-2 focus:ring-orange-400 
                  ${
                  errors.password ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-orange-400"
                    }
                    `}
                />
              
                {/* Eye Icon */}
                <button
                  type="button"
                  aria-label={form.password ? "Hide password": 'Show password'}
                  onClick={()=>setShowPassword(!showPassword)}
                  disabled={!form.password}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer hover:text-gray-700"
                >
                {form.password && ( showPassword ? <FiEyeOff size={16} strokeWidth={1.5}/> : <FiEye size={16} strokeWidth={1.5}/>)}

                </button>
              {/* Tooltip*/}
              {form.password && !Object.values(passwordRules).every(Boolean) && (
              <div className="absolute left-0 top-full mt-2 w-64 bg-white text-gray-800 text-xs rounded-md p-3 shadow-md border border-gray-300 z-10">
                  <p className="mb-1 font-bold">Password must contain:</p>

                  <ul className="space-y-1">
                    <li className={`${passwordRules.length ? "text-green-600 font-medium" : "text-gray-400"}`}>
                      {passwordRules.length ? "✓" : "•"} Minimum 8 characters
                    </li>

                    <li className={`${passwordRules.uppercase ? "text-green-600 font-medium" : "text-gray-400"}`}>
                      {passwordRules.uppercase ? "✓" : "•"} One uppercase letter
                    </li>

                    <li className={`${passwordRules.lowercase ? "text-green-600 font-medium" : "text-gray-400"}`}>
                      {passwordRules.lowercase ? "✓" : "•"} One lowercase letter
                    </li>

                    <li className={`${passwordRules.number ? "text-green-600 font-medium" : "text-gray-400"}`}>
                      {passwordRules.number ? "✓" : "•"} One number
                    </li>
                  </ul>
                </div>
              )}
              
            </div>
              <p className={`${errors.password ? "text-red-500" : ""}  text-xs pt-1 `}>{errors.password || "\u00A0"}</p>
              </div>

               {/* Confirm Password */}
              <div>
                <label className="block text-gray-700 mb-1 text-sm font-bold">
                  Confirm Password
                </label>

                <div className="relative">
                  <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} strokeWidth={1.5} />

                  <input
                    type={showConfirmPass ? "text" : "password"}
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className={`w-full pl-10 pr-4 py-1.5 md:py-2 border rounded-md focus:outline-none focus:ring-2
                    ${
                      errors.confirmPassword
                        ? "border-red-500 focus:ring-red-400"
                        : "border-gray-300 focus:ring-orange-400"
                    }`}
                  />
                  {/* Eye Icon */}
                  <button
                    type="button"
                    aria-label={form.confirmpasswod? "Hide password": 'Show password'}
                    onClick={()=>setShowConfirmPass(!showConfirmPass)}
                    disabled={!form.confirmPassword}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer hover:text-gray-700"
                  >
                  {form.confirmPassword && ( showConfirmPass ? <FiEyeOff size={16} strokeWidth={1.5}/> : <FiEye size={16} strokeWidth={1.5}/>)}

                  </button>
                </div>

                <p className={`${errors.confirmPassword ? "text-red-500" : ""} text-xs pt-1`}>
                  {errors.confirmPassword || "\u00A0"}
                </p>
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-gray-700 mb-1 text-sm font-bold">
                Phone
              </label>
             <div className="relative flex items-center">
            <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} strokeWidth={1.5} />
            {/* Prefix */}
             <span className="absolute left-10 top-1/2 -translate-y-1/2 text-gray-700">+93</span>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleNumericPhoneInput}
              placeholder="Enter your phone number"
              className={ `w-full pl-20 pr-4 py-1.5 md:py-2 border border-gray-300 rounded-md focus:border-white focus:outline-none focus:ring-2 focus:ring-orange-400
              ${
              errors.phone ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-orange-400"
                }
                `}
            />
          </div>
            <p className={`${errors.phone ? "text-red-500" : ""} text-xs pt-1`}>{errors.phone || "\u00A0"}</p>
            </div>

           {/* Sign Up Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-1.5 md:py-2 text-white font-semibold rounded-md transition flex items-center justify-center gap-2
            ${
              loading
                ? "bg-orange-400 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600 cursor-pointer"
            }`}
          >
            {loading && (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            )}

            {loading ? "Creating account..." : "Sign Up"}
          </button>

            {/* Divider */}
            <div className="flex items-center gap-5">
              <div className="flex-1 h-[1px] bg-gray-200"></div>
              <span className="text-gray-400 text-sm">OR</span>
              <div className="flex-1 h-[1px] bg-gray-200"></div>
            </div>

            {/* Google Signup */}
            <button
              type="button"
              className="w-full py-1.5 md:py-2 border border-gray-300 rounded-md flex items-center justify-center gap-3 hover:bg-gray-50 cursor-pointer"
            >
              <FcGoogle size={18} />
              Continue with Google
            </button>

            <p className="text-center text-sm text-gray-400">
              Already have an account?
              <Link to="/login" className="text-orange-500 cursor-pointer ml-2" >Sign in</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}




export default Signup;