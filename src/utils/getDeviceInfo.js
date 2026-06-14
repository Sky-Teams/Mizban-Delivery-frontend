export const getDeviceInfo = () => {
  let deviceId = localStorage.getItem('deviceId');

  if (!deviceId) {
    deviceId = `${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
    localStorage.setItem('deviceId', deviceId);
  }

  return {
    deviceId,
    platform: 'web',
    fcmToken: localStorage.getItem('fcmToken'),
  };
};
