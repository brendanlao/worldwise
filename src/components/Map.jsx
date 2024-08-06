import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

function Map() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const lat = searchParams.get("lat") || 0;
  const lng = searchParams.get("lng") || 0;

  function handleForm() {
    navigate("form");
  }
  return (
    <div className={styles.mapContainer} onClick={handleForm}>
      <h1>MAP!</h1>
      <h1>
        {lat} {lng}
      </h1>
    </div>
  );
}

export default Map;
