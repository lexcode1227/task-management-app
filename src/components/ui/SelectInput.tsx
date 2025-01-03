import * as Select from "@radix-ui/react-select";
import ChevronDownIcon from "../../assets/icons/chevron-down.svg?react";

interface SelectInputProps {
    options: { value: string; label: string, text: string }[];
    titleSelect: string;
    icon?: React.ReactNode;
}

const SelectInput = ({
  titleSelect,
  icon,
  options,
}: SelectInputProps) => (
  <Select.Root>
    <Select.Trigger
      className="inline-flex h-[35px] items-center justify-center gap-[5px] rounded bg-color_neutral_2/10 text-[13px] leading-none shadow-[0_2px_10px] shadow-black/10 outline-none focus:shadow-none"
      aria-label={titleSelect}
    >
      <Select.Icon className="text-color_neutral_1">
        {icon && <span>{icon}</span>}
      </Select.Icon>
      <Select.Value placeholder={titleSelect} />
    </Select.Trigger>
    <Select.Portal>
      <Select.Content
        align="end"
        position="popper"
        className="mt-2 overflow-hidden rounded-lg border border-color_neutral_2 bg-color_neutral_3 py-2 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
      >
        <Select.ScrollUpButton className="flex h-[25px] cursor-default items-center justify-center rounded bg-color_neutral_2/10 text-color_neutral_1">
          <ChevronDownIcon />
        </Select.ScrollUpButton>
        <Select.Viewport className="p-[5px]">
          <Select.Group className="flex flex-col gap-2">
            <Select.Label className="px-[25px] text-body-M font-bold text-color_neutral_2">
              {titleSelect}
            </Select.Label>
            {options.map((option) => (
              <Select.Item
                key={option.value}
                value={option.value}
                className="flex h-[25px] select-none items-center gap-2 rounded-[3px] px-[25px] text-[13px] leading-none text-color_neutral_1 hover:bg-color_neutral_3"
              >
                {icon && <span>{icon}</span>}
                <Select.ItemText>
                  {option.label} {option.text}
                </Select.ItemText>
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Viewport>
        <Select.ScrollDownButton className="flex h-[25px] cursor-default items-center justify-center rounded bg-color_neutral_2/10 text-color_neutral_1">
          <ChevronDownIcon />
        </Select.ScrollDownButton>
      </Select.Content>
    </Select.Portal>
  </Select.Root>
);

export default SelectInput;

