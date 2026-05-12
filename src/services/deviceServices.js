import apiClient from "../config/apiClient";
export const saveFCMToken = async (token) => {
  console.log('right now sending the fcm foken to back');

  return apiClient.post('api/devices', {
    json: {
      token,
      platform: 'web',
      deviceId: crypto.randomUUID(),
    },
  }).json();
};