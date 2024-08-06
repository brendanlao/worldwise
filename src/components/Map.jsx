import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useState, useEffect } from "react";

import styles from "./Map.module.css";
import { useCities } from "../contexts/CitiesContext";
import useParamsLocation from "../hooks/useParamsLocation";

const DEFAULT_POSITION = [34, -118];

function Map() {
  const { cities } = useCities();
  const [lat, lng] = useParamsLocation();
  const [mapPosition, setMapPosition] = useState(DEFAULT_POSITION);

  useEffect(() => {
    if (lat && lng) setMapPosition([lat, lng]);
  }, [lat, lng]);

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.fr/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span> <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <DetectClick />
        <ChangeCenter position={mapPosition} />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  function handleForm(position) {
    navigate(`form?lat=${position.lat}&lng=${position.lng}`);
  }
  useMapEvents({
    click: (e) => {
      handleForm(e.latlng);
    },
  });
  return null;
}
export default Map;
