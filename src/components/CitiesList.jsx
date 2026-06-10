import styles from "./CitiesList.module.css";
import CityItem from "./CityItem";
import Spinner from "./Spinner";
import Message from "./Message";
function CityList({ cities, isLoading }) {
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : cities.length === 0 ? (
        <Message message={"Add your first city by clicking on the map"} />
      ) : (
        <ul className={styles.cityList}>
          {cities.map((city) => (
            <CityItem key={city.id} city={city} />
          ))}
        </ul>
      )}
    </>
  );
}

export default CityList;
