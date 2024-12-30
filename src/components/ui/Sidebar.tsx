import { gql, useQuery } from "@apollo/client";
import logoRavn from "../../assets/images/Logo-Ravn.svg";
import { NavLink } from "react-router";
import DashboardIcon from "../../assets/icons/menu-square.svg?react";
import TasksIcon from "../../assets/icons/menu-hamburguer.svg?react";

const GET_USER = gql`
  query Profile {
    profile {
      id
      fullName
      email
      avatar
      createdAt
      updatedAt
      type
    }
  }
`;

const Sidebar = () => {
  const { data } = useQuery(GET_USER);
  console.log(data);

  return (
    <aside className="flex w-full max-w-60 flex-col items-center rounded-3xl bg-color_neutral_4 pt-3 mb-8">
      <img src={logoRavn} alt="logo Ravn" className="mb-11 size-12" />
      <nav className="font-bold text-color_neutral_2">
        <ul className="flex flex-col gap-2">
          <NavLink
            className="h-14 text-[15px] text-color_primary_4"
            to={"/"}
          >
            <li className="flex items-center gap-4">
              <DashboardIcon height={24} width={24} color="#94979A" />
              DASHBOARD
            </li>
          </NavLink>
          <NavLink
            className="h-14 text-[15px] text-color_primary_4"
            to={"/tasks"}
          >
            <li className="flex items-center gap-4">
              <TasksIcon width={24} height={24} color="#94979A" />
              MY TASK
            </li>
          </NavLink>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
