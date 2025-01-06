import React, { useState } from "react";
import TagIcon from "../../assets/icons/tag-icon.svg?react";
import { formatSelectedValues } from "../../libs/utils";

interface Option {
    value: string;
    key: string;
  }
  
  interface MultiSelectProps {
    options: Option[];
    selectedValues: string[];
    onChange: (selectedValues: string[]) => void;
  }

const MultiSelect = React.forwardRef<HTMLButtonElement, MultiSelectProps>((props, ref) => {
    const { options, selectedValues, onChange } = props;
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleCheckboxChange = (value: string) => {
        if (selectedValues.includes(value)) {
          onChange(selectedValues.filter((selectedValue) => selectedValue !== value));
        } else {
          onChange([...selectedValues, value]);
        }
    };

    const handleSelectClick = () => {
        setIsOpen(!isOpen);
      };

    return (
    <div className="relative inline-block w-full">
        <button
          ref={ref}
          className="flex items-center justify-center gap-2 w-full h-[35px] rounded bg-color_neutral_2/10 px-2 text-color_neutral_1 font-bold outline-none cursor-pointer" type="button"
          onClick={handleSelectClick}
        >
            {selectedValues.length > 0
                ? (formatSelectedValues(options, selectedValues))
                : (
                <>
                    <TagIcon width={24} color="white" />
                    {'Label'}
                </>
                )}
        </button>
            {isOpen && (
            <div className="absolute z-10 mt-1 w-full rounded-lg border border-color_neutral_2 bg-color_neutral_3 shadow-lg">
                {options.map((option) => (
                  <label key={option.value} className="flex items-center gap-2 p-2">
                      <input
                        type="checkbox"
                        value={option.value}
                        checked={selectedValues.includes(option.value)}
                        onChange={() => handleCheckboxChange(option.value)}
                        // className="appearance-none w-4 h-4 border-2 border-color_neutral_1 rounded-sm bg-transparent checked:bg-blue-800 checked:border-0 focus:outline-none focus:ring-offset-0 focus:ring-2 focus:ring-blue-100 disabled:border-steel-400 disabled:bg-steel-400"
                      />
                          {/* <svg
                            className="absolute w-4 h-4 mt-1 hidden peer-checked:block pointer-events-none"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="4"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg> */}
                      {option.value}
                  </label>
                ))}
            </div>
        )}
    </div>
    );
});

export default MultiSelect
