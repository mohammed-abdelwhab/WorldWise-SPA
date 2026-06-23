import { useNavigate, useParams } from "react-router-dom";
import { useCity } from "../contexts/CitiesContext";
import styles from "./City.module.css";
import Button from "./Button";
import { useEffect } from "react";
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  // Reading the params passed through URL:
  const { id } = useParams();
  // Consuming the context:
  const { currentCity, getCurrentCity } = useCity();
  // getting the current city --> a side effect so we need a useEffect
  useEffect(() => {
    getCurrentCity(Number(id));
  }, [id]);

  // New: Navigate back "programmatic navigation"
  const navigate = useNavigate();

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{currentCity?.emoji}</span> {currentCity?.cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {currentCity?.cityName} on</h6>
        <p>{formatDate(currentCity?.date || null)}</p>
      </div>

      {currentCity?.notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{currentCity?.notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${currentCity?.cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {currentCity?.cityName} on Wikipedia &rarr;
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
