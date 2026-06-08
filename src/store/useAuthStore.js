import { create } from 'zustand';
import { signup, login, logout } from '../services/authService';
import i18n from '../i18n';
import { getServerMessage } from '../utils/i18nHelper';
import { updateSocket } from '../utils/updateSocket';
import { registerFirebase } from '../utils/registerFirebase';

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

  accessToken: null,

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
  setUser: (user) => {
    set({ user });
    localStorage.setItem('user', JSON.stringify(user));
  },

  setAccessToken: (token) => set({ accessToken: token }),

  hasError: (field) => {
    const { errors } = get();
    return !!errors[field];
  },

  // Signup validation
  validateSignup: () => {
    const { form } = get();
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = i18n.t('NAME_REQUIRED');

    if (!form.email.trim()) newErrors.email = i18n.t('EMAIL_REQUIRED');
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = i18n.t('EMAIL_INVALID');

    if (!form.password) newErrors.password = i18n.t('PASSWORD_REQUIRED');

    if (!form.confirmPassword) newErrors.confirmPassword = i18n.t('CONFIRM_PASSWORD_REQUIRED');

    if (form.password && form.confirmPassword && form.password !== form.confirmPassword) {
      newErrors.confirmPassword = i18n.t('PASSWORD_DO_NOT_MATCH');
    }

    if (!form.phone) newErrors.phone = i18n.t('PHONE_REQUIRED');
    else if (!/^7\d{8}$/.test(form.phone)) newErrors.phone = i18n.t('PHONE_INVALID');

    return newErrors;
  },

  // Signup
  signupUser: async () => {
    const { form, validateSignup, setErrors, setLoading } = get();

    const validationErrors = validateSignup();

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
      const { name, email, password, phone } = form;
      const data = await signup({ name, email, password, phone });
      await registerFirebase();

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
        general: errorMessage || i18n.t('signupFailed'),
      });

      return {
        success: false,
        message: errorMessage || i18n.t('signupFailed'),
      };
    } finally {
      setLoading(false);
    }
  },

  // Login Validation
  validateLogin: () => {
    const { form } = get();
    const newErrors = {};

    if (!form.email.trim()) newErrors.email = i18n.t('EMAIL_REQUIRED');
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = i18n.t('EMAIL_INVALID');
    if (!form.password) newErrors.password = i18n.t('PASSWORD_REQUIRED');
    else if (form.password.length < 8) newErrors.password = i18n.t('PASSWORD_TOO_SHORT');

    return newErrors;
  },

  // Login
  loginUser: async () => {
    const { form, validateLogin, setErrors, setLoading, setUser, resetForm, setAccessToken } =
      get();

    const validationErrors = validateLogin();

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
        const user = {
          id: response.data.id,
          email: response.data.email,
          role: response.data.role,
        };

        const token = response.data.token;

        setUser(user);
        setAccessToken(token);

        resetForm();
        updateSocket(token);
        await registerFirebase();

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
  logout: async () => {
    const deviceId = localStorage.getItem('deviceId');

    set({ user: null, accessToken: null });
    updateSocket(null);

    localStorage.removeItem('user');
    localStorage.removeItem('i18nextLng');
    localStorage.removeItem('theme');
    localStorage.removeItem('fcmToken');

    await logout(deviceId);
  },
}));

export default useAuthStore;
