import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import Spinner from "./Spinner";
import { useCities } from "../contexts/CitiesContext";

function CountryList() {
  const { cities, isLoading } = useCities();
  const countries = [
    ...cities.reduce(
      (acc, curr) => acc.add({ country: curr.country, emoji: curr.emoji }),
      new Set()
    ),
  ];
  if (isLoading) return <Spinner />;
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}

export default CountryList;
