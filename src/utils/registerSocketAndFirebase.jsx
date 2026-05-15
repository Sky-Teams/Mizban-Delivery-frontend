import { notificationListener } from '../services/listener/notificationListener';
import { firebaseListener } from '../services/listener/firebaseListener';
import { generateFCMToken } from '../config/firebase';
import { registerDevice } from '../services/deviceServices';

export default function registerSocketAndFirebase() {
  const setupNotifications = async () => {
    try {
      notificationListener();
      firebaseListener();

      const fcmToken = await generateFCMToken();

      if (!fcmToken) return;

      await registerDevice({
        fcmToken,
        platform: 'web',
        deviceId: Date.now().toString(),
      });
    } catch (error) {
      console.log('notif system setup error', error);
    }
  };
  setupNotifications();
}
