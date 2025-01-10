import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/index.css"
import CustomInput from "./CustomInput";

interface ReactDatePickerProps {
  startDate: Date;
  handleChange: (date: Date | null) => void;
}

const ReactDatePicker = ({ startDate, handleChange }: ReactDatePickerProps) => {
  const today = new Date();

  return (
    <DatePicker
      selected={startDate}
      onChange={handleChange}
      customInput={<CustomInput />}
      calendarClassName="bg-color_neutral_3 rounded-t-[4px] border-l border-t border-r border-color_neutral_2"
      todayButton="Today"
      minDate={today}
    />
  );
};

export default ReactDatePicker;
