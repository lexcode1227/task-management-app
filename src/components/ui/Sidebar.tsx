import Ravn from "../../assets/images/Logo-Ravn.svg?react";
import { NavLink } from "react-router";
import DashboardIcon from "../../assets/icons/menu-square.svg?react";
import TasksIcon from "../../assets/icons/menu-hamburguer.svg?react";
import ChevronDoubleLeft from "../../assets/icons/chevron-double-left.svg?react";
import ChevronDoubleRight from "../../assets/icons/chevron-double-right.svg?react";
import { cn } from "../../libs/utils";
import { useAppStore } from "../../store/store";
import UserNavlinkSkeleton from "./loadingSkeletons/UserNavlinkSkeleton";

interface SidebarProps {
  isSidebarOpen: boolean;
  loading: boolean;
  handleSidebarToggle: () => void;
}

const Sidebar = ({ isSidebarOpen, loading, handleSidebarToggle }: SidebarProps) => {
  const userInformation = useAppStore((state) => state.user);

  const navLinks = [
    {
      title: "DASHBOARD",
      url: "/",
      icon: DashboardIcon,
    },
    {
      title: "MY TASKS",
      url: "/tasks",
      icon: TasksIcon,
    }
  ];

  return (
    <aside
      className={cn(
        "fixed z-10 mb-8 flex h-[95vh] w-full max-w-[232px] flex-col justify-between rounded-3xl bg-color_neutral_4 pt-3 transition-transform duration-300 md:relative md:h-full",
        {
          "translate-x-0": isSidebarOpen,
          "-translate-x-[108%] md:translate-x-0": !isSidebarOpen,
        },
      )}
    >
      <button
        onClick={handleSidebarToggle}
        className={cn(
          "fixed -right-10 bottom-16 z-10 rounded-lg rounded-l-none bg-color_primary_4 p-2 text-color_neutral_1 transition-all duration-500 md:hidden",
        )}
      >
        {isSidebarOpen ? (
          <ChevronDoubleLeft height={24} width={24} />
        ) : (
          <ChevronDoubleRight height={24} width={24} />
        )}
      </button>
      <div className="flex w-full flex-col items-center">
        <Ravn className="mb-11 size-12 text-color_neutral_1" />
        <nav className="w-full font-bold text-color_neutral_2">
          <ul className="flex w-full flex-col gap-2 text-[15px]">
            {navLinks.map((navLinkItem, index) => (
              <li className="w-full pl-4" key={index}>
                <NavLink
                  className={({ isActive }) =>
                    cn(
                      "relative flex h-14 items-center gap-4 hover:text-color_primary_4",
                      {
                        "border-r-4 border-r-color_primary_4 text-color_primary_4 bg-gradient-to-r from-[#BA252500] from-10% to-[#d24d4d17] to-100%":
                          isActive,
                        "text-color_neutral_2": !isActive,
                      },
                    )
                  }
                  onClick={handleSidebarToggle}
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
      {loading ? (
        <UserNavlinkSkeleton />
      ) : (
        <NavLink
          className={({ isActive }) =>
            cn(
              "flex w-full items-center gap-4 pb-3 hover:text-color_primary_4",
              {
                "text-color_primary_4": isActive,
                "text-color_neutral_2": !isActive,
              },
            )
          }
          to={"/profile"}
          onClick={handleSidebarToggle}
        >
          <img
            className="ml-4 size-9 rounded-lg"
            src={
              userInformation?.avatar ||
              "https://eu.ui-avatars.com/api/?name=HenryAgustin&size=250"
            }
            alt="user avatar"
          />
          <div className={cn("flex w-full flex-col items-start gap-1")}>
            <h2 className="text-sm font-bold">{userInformation?.fullName}</h2>
            <h3 className="text-xs font-medium">{userInformation?.email}</h3>
          </div>
        </NavLink>
      )}
    </aside>
  );
};

export default Sidebar;