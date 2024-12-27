import { Input, Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useProfileQuery } from "../../gql/graphql";

const Searchbar = () => {
    const { data } = useProfileQuery();
    console.log(data);
    
  return (
    <div className="h-16 flex justify-between rounded-xl bg-color_neutral_4 px-6 py-5">
      <div className="text-color_neutra_2 flex h-full w-3/4 items-center rounded-lg">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="#94979A"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.031 16.617L22.314 20.899L20.899 22.314L16.617 18.031C15.0237 19.3082 13.042 20.0029 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20.0029 13.042 19.3082 15.0237 18.031 16.617ZM16.025 15.875C17.2941 14.5699 18.0029 12.8204 18 11C18 7.132 14.867 4 11 4C7.132 4 4 7.132 4 11C4 14.867 7.132 18 11 18C12.8204 18.0029 14.5699 17.2941 15.875 16.025L16.025 15.875Z"
            fill="#94979A"
          />
        </svg>
        <Input
          type="text"
          name="search"
          className="h-full w-full bg-color_neutral_4"
        />
      </div>
      <div className="flex items-center gap-6">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 17H22V19H2V17H4V10C4 7.87827 4.84285 5.84344 6.34315 4.34315C7.84344 2.84285 9.87827 2 12 2C14.1217 2 16.1566 2.84285 17.6569 4.34315C19.1571 5.84344 20 7.87827 20 10V17ZM18 17V10C18 8.4087 17.3679 6.88258 16.2426 5.75736C15.1174 4.63214 13.5913 4 12 4C10.4087 4 8.88258 4.63214 7.75736 5.75736C6.63214 6.88258 6 8.4087 6 10V17H18ZM9 21H15V23H9V21Z"
            fill="#94979A"
          />
        </svg>

        <Menu>
          <MenuButton className="text-color_neutral_2"> {data?.profile.fullName}</MenuButton>
          <MenuItems anchor="bottom">
            <MenuItem>
              <a className="block data-[focus]:bg-blue-100" href="/settings">
                Settings
              </a>
            </MenuItem>
            <MenuItem>
              <a className="block data-[focus]:bg-blue-100" href="/support">
                Support
              </a>
            </MenuItem>
            <MenuItem>
              <a className="block data-[focus]:bg-blue-100" href="/license">
                License
              </a>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
    </div>
  );
}

export default Searchbar