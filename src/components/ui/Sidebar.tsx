import logoRavn from "../../assets/images/Logo-Ravn.svg";
import { NavLink } from "react-router";
import DashboardIcon from "../../assets/icons/menu-square.svg?react";
import TasksIcon from "../../assets/icons/menu-hamburguer.svg?react";

const Sidebar = () => {
  return (
    <aside className="flex w-full max-w-[232px] flex-col items-center rounded-3xl bg-color_neutral_4 pt-3 mb-8">
      <img src={logoRavn} alt="logo Ravn" className="mb-11 size-12" />
      <nav className="font-bold text-color_neutral_2">
        <ul className="flex flex-col gap-2 w-36 text-[15px]">
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive 
                  ? "relative flex items-center gap-4 h-14 text-color_primary_4 before:content-[''] before:inline-block before:h-14 before:w-2 before:right-[-44px] before:bg-color_primary_4 before:absolute before:transition-all before:duration-300"
                  : "relative flex items-center gap-4 h-14 text-color_neutral_2 before:content-[''] before:inline-block before:h-14 before:w-2 before:right-[-44px] before:bg-transparent before:absolute before:transition-all before:duration-300"
               }
              to={"/dashboard"}
              >
                <DashboardIcon height={24} width={24}/>
                DASHBOARD
            </NavLink>  
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive 
                  ? "relative flex items-center gap-4 h-14 text-color_primary_4 before:content-[''] before:inline-block before:h-14 before:w-2 before:right-[-44px] before:bg-color_primary_4 before:absolute before:transition-all before:duration-300"
                  : "relative flex items-center gap-4 h-14 text-color_neutral_2 before:content-[''] before:inline-block before:h-14 before:w-2 before:right-[-44px] before:bg-transparent before:absolute before:transition-all before:duration-300"
              }
              to={"/tasks"}
            >
              <TasksIcon width={24} height={24}/>
              MY TASK
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
