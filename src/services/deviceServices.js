import apiClient from '../config/apiClient';

export const registerDevice = async (deviceData) => {
  return apiClient
    .post('devices', {
      json: deviceData,
    })
    .json();
};