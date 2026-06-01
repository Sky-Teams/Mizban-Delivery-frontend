import { useEffect, useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, Polyline, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import useOrderFormStore from '../../../store/orders/useOrderFormStore';
import 'leaflet/dist/leaflet.css';
import { LayersControl } from 'react-leaflet';
import { useTranslation } from 'react-i18next';

const pickupIcon = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const dropOffIcon = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function LocationMarker() {
  const pickupCoords = useOrderFormStore((state) => state.orderData.pickupLocation?.coordinates);

  const dropoffCoords = useOrderFormStore((state) => state.orderData.dropoffLocation?.coordinates);

  const pickupLocation = pickupCoords ?? ([0, 0], []);
  const dropoffLocation = dropoffCoords ?? ([0, 0], []);

  const updateOrderData = useOrderFormStore((state) => state.updateOrderData);

  const map = useMapEvents({
    async click(e) {
      const { lat, lng } = e.latlng;
      const newCoords = [Number(lng.toFixed(6)), Number(lat.toFixed(6))];

      if (pickupLocation[0] === 0) {
        updateOrderData('pickupLocation.coordinates', newCoords);
      } else {
        updateOrderData('dropoffLocation.coordinates', newCoords);
      }
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  const handleDragging = (type, e) => {
    const { lat, lng } = e.target.getLatLng();
    updateOrderData(`${type}.coordinates`, [Number(lng.toFixed(6)), Number(lat.toFixed(6))]);
  };

  useEffect(() => {
    if (pickupLocation[0] !== 0 && dropoffLocation[0] !== 0) {
      const bounds = [
        [pickupLocation[1], pickupLocation[0]],
        [dropoffLocation[1], dropoffLocation[0]],
      ];
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [pickupLocation, dropoffLocation, map]);

  const { t } = useTranslation();

  return (
    <>
      {pickupLocation[0] !== 0 && (
        <Marker
          position={[pickupLocation[1], pickupLocation[0]]}
          icon={pickupIcon}
          draggable={true}
          eventHandlers={{ dragend: (e) => handleDragging('pickupLocation', e) }}
        >
          <Tooltip permanent>{t('PICK_UP_LOCATION')}</Tooltip>
        </Marker>
      )}

      {dropoffLocation[0] !== 0 && (
        <Marker
          position={[dropoffLocation[1], dropoffLocation[0]]}
          icon={dropOffIcon}
          draggable={true}
          eventHandlers={{ dragend: (e) => handleDragging('dropoffLocation', e) }}
        >
          <Tooltip permanent>{t('DROP_OFF_LOCATION')}</Tooltip>
        </Marker>
      )}

      {pickupLocation[0] !== 0 && dropoffLocation[0] !== 0 && (
        <Polyline
          positions={[
            [pickupLocation[1], pickupLocation[0]],
            [dropoffLocation[1], dropoffLocation[0]],
          ]}
          pathOptions={{
            color: '#eb2d20',
            weight: 3,
            dashArray: '10, 10',
            opacity: 1,
          }}
        />
      )}
    </>
  );
}

export default function Map() {
  const [initialPosition, setInitialPosition] = useState(null);
  const defaultCenter = useMemo(() => [34.5553, 69.2075], []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setInitialPosition([pos.coords.latitude, pos.coords.longitude]);
      },
      () => {
        setInitialPosition(defaultCenter);
      },
      { enableHighAccuracy: true },
    );
  }, [defaultCenter]);

  if (!initialPosition)
    return <div className="h-full flex items-center justify-center">Loading Map...</div>;

  return (
    <div className="h-full w-full relative z-0">
      <MapContainer center={initialPosition} zoom={13} style={{ height: '100%', width: '100%' }}>
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="Street View">
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Satellite View">
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution="Tiles &copy; Esri"
            />
          </LayersControl.BaseLayer>
        </LayersControl>
        <LocationMarker />
      </MapContainer>
    </div>
  );
}
