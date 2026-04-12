import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, Polyline, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import useOrderStore from '../../../store/admin/useOrderStore';
import 'leaflet/dist/leaflet.css';
import { LayersControl } from 'react-leaflet';


const pickupIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = pickupIcon;
const dropOffIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

function LocationMarker() {
    const [position, setPosition] = useState(null);
    const pickupLocation = useOrderStore((state) => state.orderData.pickupLocation.coordinates)
    const dropoffLocation = useOrderStore((state) => state.orderData.dropoffLocation.coordinates)
    const updateOrderData = useOrderStore((state) => state.updateOrderData)

    const map = useMapEvents({
        async click(e) {
            const { lat, lng } = e.latlng;
            setPosition(e.latlng);
            if (pickupLocation[0] === 0) {
                updateOrderData("pickupLocation.coordinates", [lat.toFixed(6), lng.toFixed(6)])
            } else {
                updateOrderData("dropoffLocation.coordinates", [lat.toFixed(6), lng.toFixed(6)])
            }
            map.flyTo(e.latlng, map.getZoom());
        }
    });
    const handleDragging = (type, e) => {
        const { lat, lng } = e.target.getLatLng()
        updateOrderData(`${type}.coordinates`, [parseFloat(lat.toFixed(6)), parseFloat(lng.toFixed(6))])
    }
        useEffect(()=>{
      if(pickupLocation[0] !== 0 && dropoffLocation[0] !== 0){
          map.fitBounds([pickupLocation, dropoffLocation])
      }
    }, [pickupLocation, dropoffLocation, map])
    return (
        <>
            {pickupLocation[0] !== 0 && (
                <Marker position={[parseFloat(pickupLocation[0]), parseFloat(pickupLocation[1])]}
                    icon={pickupIcon}
                    draggable={true}
                    eventHandlers={{ dragend: (e) => handleDragging("pickupLocation", e) }}
                >
                    <Tooltip permanent={true}>
                        Pickup Location
                    </Tooltip>
                </Marker>
            )}
            {
                dropoffLocation[0] !== 0 && (
                    <Marker position={[parseFloat(dropoffLocation[0]), parseFloat(dropoffLocation[1])]}
                        icon={dropOffIcon}
                        draggable={true}
                        eventHandlers={{ dragend: (e) => handleDragging("dropoffLocation", e) }}
                    >
                    <Tooltip permanent={true}>
                        Dropoff Location

                    </Tooltip>

                    </Marker>
                )
            }
            {pickupLocation[0] !== 0 && dropoffLocation[0] !== 0 && (
                <Polyline
                    positions={[pickupLocation, dropoffLocation]}
                    pathOptions={{
                        color: '#eb2d20',
                        weight: 3,
                        dashArray: '10, 10',
                        opacity: 1
                    }}
                />
            )}
        </>
    )
}

export default function Map() {
    const [initialPosition, setInitialPosition] = useState(null)
    const defaultCenter = [34.5553, 69.2075]

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setInitialPosition([pos.coords.latitude, pos.coords.longitude])
            },
            () => {
                setInitialPosition(defaultCenter)
            },
            {
                enableHighAccuracy: true
            }
        )
    }, [])
      

     
    if (!initialPosition) return <div className="h-full flex items-center justify-center">Loading Map...</div>;
    return (
        <div className='h-full w-full relative z-0'>
            <MapContainer
                center={initialPosition}
                zoom={13}
                style={{ height: "100%", width: "100%" }}
            >
                <LayersControl position="topright">
                    <LayersControl.BaseLayer checked name="Street View">
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer name="Satellite View">
                        <TileLayer
                            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                            attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                        />
                    </LayersControl.BaseLayer>
                </LayersControl>

                <LocationMarker />
            </MapContainer>
        </div>
    );
}