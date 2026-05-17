import { notificationListener } from '../services/listener/notificationListener';
import { firebaseListener } from '../services/listener/firebaseListener';
import { generateFCMToken } from '../config/firebase';
import { registerDevice } from '../services/deviceServices';

export const registerFirebase = async () => {
  try {
    firebaseListener();

    const fcmToken = await generateFCMToken();

    if (!fcmToken) return;

    await registerDevice({
      fcmToken,
      platform: 'web',
      deviceId: Date.now().toString(),
    });
  } catch (error) {
    console.log('firebase setup error', error);
  }
};

