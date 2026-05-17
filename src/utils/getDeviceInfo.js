export const getDeviceInfo = () => {
  let deviceId = localStorage.getItem('deviceId');

  if (!deviceId) {
    deviceId = Date.now().toString();

    localStorage.setItem('deviceId', deviceId);
  }

  return {
    deviceId,
    platform: 'web',
    fcmToken: localStorage.getItem('fcmToken'),
  };
};