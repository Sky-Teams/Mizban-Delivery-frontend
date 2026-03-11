import {create} from 'zustand';
import {signup} from '../services/authService';

const  useAuthStore=create((set,get) => ({
    // form fields
    form:{
        name:"",
        email:"",
        password:"",
        phone:"",
    },

    // error messages
    errors:{},

    // loading state
    loading:false,

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
                    phone:""
                },
                errors:{}
            }),

        // set Loading
        setLoading:(loading) => set({loading}),  


         // validation
        validate: () => {
            const { form } = get();
            const newErrors = {};

            if (!form.name.trim()) newErrors.name = "Name is required";

            if (!form.email.trim()) newErrors.email = "Email is required";
            else if (!/\S+@\S+\.\S+/.test(form.email))
            newErrors.email = "Email is invalid";

            if (!form.password) newErrors.password = "Password is required";
            else if (form.password.length < 6)
            newErrors.password = "Password must be at least 6 characters";

            if (!form.phone) newErrors.phone = "Phone is required";

            return newErrors;
        },

         // submit signup
        signupUser: async (navigate, toast) => {
            const { form, validate, setErrors, setLoading, resetForm } = get();

            const validationErrors = validate();

            if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
            }

            setErrors({});
            setLoading(true);

            try {
            const data = await signup(form);

            toast.dismiss();
            toast.success(data.message);

            resetForm();

            navigate("/");
            } catch (err) {
            toast.dismiss();

            if (err.message) {
                toast.error(err.message);
            } else {
                toast.error("Signup failed. Please try again.");
            }
            } finally {
            setLoading(false);
            }
        },


}));


export default useAuthStore;