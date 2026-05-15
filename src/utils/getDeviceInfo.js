export const getDeviceInfo = () => {
  let deviceId = localStorage.getItem('deviceId');

  if (!deviceId) {
    deviceId = Date.now();
    localStorage.setItem('deviceId', deviceId);
  }

  return {
    deviceId,
    platform: 'web',
  };
};
