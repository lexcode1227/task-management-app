import React from 'react';
import CalendarIcon from "../../assets/icons/calendar-icon.svg?react";

interface CustomInputProps {
  value?: string;
  onClick?: () => void;
}

const CustomInput = React.forwardRef<HTMLDivElement, CustomInputProps>(
    ({ value, onClick }, ref) => (
      <div
        className="inline-flex h-[35px] w-full items-center justify-center gap-2 rounded bg-color_neutral_2/10 px-2 text-color_neutral_1 text-body-M font-bold cursor-pointer"
        onClick={onClick}
        ref={ref}
      >
        <CalendarIcon width={24} className="text-color_neutral_1" />
        <span>{value || "Due date"}</span>
      </div>
    )
  );

export default CustomInput;