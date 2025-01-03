import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { taskSchema } from "../../validations/taskSchema";
import { CreateTaskInput, Status } from "../../gql/graphql";
import * as Form from "@radix-ui/react-form";
import SelectInput from "./SelectInput";
import TagIcon from "../../assets/icons/tag-icon.svg?react";
import UserIcon from "../../assets/icons/user-icon.svg?react";
import EstimateIcon from "../../assets/icons/estimate-icon.svg?react";
import * as Dialog from "@radix-ui/react-dialog";
// import ReactDatePicker from "react-datepicker";
// import { useState } from "react";

const TaskForm = () => {
    // const [startDate, setStartDate] = useState<Date>(new Date());
    const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm<CreateTaskInput>({
      resolver: zodResolver(taskSchema),
      defaultValues: {
        status: Status.Backlog,
      },
    });

    const optionsInput = [
      {
        title: "Estimate",
        icon: <EstimateIcon />,
        options: [
            { value: "ZERO", label: "0", text: "Points" },
            { value: "ONE", label: "1", text:  "Points" },
            { value: "TWO", label: "2", text:  "Points" },
            { value: "FOUR", label: "4", text: "Points" },
            { value: "EIGHT", label: "8", text: "Points" },
        ],
      },
      {
        title: "Assignee",
        icon: <UserIcon />,
        options: [
          { value: "JONH", label: "John", text: "" },
          { value: "SAM", label: "Sam", text: "" },
          { value: "STEVEN", label: "Steven", text: "" },
          { value: "ALEX", label: "Alex", text: "" },
        ],
      },
      {
        title: "Tags",
        icon: <TagIcon />,
        options: [
            { value: "ANDROID", label: "Android", text: "" },
            { value: "IOS", label: "IOS", text: "" },
            { value: "REACT", label: "React", text: "" },
            { value: "NODE_JS", label: "Node Js", text: "" },
            { value: "RAILS", label: "Rails", text: "" },
        ]
        },
    ];

    const today = new Date().toISOString().split("T")[0];

    const onSubmit = (data: CreateTaskInput) => {
        console.log(data);
        reset();
    };
  return (
    <Form.Root
      className="flex w-full flex-col text-color_neutral_2"
      name="taskForm"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Form.Field
        key="taskName"
        className="mb-2.5 grid text-color_neutral_2"
        name="taskName"
      >
        <div className="flex items-baseline justify-between">
          {errors.name && (
            <Form.Message className="text-[13px] text-color_neutral_1 opacity-80">
              {errors.name?.message}
            </Form.Message>
          )}
        </div>
        <Form.Control asChild>
          <input
            {...register("name")}
            className="inline-flex h-[35px] w-full flex-1 items-center justify-center rounded bg-transparent px-2.5 text-[15px] leading-none text-color_neutral_2 outline-none"
            type="text"
            placeholder="Task title"
          />
        </Form.Control>
      </Form.Field>
      <div className="flex w-full gap-2.5">
        {optionsInput.map((option) => (
          <Form.Field
            key={option.title}
            className="mb-2.5 grid w-[23%] text-color_neutral_2"
            name={option.title.toLowerCase()}
          >
            <div className="flex items-baseline justify-between">
              <Form.Message
                className="text-[13px] text-white opacity-80"
                match="valueMissing"
              >
                The field is required
              </Form.Message>
            </div>
            <Form.Control asChild>
              <SelectInput
                titleSelect={option.title}
                icon={option.icon}
                options={option.options}
              />
            </Form.Control>
          </Form.Field>
        ))}
        <Form.Field
          className="mb-2.5 grid w-[23%] text-color_neutral_2"
          name="dueDate"
        >
          <div className="flex w-full items-baseline justify-between">
            {errors.dueDate && (
              <Form.Message className="text-[13px] text-color_neutral_1 opacity-80">
                {errors.dueDate.type === "required" && "The field is required"}
              </Form.Message>
            )}
          </div>
          <Form.Control asChild>
            <div className="inline-flex h-[35px] items-center justify-center gap-[5px] rounded bg-color_neutral_2/10 text-[13px] leading-none shadow-[0_2px_10px] shadow-black/10 outline-none focus:shadow-none">
              <input
                className="h-full w-full bg-color_neutral_2/10 px-2 text-color_neutral_2"
                id="dueDate"
                type="date"
                {...register("dueDate", { valueAsDate: true })}
                required
                min={today}
              />
            </div>
          </Form.Control>
        </Form.Field>
      </div>
      {/* <ReactDatePicker 
        selected={startDate} 
        onChange={(date) => handleChange(date)}/> */}
      <Form.Submit asChild>
        <div className="mt-[25px] flex justify-end gap-6">
          <Dialog.Close asChild>
            <button
              className="text-violet11 hover:bg-violet4 focus:shadow-violet7 inline-flex w-16 appearance-none items-center justify-center rounded-lg bg-transparent p-2 focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            >
              Cancel
            </button>
          </Dialog.Close>
          <Dialog.Close asChild>
            <button
              type="submit"
              className="hover:bg-green5 focus:shadow-green7 inline-flex w-16 items-center justify-center rounded-lg bg-color_primary_2 p-2 text-body-M font-normal leading-none text-color_neutral_1 focus:shadow-[0_0_0_2px] focus:outline-none"
            >
              Create
            </button>
          </Dialog.Close>
        </div>
      </Form.Submit>
    </Form.Root>
  );
}

export default TaskForm