import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDebounce } from "use-debounce";
import { useAppStore } from "../../store/store";
import Dropdown from "./Dropdown";
import BellIcon from "../../assets/icons/bell-icon.svg?react";
import ClearIcon from "../../assets/icons/x-icon.svg?react";
import SearchIcon from "../../assets/icons/search-icon.svg?react";
import UserIcon from "../../assets/icons/user-icon.svg?react";
import SunIcon from "../../assets/icons/sun-icon.svg?react";
import MoonIcon from "../../assets/icons/moon.svg?react";

const Searchbar = () => {
  const [search, setSearch] = useState("");
  const setSearchByTaskName = useAppStore(state => state.setSearchByTaskName);
  const darkMode = useAppStore(state => state.darkMode);
  const toggleDarkMode = useAppStore(state => state.toggleDarkMode);
  const userInformation = useAppStore(state => state.user);
  const [debouncedSearch] = useDebounce(search, 300);
  const navigate = useNavigate();

  const darkModeHandler = () => {
    toggleDarkMode();
    document.body.classList.toggle("dark");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const clearSearch = () => setSearch("");
  
  useEffect(() => {
    setSearchByTaskName(debouncedSearch);
  }, [debouncedSearch]);

  return (
    <div className="flex h-auto items-center justify-between rounded-2xl bg-color_neutral_4">
      <div className="text-color_neutra_2 relative grid h-full w-full grid-cols-1 items-center rounded-lg">
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
      <div className="flex h-full w-auto items-center justify-end gap-6 pr-6">
        <button onClick={darkModeHandler} className="text-color_neutral_2 transition-all">{darkMode() ? <MoonIcon height={24} width={24} /> : <SunIcon height={24} width={24} />}</button>
        <Dropdown
          icon={
            <BellIcon className="text-color_neutral_2" height={24} width={24} />
          }
          options={[
            {
              label: "Notification",
              icon: <UserIcon />,
              onClick: () => console.log("Notification"),
            },
          ]}
        />
        <Dropdown
          icon={
            <img
              className="w-8 rounded-full text-color_neutral_2"
              src={userInformation?.avatar || "https://eu.ui-avatars.com/api/?name=HenryAgustin&size=250"}
            />
          }
          options={[
            {
              label: "Profile",
              icon: <UserIcon />,
              onClick: () => navigate("/profile"),
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Searchbar;
