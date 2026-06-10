import { useNavigate, useParams } from "react-router-dom";
import styles from "./City.module.css";
import Button from "./Button";
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City({ cities }) {
  // Reading the params passed through URL :
  const { id } = useParams(); // !! Note:  here the id is a string not a number

  const currentCity = cities.find((city) => city.id === Number(id));

  const { cityName, emoji, date, notes } = currentCity;

  // New: Navigate back "programmatic navigation"

  const navigate = useNavigate();

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <Button
          variant={"back"}
          onClick={() => {
            navigate(-1);
          }}
        >
          &larr;
        </Button>
      </div>
    </div>
  );
}

export default City;
