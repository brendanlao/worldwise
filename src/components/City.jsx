import { useParams } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext";
import { useEffect, useState } from "react";

import Spinner from "./Spinner";
import ButtonBack from "./ButtonBack";
import Button from "./Button";

import styles from "./City.module.css";
import DateBox from "./DateBox";
import NoteBox from "./NoteBox";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  const { id } = useParams();
  const { currentCity, fetchData, editCity, isLoading } = useCities();
  const { cityName, emoji, date, notes } = currentCity;
  const [edit, setEdit] = useState(false);
  const [dateEdit, setDateEdit] = useState(date);
  const [notesEdit, setNotesEdit] = useState(notes);

  useEffect(() => {
    setDateEdit(date);
  }, [date]);

  useEffect(() => {
    setNotesEdit(notes);
  }, [notes]);

  function handleEdit() {
    setEdit((cond) => !cond);
  }

  async function handleDone() {
    try {
      if (!dateEdit) return;
      if (date === dateEdit && notes === notesEdit) return;
      await editCity(id, { ...currentCity, date: dateEdit, notes: notesEdit });
    } finally {
      setEdit((cond) => !cond);
    }
  }

  function handleRender() {
    if (edit)
      return (
        <>
          <DateBox onChange={(date) => setDateEdit(date)} date={dateEdit}>
            <h6>When did you go to {cityName}?</h6>
          </DateBox>
          <NoteBox
            onChange={(e) => setNotesEdit(e.target.value)}
            notes={notesEdit}
          >
            <h6>Notes about your trip to {cityName}</h6>
          </NoteBox>
        </>
      );
    else
      return (
        <>
          <div className={styles.row}>
            <h6>You went to {cityName} on</h6>
            <p>{formatDate(date || null)}</p>
          </div>
          <div className={styles.row}>
            <h6>Your notes</h6>
            <p className={styles.note}>{notes || "No notes added."}</p>
          </div>
          <div className={styles.row}>
            <h6>Learn more</h6>
            <a
              href={`https://en.wikipedia.org/wiki/${cityName}`}
              target="_blank"
              rel="noreferrer"
            >
              Check out {cityName} on Wikipedia &rarr;
            </a>
          </div>
        </>
      );
  }

  useEffect(() => {
    fetchData(id, "city/loaded");
  }, [id, fetchData]);

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.city}>
      <div className={styles.cityName}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      {handleRender()}

      <div className={styles.buttons}>
        <Button type="primary" onClick={edit ? handleDone : handleEdit}>
          {edit ? "Done" : "Edit"}
        </Button>
        {!edit && <ButtonBack />}
      </div>
    </div>
  );
}

export default City;
