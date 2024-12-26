import { gql, useQuery } from "@apollo/client";
import logoRavn from "../../assets/images/Logo-Ravn.svg";

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
    <aside className="flex h-full w-full max-w-60 flex-col items-center rounded-3xl bg-color_neutral_4 pt-3">
      <img src={logoRavn} alt="logo Ravn" className="mb-11 size-12" />
      <nav className="font-bold text-color_neutral_2">
        <ul className="flex flex-col gap-2">
          <li className="flex h-14 items-center gap-4 text-[15px] text-color_primary_4">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 3H11V11H3V3ZM3 13H11V21H3V13ZM13 3H21V11H13V3ZM13 13H21V21H13V13ZM15 5V9H19V5H15ZM15 15V19H19V15H15ZM5 5V9H9V5H5ZM5 15V19H9V15H5Z"
                fill="currentColor"
              />
            </svg>
            <a href="/dashboard">DASHBOARD</a>
          </li>
          <li className="flex items-center gap-4 text-body-M">
            <svg
              width="20"
              height="22"
              viewBox="0 0 18 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 0H18V2H0V0ZM0 7H18V9H0V7ZM0 14H18V16H0V14Z"
                fill="#94979A"
              />
            </svg>
            <a href="/tasks">MY TASK</a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
