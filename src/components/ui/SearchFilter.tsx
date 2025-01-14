import ClearIcon from "../../assets/icons/x-icon.svg?react";
import SearchIcon from "../../assets/icons/search-icon.svg?react";

interface SearchFilterProps {
    search: string;
    clearSearch: () => void;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchFilter = ({search, clearSearch, handleChange}: SearchFilterProps) => {
  return (
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
        {search && (
        <ClearIcon
            className="absolute right-3 cursor-pointer text-color_neutral_2"
            onClick={clearSearch}
            width={24}
        />
        )}
    </div>
  )
}

export default SearchFilter
