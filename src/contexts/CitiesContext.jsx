import { createContext, useContext, useEffect, useState } from "react";

const citiesContext = createContext();
function CitiesProvider({ children }) {
  const BASE_URL = "http://localhost:9000";
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState(null);

  useEffect(() => {
    async function getCities() {
      try {
        setIsLoading(true);
        const response = await fetch(`${BASE_URL}/cities`);
        const data = await response.json();
        if (!response.ok) throw new Error("can't fetch data");
        setCities(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    getCities();
  }, []);

  async function addCity(newCity) {
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json", // Informs server of JSON formatting
        },
      });
      const data = await response.json();
      setCities((curr) => [...curr, data]);
    } catch {
      alert("There was an error adding the city.....");
    } finally {
      setIsLoading(false);
    }
  }

  function getCurrentCity(id) {
    const city = cities.find((city) => city.id === id);
    setCurrentCity(city);
  }

  return (
    <citiesContext.Provider
      value={{ cities, isLoading, currentCity, getCurrentCity, addCity }}
    >
      {children}
    </citiesContext.Provider>
  );
}

function useCity() {
  const data = useContext(citiesContext);
  return data;
}

export { CitiesProvider, useCity };
