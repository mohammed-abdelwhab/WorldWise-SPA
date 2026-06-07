import styles from "./CityList.module.css";
// this should take the cities and the loading spinner
function CityList() {
  return (
    <ul className={styles.cityList}>
      <li>city1</li>
      <li>city2</li>
      <li>city3</li>
    </ul>
  );
}

export default CityList;
