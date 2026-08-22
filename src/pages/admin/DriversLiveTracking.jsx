import { Fragment, useEffect, useState } from 'react';
import { socket } from '../../config/socket';
import { MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet';
import { startIcon } from '../common/LiveTrackingDemo';
import L from 'leaflet';
import { useTranslation } from 'react-i18next';
import { sendDriversLiveLocationToAdmin } from '../../services/liveTracking';

const carIcon = L.divIcon({
  html: `
    <div style="
      font-size: 25px;
      color: red;
      transform: rotate(0deg);
    ">
      🚗
    </div>
  `,
  className: '',
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

export default function DriversLiveTracking() {
  const [drivers, setDrivers] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    const handleLocationUpdate = (location) => {
      sendDriversLiveLocationToAdmin(location, setDrivers);
    };
    socket.on('location_updated', handleLocationUpdate);

    return () => {
      socket.off('location_updated', handleLocationUpdate);
    };
  });

  return (
    <div className="h-full w-full relative z-0">
      {drivers.length === 0 && (
        <p style={{ color: 'green', textAlign: 'center', marginBottom: '20px' }}>
          {t('DRIVER_NOT_FOUND')}
        </p>
      )}
      <MapContainer
        center={[34.35, 62.2]}
        zoom={13}
        style={{
          height: '500px',
          width: '100%',
        }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {drivers.length &&
          drivers.map((location) => {
            const driverId = location.driverId;
            const [lat, long] = location.currentLocation.coordinates;
            const [startLatitudePosition, startLongitudePosition] =
              location.initialLocation.coordinates;

            return (
              <Fragment key={driverId}>
                <Polyline positions={location.path} color="red" />

                <Marker position={[lat, long]} icon={carIcon}>
                  <Popup>DriverId: {driverId}</Popup>
                </Marker>
                <Marker position={[startLatitudePosition, startLongitudePosition]} icon={startIcon}>
                  <Popup>Start Position driverId {driverId}</Popup>
                </Marker>
              </Fragment>
            );
          })}
      </MapContainer>
    </div>
  );
}
