import {create} from 'zustand';


const  useAuthStore=create((set) => ({
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
        setLoading:(loading) => set({loading})    



}))

export default useAuthStore;