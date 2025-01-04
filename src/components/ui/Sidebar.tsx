import logoRavn from "../../assets/images/Logo-Ravn.svg";
import { NavLink } from "react-router";
import DashboardIcon from "../../assets/icons/menu-square.svg?react";
import TasksIcon from "../../assets/icons/menu-hamburguer.svg?react";
import UserIcon from "../../assets/icons/user-icon.svg?react";

const Sidebar = () => {
  const navLinks = [
    {
      title: "Dashboard",
      url: "/",
      icon: DashboardIcon,
    },
    {
      title: "My Task",
      url: "/tasks",
      icon: TasksIcon,
    },
    {
      title: "Profile",
      url: "/profile",
      icon: UserIcon,
    },
  ];
  return (
    <aside className="mb-8 flex w-full max-w-[232px] flex-col items-center rounded-3xl bg-color_neutral_4 pt-3">
      <img alt="logo Ravn" className="mb-11 size-12" src={logoRavn} />
      <nav className="w-full font-bold text-color_neutral_2">
        <ul className="flex w-full flex-col gap-2 text-[15px]">
          {navLinks.map((navLinkItem, index) => (
            <li className="w-full pl-4" key={index}>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "relative flex h-14 items-center gap-4 border-r-4 border-r-color_primary_4 text-color_primary_4"
                    : "relative flex h-14 items-center gap-4 text-color_neutral_2"
                }
                to={navLinkItem.url}
              >
                <navLinkItem.icon height={24} width={24} />
                <span>{navLinkItem.title}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
