import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { taskSchema } from "../../validations/taskSchema";
import { CreateTaskInput, PointEstimate, Status, TaskTag, useCreateTaskMutation, useGetUsersQuery } from "../../gql/graphql";
import * as Form from "@radix-ui/react-form";
import SelectInput from "./SelectInput";
import UserIcon from "../../assets/icons/user-icon.svg?react";
import EstimateIcon from "../../assets/icons/estimate-icon.svg?react";
import * as Dialog from "@radix-ui/react-dialog";
import { toast } from "sonner";
import { CREATE_TASK_FRAGMENT } from "../../gql/query/fragments";
import ReactDatePicker from "./ReactDatePicker";
import MultiSelect from "./MultiSelect";

interface FormProps {
    handleClose: () => void;
}

const FormTest = ({ handleClose }: FormProps) => {
    const { control, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm<CreateTaskInput>({
        resolver: zodResolver(taskSchema),
        defaultValues: {
          status: Status.Backlog,
        },
      });
    const selectedTags = watch('tags', []);
    const { data: usersData, loading: usersLoading } = useGetUsersQuery();
    const [createTaskMutation, { loading: mutationLoading, error: mutationError }] = useCreateTaskMutation({
      update(cache, { data }) {
        if (!data?.createTask) return;
        cache.modify({
          fields: {
            tasks(existingTasks = []) {
              const newTaskRef = cache.writeFragment({
                data: data.createTask,
                fragment: CREATE_TASK_FRAGMENT,
              });
  
              return [...existingTasks, newTaskRef];
            },
          },
        });
      },
    });

    const handleTagsChange = (selectedValues: any) => {
      setValue('tags', selectedValues);
    };
    
    const optionsInput = [
    {
        title: "Estimate",
        icon: <EstimateIcon />,
        options: Object.entries(PointEstimate).map(([_, value]) => ({
          key: value,
          value: value,
        }))
    },
    {
        title: "Assignee",
        icon: <UserIcon />,
        options: usersData?.users.map((user) => ({
          key: user.fullName,
          value: user.id,
        })),
    },
    // {
    //     title: "Tags",
    //     icon: <TagIcon />,
    //     options: Object.entries(TaskTag).map(([key, value]) => ({
    //         key: key,
    //         value: value,
    //       })),
    // },
    ];
    const tagsOptions = Object.entries(TaskTag).map(([key, value]) => ({
        key: key,
        value: value,
    }))

    const onSubmit: SubmitHandler<CreateTaskInput> = async (data) => {
      try {
        await createTaskMutation({
          variables: {
            input: data,
          },
        });
        toast.success(`${data.name} created successfully`);
        reset();
        handleClose();
      } catch (err) {
        toast.error(`Error creating task ${data.name} ${mutationError?.message}`);
      }
    };
      return (
        <Form.Root
          className="flex w-full flex-col text-color_neutral_2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Form.Field
            key="name"
            className="mb-2.5 grid text-color_neutral_2"
            name="name"
          >
            <div className="flex items-baseline justify-between">
              { errors.name && 
                <Form.Message
                  className="text-[13px] text-color_neutral_1 opacity-80"
                  match="valueMissing"
                >
                  {errors.name?.message}
                </Form.Message>
              }
            </div>
            <Form.Control asChild>
              <input
                className="inline-flex h-[35px] w-full flex-1 items-center justify-center rounded bg-transparent px-2.5 leading-none text-color_neutral_1 text-body-M font-bold outline-none"
                type="text"
                placeholder="Task title"
                {...control.register("name")}
              />
            </Form.Control>
          </Form.Field>
          <div className="flex w-full gap-2.5">
            {optionsInput.map((option) => (
              <Form.Field
                key={option.title === "Estimate" ? "pointEstimate" : "assigneeId"}
                className="mb-2.5 grid w-1/4 text-color_neutral_2"
                name={option.title === "Estimate" ? "pointEstimate" : "assigneeId"}
              >
                <div className="flex items-baseline justify-between">
                  {errors[option.title === "Estimate" ? "pointEstimate" : option.title === "Assignee" ? "assigneeId" : "tags"] &&
                    <Form.Message
                      className="text-[13px] text-white opacity-80"
                      match="valueMissing"
                    >
                      {errors[option.title === "Estimate" ? "pointEstimate" : option.title === "Assignee" ? "assigneeId" : "tags"]?.message}
                    </Form.Message>
                  }
                </div>
                <Form.Control asChild>
                    <Controller
                        name={option.title === "Estimate" ? "pointEstimate" : "assigneeId"}
                        control={control}
                        render={({ field }) => (
                            <SelectInput
                                {...field}
                                titleSelect={option.title}
                                icon={option.icon}
                                options={option.options}
                                onChange={field.onChange}
                            />
                        )}
                    />
                </Form.Control>
              </Form.Field>
            ))}
            <Form.Field key="tags" className="mb-2.5 grid w-1/4 text-color_neutral_2" name="tags">
                {errors.tags &&
                  <Form.Message
                    className="text-[13px] text-white opacity-80"
                    match="valueMissing"
                  >
                    {errors.tags?.message}
                  </Form.Message>
                }
                <Form.Control asChild>
                  <Controller
                      name="tags"
                      control={control}
                      render={({ field }) => (
                          <MultiSelect
                            {...field}
                            options={tagsOptions}
                            selectedValues={selectedTags}
                            onChange={handleTagsChange}
                          />
                      )}
                  />
                </Form.Control>
            </Form.Field>

            <Form.Field
              className="mb-2.5 grid w-1/4 text-color_neutral_2"
              name="dueDate"
              key="dueDate"
            >
              <div className="flex w-full items-baseline justify-between">
                <Form.Message
                  className="text-[13px] text-white opacity-80"
                  match="valueMissing"
                >
                  Please enter a valid date in the future
                </Form.Message>
              </div>
              <Form.Control asChild>
                <Controller
                  name="dueDate"
                  control={control}
                  render={({ field }) => (
                    <ReactDatePicker
                      startDate={field.value}
                      handleChange={field.onChange}
                    />
                  )}
                />
                {/* <div className="inline-flex h-[35px] items-center justify-center gap-[5px] rounded bg-color_neutral_2/10 text-[13px] leading-none shadow-[0_2px_10px] shadow-black/10 outline-none focus:shadow-none">
                  <input
                    className="h-full w-full bg-color_neutral_2/10 px-2 text-color_neutral_2"
                    id="dueDate"
                    type="date"
                    {...control.register("dueDate", { valueAsDate: true })}
                    min={today}
                    required
                  />
                </div> */}
              </Form.Control>
            </Form.Field>
          </div>
          <Form.Submit asChild>
            <div className="mt-[25px] flex justify-end gap-6">
              <Dialog.Close asChild>
                <button
                  className="text-color_neutral_1 inline-flex w-16 appearance-none items-center justify-center rounded-lg bg-transparent p-2 focus:shadow-[0_0_0_2px] focus:outline-none"
                  aria-label="Close"
                >
                  Cancel
                </button>
              </Dialog.Close>
                <button type="submit" disabled={mutationLoading || usersLoading} className="inline-flex min-w-16 w-auto items-center justify-center rounded-lg bg-color_primary_4 p-2 text-body-M font-normal leading-none text-color_neutral_1 focus:shadow-[0_0_0_2px] focus:outline-none">
                    { mutationLoading ? "Creating..." : "Create"}
                </button>
            </div>
          </Form.Submit>
        </Form.Root>
      );
};

export default FormTest
