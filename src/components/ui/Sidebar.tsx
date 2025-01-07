import logoRavn from "../../assets/images/Logo-Ravn.svg";
import { NavLink } from "react-router";
import DashboardIcon from "../../assets/icons/menu-square.svg?react";
import TasksIcon from "../../assets/icons/menu-hamburguer.svg?react";
// import ChevronDoubleLeft from "../../assets/icons/chevron-double-left.svg?react";
// import ChevronDoubleRight from "../../assets/icons/chevron-double-right.svg?react";
import { cn } from "../../libs/utils";

interface SidebarProps {
  isSidebarOpen: boolean;
  handleSidebarToggle: () => void;
}

const Sidebar = ({ isSidebarOpen}: SidebarProps) => {
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
    }
  ];
  return (
    <aside 
      className={cn("mb-8 md:flex w-full max-w-[232px] justify-between rounded-3xl bg-color_neutral_4 pt-3 flex flex-col transition-transform duration-300", {
        "translate-x-0 rounded-none md:rounded-3xl": isSidebarOpen,
        "-translate-x-full": !isSidebarOpen,
      })}
    >
      {/* <button
        onClick={handleSidebarToggle}
        className={cn("fixed md:hidden top-20 -right-8 z-50 rounded-lg text-color_neutral_2 bg-color_neutral_4 p-2 transition-all duration-300")}
      >
        {isSidebarOpen ? <ChevronDoubleLeft height={24} width={24} /> : <ChevronDoubleRight height={24} width={24} />}
      </button> */}
      <div className="flex flex-col items-center w-full">
        <img alt="logo Ravn" className="mb-11 size-12" src={logoRavn} />
        <nav className="w-full font-bold text-color_neutral_2">
          <ul className="flex w-full flex-col gap-2 text-[15px]">
            {navLinks.map((navLinkItem, index) => (
              <li className="w-full pl-4" key={index}>
                <NavLink
                  className={({ isActive }) =>
                    cn("relative flex h-14 items-center gap-4", {
                      "border-r-4 border-r-color_primary_4 text-color_primary_4": isActive,
                      "text-color_neutral_2": !isActive,
                    })
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
      </div>
      <NavLink className={({ isActive }) => cn("flex items-center gap-4 w-full pb-3", {
        "text-color_primary_4": isActive,
        "text-color_neutral_2": !isActive,
      })} to={"/profile"}>
        <img className="rounded-lg size-9 ml-4" src="https://eu.ui-avatars.com/api/?name=HenryAgustin&size=250" alt="user avatar" />
        <div className={cn("flex flex-col items-start gap-1 w-full")}>
          <h2 className="text-sm font-bold">Henry Agustin</h2>
          <h3 className="text-xs font-medium">henryagustin@ravn.co</h3>
        </div>
      </NavLink>
    </aside>
  );
};

export default Sidebar;