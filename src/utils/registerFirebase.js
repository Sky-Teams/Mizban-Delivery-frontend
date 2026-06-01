import { generateFCMToken } from '../config/firebase';
import { registerDevice } from '../services/deviceServices';
import { getDeviceInfo } from './getDeviceInfo';

export const registerFirebase = async () => {
  try {
    const fcmToken = await generateFCMToken();

    if (!fcmToken) return;

    const deviceInfo = getDeviceInfo();

    await registerDevice({
      ...deviceInfo,
      fcmToken: fcmToken.token,
    });
    console.log('SW REGISTER CALLED');
  } catch (error) {
    console.error(error);
  }
};
