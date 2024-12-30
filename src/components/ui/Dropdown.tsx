import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import React from 'react';

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
  return (
    <div>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button
            className="inline-flex size-[35px] items-center justify-center rounded-full bg-transparent text-color_neutral_3 outline-0 hover:bg-color_neutral_4 hover:border-none focus:shadow-[0_0_0_2px] focus:shadow-outline-none focus-visible:outline-none focus-visible:ring-0"
            aria-label="Customise options"
          >
            {icon && <span>{icon}</span>}
            {title}
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content align="end" className="min-w-[138px] bg-color_neutral_3 rounded-lg shadow-lg p-2">
          {options.map((option, index) => (
            <DropdownMenu.Item
              key={index}
              className="flex items-center gap-2 p-2 rounded-md cursor-pointer text-white text-body-M font-bold hover:bg-color_neutral_4 focus:outline-none"
              onClick={option.onClick}
            >
              {option.icon && <span>{option.icon}</span>}
              {option.label}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
}

export default Dropdown;
