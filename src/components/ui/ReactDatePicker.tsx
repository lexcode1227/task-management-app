import DatePicker from "react-datepicker";
import CalendarIcon from "../../assets/icons/calendar-icon.svg?react";
import "react-datepicker/dist/react-datepicker.css";
// import "../../styles/datePicker.css"

interface ReactDatePickerProps {
  startDate: Date;
  handleChange: (date: Date | null) => void;
}

const ReactDatePicker = ({ startDate, handleChange }: ReactDatePickerProps) => {
  const today = new Date();

  return (
    <DatePicker
      calendarClassName="react-datepicker"
      className="w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
      icon={<CalendarIcon />}
      minDate={today}
      onChange={(date) => handleChange(date)}
      placeholderText="Due Date"
      selected={startDate}
      showIcon
      todayButton="Today"
    />
  );
};

export default ReactDatePicker;
