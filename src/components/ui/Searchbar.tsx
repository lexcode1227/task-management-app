import { Button, Input, Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useProfileQuery } from "../../gql/graphql";
import SearchIcon from "../../assets/icons/search-icon.svg?react"
import BellIcon from "../../assets/icons/bell-icon.svg?react"

const Searchbar = () => {
    const { data } = useProfileQuery();
    console.log(data);
    
  return (
    <div className="flex h-auto items-center justify-between rounded-xl bg-color_neutral_4">
      <div className="text-color_neutra_2 grid h-full w-full grid-cols-1 items-center rounded-lg">
        <SearchIcon
          width={24}
          height={24}
          className="z-[1] col-start-1 row-start-1 ml-3 self-center"
        />
        <Input
          type="text"
          name="search"
          className="text-color_neutral_2 col-start-1 row-start-1 block h-16 w-full ps-12	rounded-md bg-color_neutral_4"
        />
      </div>
      <div className="flex items-center gap-6 px-6 py-5">
        <Button>
          <BellIcon width={24} height={24} className="text-color_neutral_2" />
        </Button>
        <Menu>
          <MenuButton className="w-28 text-color_neutral_2">
            {data?.profile.fullName}
          </MenuButton>
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