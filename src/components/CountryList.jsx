import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import CountryItem from "./CountryItem";
function CountryList({ cities, isLoading }) {
  // Using Map iterator to make an object of the visitied countries and there emojie's without duplication
  const uniqueCountries = new Map(
    cities.map((city) => [
      city.country,
      { country: city.country, emoji: city.emoji },
    ]),
  ).values();
  // the .values extracts only the object, ignoring the keys "spain, portuga ,.."
  const visitedCountries = [...uniqueCountries];
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
