import { createContext, useEffect, useContext, useReducer } from "react";
const APIURL = "http://localhost:9000";

const CitiesContext = createContext();

const initialState = {
  cities: [],
  currentCity: {},
  isLoading: true,
  error: "",
};

//handle as events not setters
function reducer(state, action) {
  switch (action.type) {
    case "loading": {
      return { ...state, isLoading: true };
    }
    case "setCity": {
      return { ...state, currentCity: action.payload };
    }
    case "cities/loaded": {
      return { ...state, isLoading: false, cities: action.payload };
    }
    case "city/loaded": {
      return { ...state, isLoading: false, currentCity: action.payload };
    }
    case "city/created": {
      return {
        ...state,
        isLoading: false,
        cities: [action.payload, ...state.cities],
        currentCity: action.payload,
      };
    }
    case "city/deleted": {
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };
    }

    case "rejected": {
      return { ...state, isLoading: false, error: action.payload };
    }
    default: {
      throw new Error("Unknown type");
    }
  }
}

function CitiesProvider({ children }) {
  const [{ cities, currentCity, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  async function fetchData(id, type) {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${APIURL}/cities/${id}`);
      const data = await res.json();
      dispatch({ type, payload: data });
    } catch {
      dispatch({ type: "rejected", payload: "Error fetching data" });
    }
  }

  useEffect(() => {
    fetchData("", "cities/loaded");
  }, []);

  async function uploadCity(cityObj) {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${APIURL}/cities/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cityObj),
      });
      const data = await res.json();
      dispatch({ type: "city/created", payload: data });
    } catch {
      dispatch({ type: "rejected", payload: "Error adding data" });
    }
  }

  async function deleteCity(id) {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${APIURL}/cities/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("DELETE unsuccessful");
      console.log(`DELETE ${id} successful`);
      dispatch({
        type: "city/deleted",
        payload: id,
      });
    } catch (err) {
      dispatch({ type: "rejected", payload: "Error deleting data" });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        fetchData,
        uploadCity,
        deleteCity,
      }}
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
