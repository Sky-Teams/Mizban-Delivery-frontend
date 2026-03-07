import  { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import useOrderStore from '../../store/admin/useOrderStore';
import 'leaflet/dist/leaflet.css';

const locationIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = locationIcon;

function LocationMarker() {
    const setCustomerAndPaymentData = useOrderStore((state) => state.setCustomerAndPaymentData);
    const [position, setPosition] = useState(null);

    const map = useMapEvents({
        async click(e) {
            const { lat, lng } = e.latlng;
            setPosition(e.latlng);
            setCustomerAndPaymentData("customer", "latitude", lat.toFixed(6));
            setCustomerAndPaymentData("customer", "longitude", lng.toFixed(6));
            map.flyTo(e.latlng, map.getZoom());
        }
    });
    return position ? <Marker position={position} /> : null;
}

export default function Map() {
    return (
        <div className='h-full w-full relative z-0'>
        <MapContainer center={[34.5553, 69.2075]} zoom={18} style={{ height: "100%", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" className='z-10'/>
            <LocationMarker />
        </MapContainer>
        </div>
    );
}