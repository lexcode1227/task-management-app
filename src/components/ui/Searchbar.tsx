import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { useAppStore } from "../../store/store";
import SubmenuDropdown from "./SubmenuDropdown";
import SearchbarDropdown from "./SearchbarDropdown";
import { FilterTaskInput } from "../../gql/graphql";

const Searchbar = () => {
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [filters, setFilters] = useState<FilterTaskInput>({});
  const setSearchFilter = useAppStore(state => state.setSearchFilter);
  const darkMode = useAppStore(state => state.darkMode);
  const toggleDarkMode = useAppStore(state => state.toggleDarkMode);
  const userInformation = useAppStore(state => state.user);
  const [debouncedSearch] = useDebounce(search, 300);

  const darkModeHandler = () => {
    toggleDarkMode();
    document.body.classList.toggle("dark");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleFilterChange = (newFilters: FilterTaskInput) => {
    setFilters(newFilters);
  };

  const clearSearch = () => {
    setSearch("");
    setFilters({});
    setSearchFilter({ name: undefined, status: undefined });
  }
  
  useEffect(() => {
    const updatedFilters = { ...filters };
    if (debouncedSearch) {
      updatedFilters.name = debouncedSearch;
    } else {
      delete updatedFilters.name;
    }
    setSearchFilter(updatedFilters);
  }, [debouncedSearch, filters]);

  return (
    <div className="flex h-auto items-center justify-between rounded-2xl bg-color_neutral_4">
      <SearchbarDropdown search={search} clearSearch={clearSearch} handleChange={handleChange} handleFilterChange={handleFilterChange} />
      <SubmenuDropdown darkMode={darkMode} userInformation={userInformation} darkModeHandler={darkModeHandler} />
    </div>
  );
};

export default Searchbar;
