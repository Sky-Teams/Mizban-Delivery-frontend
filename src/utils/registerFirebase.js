import { firebaseListener } from '../services/listener/firebaseListener';
import { generateFCMToken } from '../config/firebase';
import { registerDevice } from '../services/deviceServices';
import { getDeviceInfo } from './getDeviceInfo';

export const registerFirebase = async () => {
  try {
    firebaseListener();

    const fcmToken = await generateFCMToken();

    if (!fcmToken) return;

    const deviceInfo = getDeviceInfo();

    await registerDevice({
      ...deviceInfo,
      fcmToken,
    });
  } catch (error) {
    console.log(error);
  }
};
