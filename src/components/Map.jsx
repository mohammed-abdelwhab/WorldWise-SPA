import styles from "./Map.module.css";
import { useSearchParams } from "react-router-dom";
function Map() {
  // Reading the postion (query string) from the URL:
  const [SearchParams, setSearchParams] = useSearchParams();
  const lat = SearchParams.get("lat");
  const lng = SearchParams.get("lng");
  return (
    <div className={styles.mapContainer}>
      <h1>Map Position Coords:</h1>
      <h3>lat = {lat} </h3>
      <h3>lng = {lng} </h3>
      <button
        onClick={() => {
          setSearchParams({ lat: 25, lng: 21 });
        }}
      >
        change positon
      </button>
    </div>
  );
}

export default Map;
