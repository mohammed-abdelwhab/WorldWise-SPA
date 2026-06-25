import styles from "./Map.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useCity } from "../contexts/CitiesContext";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";
import { useURLposition } from "../hooks/useURLposition";
function Map() {
  // Reading the postion (query string) from the URL custom hook we made
  const [mapLat, mapLng] = useURLposition();

  const [mapPosition, setmapPosition] = useState([
    mapLat || 51.505,
    mapLng || -0.09,
  ]);
  //Reaidng the cities context from the useCity custom hook
  const { cities } = useCity();
  // Reading values from our geolocation custom hook
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();

  //? NOTE: 1) Synchronizing the mapPosition with lat, lng to be remembered:
  //** The feature: When the used clicks on a visited city, the map position goes
  // * there and when closing, the map remains there --> remembered the lat, lng positions  */
  useEffect(() => {
    if (mapLat && mapLng) setmapPosition([mapLat, mapLng]);
  }, [mapLat, mapLng]);

  //? Note : 2) synchronizing the mapPositon to the lat, lng of my current geolocation position
  useEffect(() => {
    if (geolocationPosition)
      setmapPosition([geolocationPosition.lat, geolocationPosition.lng]);
  }, [geolocationPosition]);

  return (
    <div className={`${styles.mapContainer}`}>
      {!geolocationPosition && (
        <Button variant={"position"} onClick={getPosition}>
          {isLoadingPosition ? "loading..." : "use your positon"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={8}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.cityName}</span> <span>{city.emoji}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <MapClicking />
      </MapContainer>
    </div>
  );
}

//TODO1)  NOTE: For adding a moving position of the map, we need to make a custom component
function ChangeCenter({ position }) {
  // we import the useMap hook from leaflet so we can set the view
  const map = useMap();
  map.setView(position);
  // since this is a component it must return some jsx and null is valid
  return null;
}

//TODO 2) Navigation to the form on clicking on the map and passing the lat, lng of the clicked position via query stirng:
function MapClicking() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      navigate(`form?lat=${lat}&lng=${lng}`);
    },
  });
  return null;
}

export default Map;
