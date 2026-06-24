import styles from "./Form.module.css";
import { useEffect, useReducer } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

import { useURLposition } from "../hooks/useURLposition";
import { useCity } from "../contexts/CitiesContext";
import Button from "./Button";
import BackButton from "./BackButton";
import Spinner from "./Spinner";
import Message from "./Message";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const initialState = {
  cityName: "",
  country: "",
  emoji: "",
  date: new Date(),
  notes: "",
  isLoadingGeocode: false,
  errorMessage: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "Set_city":
      return { ...state, cityName: action.payload };
    case "Set_date":
      return { ...state, date: action.payload };
    case "Set_notes":
      return { ...state, notes: action.payload };
    case "fetch_start":
      return { ...state, isLoadingGeocode: true, errorMessage: "" };
    case "fetch_success":
      const recievedData = action.payload;
      const isActualCity = recievedData.countryCode !== "";
      return {
        ...state,
        isLoadingGeocode: false,
        errorMessage: isActualCity
          ? ""
          : "That doesn't seem to be a city, click somewhere else😉",
        cityName: recievedData.city || recievedData.locality || "un-Supported",
        country: recievedData.countryName,
        emoji: convertToEmoji(recievedData.countryCode),
      };
    case "fetch_fail":
      return {
        ...state,
        isLoadingGeocode: false,
        errorMessage: action.payload,
      };
    case "fetch_finally":
      return { ...state, isLoadingGeocode: false };
    default:
      return state;
  }
}

export default function Form() {
  const navigate = useNavigate();
  const { addCity, isLoading } = useCity();
  const [lat, lng] = useURLposition();
  const [formState, dispatch] = useReducer(reducer, initialState);
  const {
    cityName,
    country,
    emoji,
    date,
    notes,
    isLoadingGeocode,
    errorMessage,
  } = formState;

  //? Fetching the clicked city info based on the lat,lng values:
  useEffect(() => {
    if (!lat && !lng) return;

    async function getClickedCity() {
      try {
        dispatch({ type: "fetch_start" });
        const response = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`,
        );
        if (!response.ok) {
          throw new Error("Coulding fetch the city, something went wrong 👎");
        }
        const data = await response.json();
        dispatch({ type: "fetch_success", payload: data });
      } catch (err) {
        dispatch({ type: "fetch_fail", payload: err.message });
      } finally {
        dispatch({ type: "fetch_finally" });
      }
    }

    getClickedCity();
  }, [lat, lng]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!cityName || !date) return;
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {
        lat,
        lng,
      },
    };
    await addCity(newCity);
    navigate("/app/cities");
  }

  if (isLoadingGeocode) return <Spinner />;
  if (errorMessage)
    return (
      <>
        <Message message={errorMessage} />
        <BackButton />
      </>
    );

  if (!lat && !lng)
    return <Message message="Start by Clicking somewhere on the map 😜" />;

  return (
    <form
      className={`${styles.form} ${isLoading ? `${styles.loading}` : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) =>
            dispatch({ type: "Set_city", payload: e.target.value })
          }
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>

        <DatePicker
          selected={date}
          onChange={(value) => dispatch({ type: "Set_date", payload: value })}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) =>
            dispatch({ type: "Set_notes", payload: e.target.value })
          }
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button variant={"primary"}>Add</Button>

        <BackButton />
      </div>
    </form>
  );
}
