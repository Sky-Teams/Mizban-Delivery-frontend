import { create } from 'zustand';
import { signup, login } from '../services/authService';
import i18n from '../i18n';
import { getServerMessage } from '../utils/i18nHelper';

const useAuthStore = create((set, get) => ({
  // form fields
  form: {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  },

  // error messages
  errors: {},

  // loading state
  loading: false,

  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,

  // set single field
  setField: (field, value) =>
    set((state) => ({
      form: { ...state.form, [field]: value },
    })),

  // set multiple errors
  setErrors: (errors) => set({ errors }),

  // reset form
  resetForm: () =>
    set({
      form: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
      },
      errors: {},
    }),

  // set Loading
  setLoading: (loading) => set({ loading }),

  //
  setUser: (user, token) => {
    set({ user, token });
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
  },

  // Signup validation
  validateSignup: () => {
    const { form } = get();
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = i18n.t('NAME_REQUIRED');

    if (!form.name.trim()) newErrors.name = 'NAME_REQUIRED';

    if (!form.email.trim()) newErrors.email = 'EMAIL_REQUIRED';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = i18n.t('EMAIL_INVALID');

    if (!form.password) newErrors.password = 'PASSWORD_REQUIRED';

    if (!form.confirmPassword) newErrors.confirmPassword = 'CONFIRM_PASSWORD_REQUIRED';

    if (form.password && form.confirmPassword && form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'PASSWORDS_DO_NOT_MUCH';
    }

    if (!form.phone) newErrors.phone = 'PHONE_REQURED';
    else if (!/^7\d{8}$/.test(form.phone)) newErrors.phone = 'PHONE_INVALID';
    return newErrors;
  },

  // submit signup
  signupUser: async () => {
    const { form, validateSignup, setErrors, setLoading, resetForm } = get();

    const validationErrors = validateSignup();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return {
        success: false,
        type: 'validation',
      };
    }
    console.log('setErrors: ', setErrors);

    setErrors({});
    setLoading(true);

    try {
      const { name, email, password, phone } = form;
      const data = await signup({ name, email, password, phone });

      resetForm();

      return {
        success: true,
        message: getServerMessage(data),
        data,
      };
    } catch (err) {
      let errorMessage;
      if (err.name === 'HTTPError') {
        const errorData = await err.response.json().catch(() => ({ message: err.message }));
        errorMessage = getServerMessage(errorData);
      } else {
        errorMessage = err.message;
      }

      setErrors({
        general: errorMessage || i18n.t('SIGNUP_FAILED'),
      });

      return {
        success: false,
        message: errorMessage || i18n.t('SIGNUP_FAILED'),
      };
    } finally {
      setLoading(false);
    }
  },

  // Login Submit
  loginUser: async () => {
    const { form, validateLogin, setErrors, setLoading, setUser, resetForm } = get();

    setErrors({});
    setLoading(true);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return {
        success: false,
        type: 'validation',
      };
    }
    setErrors({});
    setLoading(true);

    try {
      const { email, password } = form;
      const response = await login({ email, password });

      if (response.success) {
        const user = response.data || { email };
        const token = response.data?.token || response.token;
        setUser(user, token);
        resetForm();
        return {
          success: true,
          data: user,
        };
      } else {
        return {
          success: false,
          message: getServerMessage(response),
        };
      }
    } catch (err) {
      let errorMessage;
      if (err.name === 'HTTPError') {
        const errorData = await err.response.json().catch(() => ({ message: err.message }));
        errorMessage = getServerMessage(errorData);
      } else {
        errorMessage = getServerMessage({ message: err.message });
      }
      setErrors({
        general: errorMessage,
      });
      return {
        success: false,
        message: errorMessage,
      };
    } finally {
      setLoading(false);
    }
  },

  // Logout
  logout: (navigate) => {
    set({ user: null, token: null });
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  },

  hasError: (field) => {
    const { errors } = get();
    return !!errors[field] || !!errors.general;
  },
}));

export default useAuthStore;
