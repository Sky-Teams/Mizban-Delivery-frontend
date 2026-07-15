import { useRef, useState } from 'react';
import { socket } from '../config/socket';

export function LiveLocation() {
  const [isTracking, setIsTracking] = useState(false);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const watchId = useRef(null);
  const isTrackingRef = useRef(false);

  const startTracking = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported.');
      return;
    }

    if (watchId.current !== null) return;

    console.log('Tracking started');
    isTrackingRef.current = true;
    setIsTracking(true);
    watchId.current = navigator.geolocation.watchPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log(latitude, longitude);
        setLongitude(longitude);
        setLatitude(latitude);
        socket.emit('update_location', {
          currentLocation: {
            type: 'Point',
            coordinates: [latitude, longitude],
          },
        });
      },
      (error) => {
        console.error(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: 0,
      },
    );
  };

  const stopTracking = () => {
    isTrackingRef.current = false;
    if (watchId.current !== null) {
      navigator.geolocation.clearWatch(watchId.current);
      watchId.current = null;
    }

    setIsTracking(false);
    console.log('Tracking stopped');
  };

  return (
    <div>
      <button
        style={{
          padding: '10px',
          color: 'white',
          borderRadius: '5px',
          fontSize: '18px',
          backgroundColor: isTracking ? 'red' : 'green',
        }}
        type="button"
        onClick={isTracking ? stopTracking : startTracking}
      >
        {isTracking ? 'Tracking...' : 'Start Tracking'}
      </button>

      <p>latitude: {latitude}</p>
      <p>longitude: {longitude}</p>
    </div>
  );
}
