import { useNavigate } from "react-router";
import BellIcon from "../../assets/icons/bell-icon.svg?react";
import UserIcon from "../../assets/icons/user-icon.svg?react";
import SunIcon from "../../assets/icons/sun-icon.svg?react";
import MoonIcon from "../../assets/icons/moon.svg?react";
import Dropdown from "./Dropdown";
import { User } from "../../gql/graphql";

interface SubmenuDropdownProps {
    darkMode: () => boolean;
    userInformation: User | null;
    darkModeHandler: () => void;
}

const SubmenuDropdown = ({darkMode, userInformation, darkModeHandler }: SubmenuDropdownProps) => {
    const navigate = useNavigate();

  return (
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
  )
}

export default SubmenuDropdown
