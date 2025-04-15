// components/CustomDateInput.jsx
import DatePicker from 'react-datepicker';
import { format, parse } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';

function formatDate(date) {
  return date ? format(date, 'MM-dd-yyyy') : '';
}

function parseDate(str) {
  const parsed = parse(str, 'MM-dd-yyyy', new Date());
  return isNaN(parsed) ? null : parsed;
}

export default function CustomDateInput({ label, value, onChange, error }) {
  return (
    <div className="mt-3">
      <label>{label}</label>
      <DatePicker
        selected={value ? parseDate(value) : null}
        onChange={(date) => onChange(formatDate(date))}
        dateFormat="MM-dd-yyyy"
        className={`form-control ${error ? 'is-invalid' : ''}`}
        placeholderText="mm-dd-yyyy"
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}
