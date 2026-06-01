import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import { getMessaging, getToken } from 'firebase/messaging';
import toast from 'react-hot-toast';
import i18n from '../i18n';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

// initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app); // can keep this
export const messaging = getMessaging(app); // cloud instance

export const generateFCMToken = async () => {
  try {
    const permission = await Notification.requestPermission();

    if (permission !== 'granted') {
      setTimeout(() => {
        toast.error(i18n.t('BROWSER_NOTIFICATIONS_BANNED'));
      }, 3000);

      return null;
    }

    const registration =
      (await navigator.serviceWorker.getRegistration('/firebase-messaging-sw.js')) ||
      (await navigator.serviceWorker.ready);

    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_VAPID_KEY,
      serviceWorkerRegistration: registration,
    });

    if (!token) return null;

    const oldToken = localStorage.getItem('fcmToken');

    if (oldToken !== token) {
      localStorage.setItem('fcmToken', token);

      return { token, isNew: true };
    }

    return { token, isNew: false };
  } catch (error) {
    console.log(error);
    return null;
  }
};
