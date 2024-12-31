import { Button, Input, Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useProfileInformationQuery } from "../../gql/graphql";
import SearchIcon from "../../assets/icons/search-icon.svg?react"
import BellIcon from "../../assets/icons/bell-icon.svg?react"
import { NavLink } from "react-router";

const Searchbar = () => {
    const { data } = useProfileInformationQuery();
    console.log(data);
    
  return (
    <div className="flex h-auto items-center justify-between rounded-2xl bg-color_neutral_4">
      <div className="text-color_neutra_2 grid h-full w-full grid-cols-1 items-center rounded-lg">
        <SearchIcon
          width={24}
          height={24}
          className="z-[1] col-start-1 row-start-1 ml-3 self-center"
        />
        <Input
          type="text"
          name="search"
          className="col-start-1 row-start-1 block h-16 w-full rounded-2xl bg-color_neutral_4 ps-12 text-color_neutral_2"
        />
      </div>
      <div className="flex items-center gap-6 px-6 py-5">
        <Button>
          <BellIcon width={24} height={24} className="text-color_neutral_2" />
        </Button>
        <Menu as="div" className="relative">
          <MenuButton as="img" className="w-10 text-color_neutral_2 rounded-full" src={`https://eu.ui-avatars.com/api/?name=${data?.profile.fullName}&size=250`}></MenuButton>
          <MenuItems
            transition
            anchor="bottom end"
            className="w-52 top-24 left-96 origin-top-right rounded-xl border border-white/5 bg-white/5 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
          >
            <MenuItem>
              <NavLink className="block data-[focus]:bg-blue-100" to="/settings">
                Profile
              </NavLink>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
    </div>
  );
}

export default Searchbar