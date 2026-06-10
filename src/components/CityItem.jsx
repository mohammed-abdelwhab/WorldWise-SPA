import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
function CityItem({ city }) {
  const { cityName, emoji, date, id } = city;
  const dateFormat = new Date(date);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  // Passing params (id) from the city item in the list to the city page (component)
  return (
    <li>
      <Link to={`${id}`} className={styles.cityItem}>
        <span className={styles.emoji}>{emoji}</span>
        <p className={styles.name}>{cityName}</p>
        <p className={styles.date}>
          {dateFormat.toLocaleDateString("en-US", options)}
        </p>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
}

export default CityItem;
