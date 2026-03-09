
import {useState} from 'react';
import useAuthStore from '../../store/useAuthStore';
import {signup} from '../../services/authService';
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
      resetForm,
      setLoading
    }
    =useAuthStore();

    const [showPassword,setShowPassword]=useState(false);

    const navigate=useNavigate();
    // validation
    const validate=()=>{
      const newErrors={};
      
      if(!form.name.trim()) newErrors.name="Name is required";
      if(!form.email.trim()) newErrors.email="Email is required"
      else if(!/\S+@\S+\.\S+/.test(form.email)) newErrors.email="Email is invalid";
      if(!form.password) newErrors.password="Password is required";
      else if(form.password.length < 6) newErrors.password='Password must be at least 6 characters';
      if(!form.phone) newErrors.phone="Phone is required";
      return newErrors;
    }

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


    // submit
    const handleSubmit= async(e)=>{
        e.preventDefault();

        const validationErrors= validate();

        if(Object.keys(validationErrors).length > 0){
          setErrors(validationErrors);
          return;
        }

        setErrors({});
        setLoading(true);

        try{
          const data = await signup(form);
          toast.dismiss();
          toast.success(data.message);
          console.log('Signup success',data);

          resetForm();

          navigate('/');
        }catch(err){
           console.log(err);
           toast.dismiss();

           if(err.message){
            toast.error(err.message);
           }else{
             toast.error("Signup failed. Please try again.")
           }
        }finally{
           setLoading(false);
        }

    }
 

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
          </div>
             <p className={`${errors.password ? "text-red-500" : ""}  text-xs pt-1 `}>{errors.password || "\u00A0"}</p>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-gray-700 mb-1 text-sm font-bold">
                Phone
              </label>
             <div className="relative">
            <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} strokeWidth={1.5} />
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className={ `w-full pl-10 pr-4 py-1.5 md:py-2 border border-gray-300 rounded-md focus:border-white focus:outline-none focus:ring-2 focus:ring-orange-400 
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