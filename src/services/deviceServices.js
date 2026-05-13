import ky from 'ky';

const localhost = 'http://localhost:3500/api';

export const registerDevice = async (deviceData) => {
  return ky.post(`${localhost}/devices`, {
    json: deviceData,
  }).json();
};