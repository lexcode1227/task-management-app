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
          className="flex h-[35px] w-full cursor-pointer items-center justify-center gap-2 rounded bg-color_neutral_2/10 px-2 font-bold text-color_neutral_1 outline-none"
          type="button"
          onClick={handleSelectClick}
        >
          {selectedValues.length > 0 ? (
            formatSelectedValues(options, selectedValues)
          ) : (
            <>
              <TagIcon width={24} color="white" />
              {"Label"}
            </>
          )}
        </button>
        {isOpen && (
          <div className="absolute z-10 mt-1 w-full rounded-lg border border-color_neutral_2 bg-color_neutral_3 shadow-lg">
            {options.map((option) => (
              // <label key={option.value} className="flex items-center gap-2 p-2">
              //     <input
              //       type="checkbox"
              //       value={option.value}
              //       checked={selectedValues.includes(option.value)}
              //       onChange={() => handleCheckboxChange(option.value)}
              //       className="checkbox-input appearance-none w-4 h-4 border-2 border-color_neutral_1 rounded-sm bg-transparent checked:bg-transparent focus:outline-none focus:ring-offset-0 focus:ring-2 focus:ring-blue-100 disabled:border-steel-400 disabled:bg-steel-400"
              //     />
              //         <span className="checkbox-span relative">
              //           <svg
              //             // className="absolute w-4 h-4 mt-1 peer-checked:block pointer-events-none"
              //             xmlns="http://www.w3.org/2000/svg"
              //             viewBox="0 0 24 24"
              //             fill="none"
              //             stroke="currentColor"
              //             strokeWidth="4"
              //             strokeLinecap="round"
              //             strokeLinejoin="round"
              //           >
              //             <polyline points="20 6 9 17 4 12"></polyline>
              //           </svg>
              //         </span>
              //     {option.value}
              // </label>
              <div className="inline-flex items-center">
                <label
                  key={option.value}
                  className="relative flex cursor-pointer items-center gap-2 p-2"
                >
                  <input
                    type="checkbox"
                    value={option.value}
                    checked={selectedValues.includes(option.value)}
                    onChange={() => handleCheckboxChange(option.value)}
                    className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-color_neutral_1 shadow transition-all checked:border-transparent checked:bg-traborder-transparent hover:shadow-md"
                  />
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 transform text-white opacity-0 peer-checked:opacity-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      stroke="currentColor"
                      stroke-width="1"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </span>
                  <span className="text-color_neutral_2">{option.value}</span>
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
    );
});

export default MultiSelect
