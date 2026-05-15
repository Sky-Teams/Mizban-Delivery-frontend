import ky from 'ky';

const localhost = 'http://localhost:3500/api'; // I tested the branch with an unmerged branch from back #101, to check the route /api/devices

export const registerDevice = async (deviceData) => {
  return ky
    .post(`${localhost}/devices`, {
      // the route will be changes as soon as the api has the new route of devices
      json: deviceData,
    })
    .json();
};
