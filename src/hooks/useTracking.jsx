import { useEffect, useRef, useState } from 'react';
import { socket } from '../config/socket';
import toast from 'react-hot-toast';
import { sendLocation } from '../services/liveTracking';

export const useTracking = () => {
  const [position, setPosition] = useState(null);
  const [isTracking, setIsTracking] = useState(false);
  const intervalRef = useRef(null);
  const [path, setPath] = useState([]);
  const [isTrackingDisable, setIsTrackingDisable] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const initialPosition = [position.coords.latitude, position.coords.longitude];

        setPosition(initialPosition);
        setPath([initialPosition]);
        sendLocation(initialPosition)
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
  }, []);

  useEffect(() => {
    const handleLocationError = (payload) => {
      switch (payload.code) {
        case 'VALIDATION_ERROR':
          toast.error(payload.message);
          break;
        case 'DRIVER_NOT_FOUND':
          toast.error(payload.message);
          setIsTrackingDisable(true);
          setError(payload.message);
          break;
        case 'SYSTEM_ERROR':
          toast.error(payload.message);
          setIsTrackingDisable(true);
          setError(payload.message);
          break;
        default:
          toast.error('Unknown error');
      }
    };
    socket.on('location_error', handleLocationError);

    return () => {
      socket.off('location_error', handleLocationError);
    };
  }, []);

  const startTracking = () => {
    if (isTrackingDisable) return;
    if (intervalRef.current) return;

    setIsTracking(true);
    intervalRef.current = window.setInterval(() => {
      setPosition(([lat, lng]) => {
        const newPosition = [lat + Math.random() * 0.005, lng + Math.random() * 0.005];

        setPath((prev) => [...prev, newPosition]);
        sendLocation(newPosition);
        return newPosition;
      });
    }, 5000);
  };

  const stopTracking = () => {
    if (isTrackingDisable) return;
    setIsTracking(false);
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return {
    isTracking,
    isTrackingDisable,
    error,
    startTracking,
    stopTracking,
    position,
    path,
  };
};
