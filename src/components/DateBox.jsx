import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function DateBox({ onChange, date, children, className }) {
  return (
    <div className={className}>
      <label htmlFor="date">{children}</label>
      <DatePicker
        id="date"
        onChange={onChange}
        selected={date}
        dateFormat="MM/dd/yyyy"
      />
    </div>
  );
}

export default DateBox;
