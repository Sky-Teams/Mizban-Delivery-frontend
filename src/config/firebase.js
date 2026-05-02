import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getMessaging, getToken } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: 'AIzaSyCG_bRFXu4h07tupjcg-FjBeDE8lDXGQbg',
  authDomain: 'delivery-system-ae552.firebaseapp.com',
  projectId: 'delivery-system-ae552',
  storageBucket: 'delivery-system-ae552.firebasestorage.app',
  messagingSenderId: '673551112755',
  appId: '1:673551112755:web:5e0a369f970138283a2146',
  measurementId: 'G-DWCY6GYHDT',
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
        vapidKey:
          'BJBslD2od-ggc7nnuRf0yxBlwgxXoYnZIGl6GYC_rCL6gbgo2T92aREhoe_s-426sKDk_N4-uE_zLahdmbSbsyo',
      });
      localStorage.setItem('fcmToken', token);
      return token;
    }
  } catch (error) {
    console.log(error.message);
  }
};
