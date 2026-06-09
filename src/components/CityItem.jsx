import styles from "./CityItem.module.css";
function CityItem({ city }) {
  const { cityName, emoji, date } = city;
  return (
    <li className={styles.cityItem}>
      <span className={styles.emoji}>{emoji}</span>
      <p className={styles.name}>{cityName}</p>
      <p className={styles.date}>{date}</p>
      <button className={styles.deleteBtn}>&times;</button>
    </li>
  );
}

export default CityItem;
