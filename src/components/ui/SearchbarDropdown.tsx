import { useEffect, useRef, useState } from "react";
import { formatStatus, statusOptions } from "../../libs/utils";
import ClearIcon from "../../assets/icons/x-icon.svg?react";
import SearchIcon from "../../assets/icons/search-icon.svg?react";
import { FilterTaskInput, Status } from "../../gql/graphql";

interface SearchbarDropdownProps {
    search: string | undefined;
    clearSearch: () => void;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleFilterChange: (filters: FilterTaskInput) => void;
}

const SearchbarDropdown = ({search, clearSearch, handleChange, handleFilterChange}: SearchbarDropdownProps) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('Select Status');
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    
    const handleOptionClick = (option: string) => {
        setSelectedOption(formatStatus(option));
        setIsDropdownOpen(false);
        handleFilterChange({ status: option === 'Select Status' ? undefined : option as Status });
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsDropdownOpen(false);
        }
    };

    const handleClearSearch = () => {
        clearSearch();
        setSelectedOption('Select Status');
      };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
      }, []);
    
  return (
    <div className="w-full min-w-[200px] flex h-auto items-center justify-between rounded-2xl bg-color_neutral_4" ref={dropdownRef}>
        <div className="text-color_neutral_2 relative grid h-full w-full grid-cols-1 items-center rounded-lg">
            <SearchIcon
                className="z-[1] col-start-1 row-start-1 ml-6 self-center text-color_neutral_2"
                height={24}
                width={24}
            />
            <input
                className="col-start-1 row-start-1 block h-16 w-full rounded-2xl bg-color_neutral_4 ps-16 text-color_neutral_2 focus:outline-none focus:ring-0"
                name="search"
                onChange={handleChange}
                type="text"
                value={search}
            />
            {search &&
                <ClearIcon
                    className="absolute right-3 cursor-pointer text-color_neutral_2"
                    onClick={handleClearSearch}
                    width={24}
                />
            }
            <div className="absolute top-5 right-12 flex items-center">
                <button onClick={handleDropdownToggle} className="rounded border border-transparent py-1 px-1.5 text-center flex items-center text-sm transition-all text-color_neutral_2">
                    <span id="dropdownSpan" className="text-ellipsis overflow-hidden">{selectedOption}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-4 w-4 ml-1">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                </button>
                <div className="h-6 border-l ml-1"></div>
                {isDropdownOpen && 
                    <div className="min-w-[150px] overflow-hidden absolute right-0 mt-[272px] w-full bg-color_neutral_3 rounded-md shadow-lg z-10">
                        <ul id="dropdownOptions">
                            <li className="px-4 py-2 text-color_neutral_1 hover:bg-color_neutral_4 text-sm cursor-pointer">
                                <button onClick={() => handleOptionClick('Select Status')}>
                                    Select Status
                                </button>
                            </li>
                            {statusOptions.map((option) => (
                                <li key={option} className="px-4 py-2 text-color_neutral_1 hover:bg-color_neutral_4 text-sm cursor-pointer">
                                    <button onClick={() => handleOptionClick(option)}>
                                        {formatStatus(option)}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                }
            </div>
        </div>
    </div>
  )
}

export default SearchbarDropdown;