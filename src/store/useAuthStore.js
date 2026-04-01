import {create} from 'zustand';
import {signup, login} from '../services/authService';
import i18n from '../i18n';
import {getServerMessage} from '../utils/i18nHelper';

const  useAuthStore=create((set,get) => ({
    // form fields
    form:{
        name:"",
        email:"",
        password:"",
        confirmPassword:"",
        phone:"",
    },

    // error messages
    errors:{},

    // loading state
    loading:false,


    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem('token') || null,

      // set single field
      setField: (field,value)=>
        set((state)=>({
            form:{...state.form, [field]:value}
        })),

        // set multiple errors
        setErrors:(errors) => set({errors}),

        // reset form
        resetForm:()=>
            set({
                form :{
                    name:"",
                    email:"",
                    password:"",
                    confirmPassword:"",
                    phone:""
                },
                errors:{}
            }),

        // set Loading
        setLoading:(loading) => set({loading}),  

        //
        setUser: (user,token)=>{
            set({user,token});
            localStorage.setItem('user',JSON.stringify(user));
            localStorage.setItem('token',token);
        },

        // Signup validation
        validateSignup: () => {
            const { form } = get();
            const newErrors = {};

            if (!form.name.trim()) newErrors.name = i18n.t("nameRequired");

            if (!form.email.trim()) newErrors.email = i18n.t('emailRequired');
            else if (!/\S+@\S+\.\S+/.test(form.email))
            newErrors.email = i18n.t('emailInvalid');

            if (!form.password) newErrors.password =i18n.t('passwordRequired');
           
            if(!form.confirmPassword) 
                newErrors.confirmPassword =i18n.t('confirmPasswordRequired');

            if(form.password && form.confirmPassword && 
                form.password !== form.confirmPassword){
                    newErrors.confirmPassword=i18n.t('passwordsDoNotMatch');
            }

            if (!form.phone) newErrors.phone = i18n.t('phoneRequired')
            else if (!/^7\d{8}$/.test(form.phone))
               newErrors.phone = i18n.t('phoneInvalid');

            return newErrors;
        },

         // submit signup
        signupUser: async (navigate, toast) => {
            const { form, validateSignup, setErrors, setLoading, resetForm} = get();

            const validationErrors = validateSignup();

            if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
            }

            setErrors({});
            setLoading(true);

            try {
            const {name, email, password, phone} = form;    
            const data = await signup({name, email,password,phone});

            toast.dismiss();
            toast.success(getServerMessage(data));

            resetForm();
            navigate("/");

            } catch (err) {
            toast.dismiss();

            let errorMessage;
            if(err.name === "HTTPError"){
                const errorData = await err.response.json().catch(()=>({message:err.message}));
                errorMessage= getServerMessage(errorData);
            }else{
                errorMessage=err.message;
            }
            toast.error(errorMessage || i18n.t('signupFailed'));
        } 
            finally {
            setLoading(false);
            }
        },


        // Login Validation
        validateLogin: ()=>{
           const {form} = get();
           const newErrors={};

           if(!form.email.trim()) newErrors.email= i18n.t("emailRequired");
           else if(!/\S+@\S+\.\S+/.test(form.email))
            newErrors.email=i18n.t("emailInvalid");
           if(!form.password) newErrors.password=i18n.t("passwordRequired");
           else if (form.password.length < 8) 
            newErrors.password = i18n.t("passwordTooShort");
        
           return newErrors;
        },

        // Login Submit
        loginUser: async(navigate,toast)=>{

            const {form,validateLogin, setErrors, setLoading,setUser,resetForm} = get();

            const validationErrors = validateLogin();

            if(Object.keys(validationErrors).length > 0){
                setErrors(validationErrors);
                return;
            }

            setErrors({});
            setLoading(true);

            try{
                const {email , password} = form;
                
                const response = await login({email,password});
                

                toast.dismiss();
               if (response.success) {
                    toast.success(i18n.t('welcomeAgain'));

                    const user= response.data || {email};
                    const token=response.data?.token || response.token;
                    setUser(user, token);
                
                     resetForm();
                     navigate("/");
                } else {
                    toast.error(getServerMessage(response) || i18n.t('loginFailed'));
                }
               
            }catch(err) {
                toast.dismiss();

                let errorMessage;

                if (err.name === 'HTTPError') {
                    const errorData = await err.response.json().catch(() => ({ message: err.message }));
                    errorMessage = getServerMessage(errorData);
                } else {
                    errorMessage = getServerMessage({ message: err.message });
                }

                toast.error(errorMessage || i18n.t('loginFailed')); 
            }finally{
                setLoading(false);
            }
        },

        // Logout
        logout:(navigate)=>{
            set({user:null,token:null});
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            navigate('/login');
        }


}));


export default useAuthStore;