import styles from "./CityItem.module.css";
function CityItem({ city }) {
  const { cityName, emoji, date } = city;
  const dateFormat = new Date(date);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  return (
    <li className={styles.cityItem}>
      <span className={styles.emoji}>{emoji}</span>
      <p className={styles.name}>{cityName}</p>
      <p className={styles.date}>
        {dateFormat.toLocaleDateString("en-US", options)}
      </p>
      <button className={styles.deleteBtn}>&times;</button>
    </li>
  );
}

export default CityItem;
