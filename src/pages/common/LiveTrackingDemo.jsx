import { useEffect, useRef, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, Polyline } from 'react-leaflet';
import L from 'leaflet';
import { socket } from '../../config/socket';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

const startIcon = L.icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

export function LiveTrackingDemo() {
  const [position, setPosition] = useState(null);
  const [isTracking, setIsTracking] = useState(false);
  const intervalRef = useRef(null);
  const [path, setPath] = useState([]);
  const startPosition = path.length > 0 ? path[0] : position;
  const [isTrackingDisable, setIsTrackingDisable] = useState(false);
  const [error, setError] = useState('');
  const { t } = useTranslation();

  const sendLocation = (position) => {
    socket.emit('update_location', {
      currentLocation: {
        type: 'Point',
        coordinates: [position[0], position[1]],
      },
    });
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const initialPosition = [position.coords.latitude, position.coords.longitude];

        setPosition(initialPosition);
        setPath([initialPosition]);
        sendLocation(initialPosition);
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

  if (!position) return <div>{t('LOADING')}</div>;

  const handleStartTracking = () => {
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

  const handleStopTracking = () => {
    if (isTrackingDisable) return;
    setIsTracking(false);

    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return (
    <div style={{ margin: 'auto' }}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button
        className="disabled:cursor-not-allowed"
        style={{
          margin: '10px',
          padding: '10px',
          backgroundColor: isTracking ? 'red' : 'green',
          borderRadius: '5px',
          color: 'white',
        }}
        disabled={isTrackingDisable}
        onClick={!isTracking ? handleStartTracking : handleStopTracking}
      >
        {isTracking ? 'Stop Tracking' : 'Start Tracking'}
      </button>
      <MapContainer center={position} zoom={13} style={{ height: '500px', width: '100%' }}>
        <Polyline positions={path} color="red" />
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={startPosition} icon={startIcon}>
          <Popup>Start Location</Popup>
        </Marker>

        <Marker position={position}>
          <Popup>My Location</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
