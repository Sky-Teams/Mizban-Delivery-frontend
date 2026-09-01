import { socket } from '../config/socket';

export const sendLocation = (position) => {
  socket.emit('update_location', {
    currentLocation: {
      type: 'Point',
      coordinates: [position[0], position[1]],
    },
  });
};

export const sendDriversLiveLocationToAdmin = (drivers, setDrivers) => {
  const [latitude, longitude] = drivers.currentLocation.coordinates;

  setDrivers((prev) => {
    const exists = prev.some((driver) => driver.driverId === drivers._id);
    if (!exists) {
      return [
        ...prev,
        {
          driverId: drivers._id,
          name: drivers.name,
          email: drivers.email,
          phone: drivers.phone,
          vehicleType: drivers.vehicleType,
          vehicleRegistrationNumber: drivers.vehicleRegistrationNumber,
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
      driver.driverId === drivers._id
        ? {
            ...driver,
            driverId: drivers._id,
            currentLocation: {
              coordinates: [latitude, longitude],
            },
            path: [...driver.path, [latitude, longitude]],
          }
        : driver,
    );
  });
};
