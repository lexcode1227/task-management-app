import { useProfileInformationQuery } from "../../gql/graphql";
import SearchIcon from "../../assets/icons/search-icon.svg?react"
import BellIcon from "../../assets/icons/bell-icon.svg?react"
import UserIcon from "../../assets/icons/user-icon.svg?react"
import Dropdown from "./Dropdown";
import { useNavigate } from "react-router";

const Searchbar = () => {
    const { data } = useProfileInformationQuery();
    console.log(data);
    const navigate = useNavigate();
    
  return (
    <div className="flex h-auto items-center justify-between rounded-2xl bg-color_neutral_4">
      <div className="text-color_neutra_2 grid h-full w-full grid-cols-1 items-center rounded-lg">
        <SearchIcon
          width={24}
          height={24}
          className="z-[1] col-start-1 row-start-1 ml-3 self-center"
        />
        <input
          type="text"
          name="search"
          className="col-start-1 row-start-1 block h-16 w-full rounded-2xl bg-color_neutral_4 ps-12 text-color_neutral_2 focus:outline-none focus:ring-0"
        />
      </div>
      <div className="flex justify-end items-center gap-6 w-auto h-full pr-6">
        <Dropdown
          icon={<BellIcon width={24} height={24} className="text-color_neutral_2" />}
          options={[
            { label: "Notification", icon: <UserIcon/>, onClick: () => console.log("Notification")}
          ]}
        />
        <Dropdown 
          icon={<img src="https://eu.ui-avatars.com/api/?name=HenryAgustin&size=250" className="w-8 text-color_neutral_2 rounded-full"/>} 
          options={[
            { label: "Profile", icon: <UserIcon/>, onClick: () => navigate("/profile") }
          ]} 
        />
      </div>
    </div>
  );
}

export default Searchbar