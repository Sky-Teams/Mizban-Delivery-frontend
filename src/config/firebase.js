import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getMessaging, getToken } from 'firebase/messaging';

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
const analytics = getAnalytics(app); // can keep this
export const messaging = getMessaging(app); // cloud instance

export const generateFCMToken = async () => {
  const permission = await Notification.requestPermission();
  console.log(permission);

  try {
    if (permission === 'granted') {
      const token = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_VAPID_KEY,      
      });
      localStorage.setItem('fcmToken', token);
      return token;
    } else {
      throw new Error ("Premission not granted!");
    }
  } catch (error) {
    console.log(error.message);
  }
};
