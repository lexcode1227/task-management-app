import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import React from "react";
interface DropdownOption {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}

interface DropdownProps {
  title?: string;
  icon?: React.ReactNode;
  options: DropdownOption[];
}

const Dropdown = ({ title, icon, options }: DropdownProps) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  }
  return (
    <div>
      <DropdownMenu.Root open={open} onOpenChange={setOpen}>
        <DropdownMenu.Trigger asChild draggable={false}>
          <button
            aria-label="Customise options"
            className="focus:shadow-outline-none inline-flex size-[35px] items-center justify-center rounded-full bg-transparent text-color_neutral_3 outline-0 hover:border-none hover:bg-color_neutral_4 focus:shadow-[0_0_0_2px] focus-visible:outline-none focus-visible:ring-0"
            onClick={handleOpen}
          >
            {icon && <span>{icon}</span>}
            {title}
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content
          align="end"
          className="min-w-[138px] rounded-lg bg-color_neutral_3 p-2 shadow-lg"
        >
          {options.map((option, index) => (
            <DropdownMenu.Item
              className="flex cursor-pointer items-center gap-2 rounded-md p-2 text-body-M font-bold text-white hover:bg-color_neutral_4 focus:outline-none"
              key={index}
              onClick={() => option.onClick()}
            >
              {option.icon && <span>{option.icon}</span>}
              {option.label}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
};

export default Dropdown;
