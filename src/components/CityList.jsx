import CityItem from "./CityItem";
import Message from "./Message";
import Spinner from "./Spinner";
import styles from "./CityList.module.css";
import { useCities } from "../contexts/CitiesProvider";

function CityList() {
  const { cities, isLoading } = useCities();
  if (cities.length === 0) return <Message message={"Add a City!"} />;
  if (isLoading) return <Spinner />;
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
