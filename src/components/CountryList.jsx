import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import Spinner from "./Spinner";
import { useCities } from "../contexts/CitiesContext";

function CountryList() {
  const { cities, isLoading } = useCities();
  // const countries = [
  //   ...cities.reduce(
  //     (acc, curr) =>
  //       acc.add(JSON.stringify({ country: curr.country, emoji: curr.emoji })),
  //     new Set()
  //   ),
  // ].map((country) => JSON.parse(country));

  const countriesMap = cities.reduce((acc, curr) => {
    if (!acc.has(curr.country)) return acc.set(curr.country, curr.emoji);
    return acc;
  }, new Map());
  const countries = Array.from(countriesMap, ([country, emoji]) => ({
    country,
    emoji,
  }));

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
