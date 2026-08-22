import { socket } from '../config/socket';

export const sendLocation = (position) => {
  socket.emit('update_location', {
    currentLocation: {
      type: 'Point',
      coordinates: [position[0], position[1]],
    },
  });
};

export const sendDriversLiveLocationToAdmin = (location, setDrivers) => {
  const coordinates = location.data.currentLocation.coordinates;

  const [latitude, longitude] = [coordinates[0], coordinates[1]];

  setDrivers((prev) => {
    const exists = prev.some((driver) => driver.driverId === location.driverId);
    if (!exists) {
      return [
        ...prev,
        {
          driverId: location.driverId,
          currentLocation: {
            coordinates: [latitude, longitude],
          },
          initialLocation: {
            coordinates: [latitude, longitude],
          },
          path: [[latitude, longitude]],
        },
      ];
    }

    return prev.map((driver) =>
      driver.driverId === location.driverId
        ? {
            ...driver,
            driverId: location.driverId,
            currentLocation: {
              coordinates: [latitude, longitude],
            },
            path: [...driver.path, [latitude, longitude]],
          }
        : driver,
    );
  });
};
