import { MapContainer, Marker, Popup, TileLayer, Polyline } from 'react-leaflet';
import L from 'leaflet';
import { useTranslation } from 'react-i18next';
import { useTracking } from '../../hooks/useTracking';

const startIcon = L.icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

export function LiveTrackingDemo() {
  const {
    isTracking,
    isTrackingDisable,
    error,
    startTracking,
    stopTracking,
    position,
    path,
    startPosition,
  } = useTracking();

  const { t } = useTranslation();

  if (!position) return <div>{t('LOADING')}</div>;

  return (
    <div className="h-full w-full relative z-0">
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button
        className={`disabled:cursor-not-allowed p-[10px] ${
          isTracking ? 'bg-red-500' : 'bg-green-500'
        } rounded-[5px] text-white`}
        disabled={isTrackingDisable}
        onClick={!isTracking ? startTracking : stopTracking}
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
