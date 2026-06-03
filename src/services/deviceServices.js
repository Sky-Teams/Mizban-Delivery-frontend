import apiClient from '../config/apiClient';

export const registerDevice = async (deviceData) => {
  try {
    return await apiClient
      .post('devices', {
        json: deviceData,
      })
      .json();
  } catch (error) {
    const message = error?.response ? await error.response.json() : error.message;
    console.error(message);
    throw error;
  }
};
