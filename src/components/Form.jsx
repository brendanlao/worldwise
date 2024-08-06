// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import styles from "./Form.module.css";

import Button from "./Button";
import ButtonBack from "./ButtonBack";
import useParamsLocation from "../hooks/useParamsLocation";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const { isLoading, uploadCity } = useCities();
  const navigate = useNavigate();
  const [lat, lng] = useParamsLocation();

  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [isLoadingGeolocation, setIsLoadingGeolocation] = useState(false);
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!cityName || !date) return;

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };
    await uploadCity(newCity);
    navigate("/app/cities");
  }

  useEffect(() => {
    setErrorMessage(null);
    async function fetchCity() {
      try {
        if (!lat && !lng) throw new Error("Start by clicking on the map!");
        setIsLoadingGeolocation(true);
        const res = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
        );
        const data = await res.json();
        if (data.city === "")
          throw new Error(
            "That doesn't seem to be a city. Choose a different location!"
          );
        setCityName(data.city);
        setCountry(data.countryName);
        setEmoji(() => convertToEmoji(data.countryCode));
      } catch (err) {
        setErrorMessage(err.message);
      } finally {
        setIsLoadingGeolocation(false);
      }
    }
    fetchCity();
  }, [lat, lng]);

  // useEffect(() => {
  //   if (cityName === "") setErrorMessage(true);
  //   else setErrorMessage(false);
  // }, [cityName]);

  if (isLoadingGeolocation || isLoading) return <Spinner />;
  if (errorMessage) return <Message message={errorMessage} />;
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
          disabled
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="MM/dd/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <ButtonBack />
      </div>
    </form>
  );
}

export default Form;
