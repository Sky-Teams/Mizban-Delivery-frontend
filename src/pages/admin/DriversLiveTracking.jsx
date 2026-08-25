import { Fragment, useEffect, useState } from 'react';
import { socket } from '../../config/socket';
import { MapContainer, Marker, Polyline, TileLayer } from 'react-leaflet';
import { startIcon } from '../common/LiveTrackingDemo';
import L from 'leaflet';
import { useTranslation } from 'react-i18next';
import { sendDriversLiveLocationToAdmin } from '../../services/liveTracking';
import {
  DriverPopup,
  MapClickHandler,
} from '../../components/admin/driver-list/DirverLocation.jsx';

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
  const [selectedDriverId, setSelectedDriverId] = useState(null);
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

  const visibleDrivers = selectedDriverId
    ? drivers.filter((driver) => driver.driverId === selectedDriverId)
    : drivers;

  const driverFilter = (driverId) => {
    setSelectedDriverId((prev) => (prev === driverId ? null : driverId));
  };

  return (
    <div className="h-full w-full relative z-0">
      {visibleDrivers.length === 0 && (
        <p className="text-green-500 text-center mb-5">{t('DRIVER_NOT_FOUND')}</p>
      )}
      <MapContainer center={[34.35, 62.2]} zoom={13} className="h-[500px] w-full">
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapClickHandler onMapClick={() => setSelectedDriverId(null)} />

        {visibleDrivers.length &&
          visibleDrivers.map((driver) => {
            const driverId = driver.driverId;
            const currentLocation = driver.currentLocation.coordinates;
            const startLocation = driver.initialLocation.coordinates;

            return (
              <Fragment key={driverId}>
                <Polyline positions={driver.path} color="red" />

                <Marker
                  position={currentLocation}
                  icon={carIcon}
                  eventHandlers={{
                    click: (event) => {
                      event.originalEvent.stopPropagation();
                      driverFilter(driverId);
                    },
                  }}
                >
                  <DriverPopup driver={driver} title={t('CURRENT_LOCATION')} />
                </Marker>
                <Marker
                  position={startLocation}
                  icon={startIcon}
                  eventHandlers={{
                    click: (event) => {
                      event.originalEvent.stopPropagation();
                      driverFilter(driverId);
                    },
                  }}
                >
                  <DriverPopup driver={driver} title={t('PICK_UP_LOCATION')} />
                </Marker>
              </Fragment>
            );
          })}
      </MapContainer>
    </div>
  );
}
