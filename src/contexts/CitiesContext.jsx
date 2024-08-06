import { createContext, useState, useEffect, useContext } from "react";
const APIURL = "http://localhost:9000";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [currentCity, setCurrentCity] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  async function fetchCityData(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${APIURL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const res = await fetch(`${APIURL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  async function uploadCity(cityObj) {
    try {
      setIsLoading(true);
      const res = await fetch(`${APIURL}/cities/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cityObj),
      });
      const data = await res.json();
      setCities((cities) => [...cities, data]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{ cities, isLoading, currentCity, fetchCityData, uploadCity }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("Used CitiesContext outside of CitiesProvider");
  return context;
}

export { CitiesProvider, useCities };
