import * as Select from "@radix-ui/react-select";
import ChevronDownIcon from "../../assets/icons/chevron-down.svg?react";
import React from "react";
import { formatEstimatePoint } from "../../libs/utils";
import { PointEstimate } from "../../gql/graphql";

interface SelectInputProps {
  options: { key: string; value: string, avatar?: string | null }[] | undefined;
  titleSelect: string;
  icon?: React.ReactNode;
  selectedValue: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  name: string;
}

const SelectInput = React.forwardRef<HTMLButtonElement, SelectInputProps>(
  ({ titleSelect, icon, options, selectedValue, onChange, onBlur, name }, ref) => {
    return (
      <Select.Root value={selectedValue} onValueChange={onChange}>
        <Select.Trigger
          aria-label={titleSelect}
          className="inline-flex h-[35px] items-center justify-center gap-2 rounded bg-color_neutral_2/10 text-body-M font-bold leading-none text-color_neutral_1 shadow-[0_2px_10px] shadow-black/10 outline-none focus:shadow-none"
          ref={ref}
          name={name}
          onBlur={onBlur}
        >
          <Select.Icon className="text-color_neutral_1">
            {icon && <span>{icon}</span>}
          </Select.Icon>
          <Select.Value
            className="text-body-S md:text-body-M"
            placeholder={titleSelect}
          />
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            align="end"
            className="z-30 mt-2 overflow-hidden rounded-lg border border-color_neutral_2 bg-color_neutral_3 py-2 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
            position="popper"
          >
            <Select.ScrollUpButton className="flex h-[25px] cursor-default items-center justify-center rounded bg-color_neutral_2/10 text-color_neutral_1">
              <ChevronDownIcon />
            </Select.ScrollUpButton>
            <Select.Viewport className="p-[5px]">
              <Select.Group className="flex flex-col gap-5">
                {options?.map((option) => (
                  <Select.Item
                    key={option.key}
                    value={option.value}
                    className="flex h-[25px] select-none items-center gap-2 rounded-[3px] px-[25px] text-[13px] leading-none text-color_neutral_1 hover:bg-color_neutral_3"
                  >
                    <Select.Icon className="text-color_neutral_2">
                      {titleSelect === "Estimate" ? (
                        <span className="text-color_neutral_2">{icon}</span>
                      ) : (
                        <img
                          className="h-8 w-8 rounded-full"
                          src={
                            option.avatar ||
                            "https://eu.ui-avatars.com/api/?name=HenryAgustin&size=250"
                          }
                          alt={option.key}
                        />
                      )}
                    </Select.Icon>
                    <Select.ItemText className="text-body-S md:text-body-M">
                      {titleSelect === "Estimate"
                        ? <span className="text-body-S md:text-body-M">{formatEstimatePoint(option.value as PointEstimate) + " Points"}</span> 
                        : <span className="text-body-S md:text-body-M">{option.key}{" "}</span>
                      }
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
  }
);

export default SelectInput;
