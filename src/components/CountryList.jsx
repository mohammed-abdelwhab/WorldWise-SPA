import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import CountryItem from "./CountryItem";
function CountryList({ cities, isLoading }) {
  // Using Map iterator to make an object of the visitied countries and there emojie's without duplication
  //* I didn't use Set as i also want the emoji of the country as well --> return an array of objects with country,emoji (key : value)
  //
  const uniqueCountries = new Map(
    cities.map((city) => [
      city.country,
      { country: city.country, emoji: city.emoji },
    ]),
  ).values();
  const visitedCountries = [...uniqueCountries];
  // Note:  The .values() extracts only the object, ignoring the keys "spain, portuga ,.."
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : visitedCountries.length === 0 ? (
        <Message message={"No visited Countries yet, add your first"} />
      ) : (
        <ul className={styles.countryList}>
          {visitedCountries.map((country, i) => (
            <CountryItem key={`country-${i + 1}`} country={country} />
          ))}
        </ul>
      )}
    </>
  );
}

export default CountryList;
