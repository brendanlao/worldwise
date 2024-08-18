import styles from "./Form.module.css";

function NoteBox({ children, onChange, notes }) {
  return (
    <div className={styles.row}>
      <label htmlFor="notes">{children}</label>
      <textarea id="notes" onChange={onChange} value={notes} />
    </div>
  );
}

export default NoteBox;
