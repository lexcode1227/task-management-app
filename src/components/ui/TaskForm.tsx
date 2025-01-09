import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { taskSchema } from "../../validations/taskSchema";
import { CreateTaskInput, Status, Task, useCreateTaskMutation, useGetUsersQuery, useUpdateTaskMutation } from "../../gql/graphql";
import { CREATE_TASK_FRAGMENT } from "../../gql/query/fragments";
import { estimatePointOptions, tagsOptions } from "../../libs/utils";
import { toast } from "sonner";
import * as Dialog from "@radix-ui/react-dialog";
import * as Form from "@radix-ui/react-form";
import SelectInput from "./SelectInput";
import MultiSelect from "./MultiSelect";
import ReactDatePicker from "./ReactDatePicker";
import UserIcon from "../../assets/icons/user-icon.svg?react";
import EstimateIcon from "../../assets/icons/estimate-icon.svg?react";

interface FormProps {
  task?: Task
  handleClose: () => void;
}

const TaskForm = ({ task, handleClose }: FormProps) => {  
    const isEditMode = !!task;
    const { control, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm<CreateTaskInput>({
        resolver: zodResolver(taskSchema),
        defaultValues: {
          name: task?.name || '',
          pointEstimate: task?.pointEstimate || undefined,
          assigneeId: task?.assignee?.id || undefined,
          dueDate: task ? new Date(task.dueDate) : undefined,
          tags: task?.tags || [],
          status: task?.status || Status.Backlog,
        },
      });
    
    useEffect(() => {
    if (task) {
      setValue('name', task.name);
      setValue('pointEstimate', task.pointEstimate);
      setValue('assigneeId', task.assignee?.id);
      setValue('tags', task.tags);
      setValue('dueDate', task.dueDate ? new Date(task.dueDate) : null);
      setValue('status', task.status);
    }
    }, [task, setValue]);
    
    const selectedTags = watch('tags', []);
    const { data: usersData } = useGetUsersQuery();
    const [createTaskMutation, { loading: createTaskLoading, error: createTaskError }] = useCreateTaskMutation({
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
    
    const [updateTaskMutation, { loading: updateTaskLoading, error: updateTaskError }] = useUpdateTaskMutation({
      update(cache, { data }) {
        if (!data?.updateTask) return;

        cache.modify({
          fields: {
            tasks(existingTasks = [], { readField }) {
              return existingTasks.map((taskRef: any) => {
                if (readField("id", taskRef) === data.updateTask.id) {
                  return { ...taskRef, ...data.updateTask };
                }
                return taskRef;
              });
            },
          },
        });
      },
      refetchQueries: ["getTasks"],
    });

    const handleTagsChange = (selectedValues: any) => {
      setValue('tags', selectedValues);
    };
    
    const optionsInput = [
    {
        title: "Estimate",
        icon: <EstimateIcon />,
        options: estimatePointOptions
    },
    {
        title: "Assignee",
        icon: <UserIcon />,
        options: usersData?.users.map((user) => ({
          key: user.fullName,
          value: user.id,
          avatar: user.avatar,
        })),
    }
    ];

    const onSubmit: SubmitHandler<CreateTaskInput> = async (data) => {
      try {
        if (isEditMode) {
          await updateTaskMutation({
            variables: {
              input: {
                id: task.id,
                ...data,
              },
            },
          });
          toast.success(`Task with ID:${task.id} edited successfully`);
        } else {
          await createTaskMutation({
            variables: {
              input: data,
            },
          });
          toast.success('Task created successfully');
        }
        
        reset();
        handleClose();
      } catch (err) {
        toast.error(`Failed to ${isEditMode ? 'edit' : 'create'} task: ${createTaskError} ${updateTaskError}`);
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
                className="inline-flex h-[35px] w-full flex-1 items-center justify-center rounded bg-transparent px-2.5 leading-none text-color_neutral_1 text-body-S md:text-body-xL font-bold outline-none"
                type="text"
                placeholder="Task title"
                autoComplete="off"
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
                  {errors[option.title === "Estimate" ? "pointEstimate" : "assigneeId"] &&
                    <Form.Message
                      className="text-[13px] text-white opacity-80"
                      match="valueMissing"
                    >
                      {errors[option.title === "Estimate" ? "pointEstimate" : "assigneeId"]?.message}
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
                                selectedValue={field.value ?? ''}
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
              </Form.Control>
            </Form.Field>
          </div>
          <Form.Submit asChild>
            <div className="mt-[25px] flex justify-end gap-6">
              <Dialog.Close asChild>
                <button
                  className="text-color_neutral_1 inline-flex w-16 appearance-none items-center justify-center rounded-lg bg-transparent p-2 focus:shadow-[0_0_0_2px] focus:outline-none"
                  aria-label="Close"
                  onClick={handleClose}
                >
                  Cancel
                </button>
              </Dialog.Close>
                <button type="submit" disabled={createTaskLoading || updateTaskLoading} className="inline-flex min-w-16 w-auto items-center justify-center rounded-lg bg-color_primary_4 p-2 text-body-M font-normal leading-none text-color_neutral_1 focus:shadow-[0_0_0_2px] focus:outline-none">
                    { !isEditMode ? (createTaskLoading ? "Creating..." : "Create") : ""}
                    { isEditMode ? (updateTaskLoading ? "Saving..." : "Save") : ""}
                </button>
            </div>
          </Form.Submit>
        </Form.Root>
      );
};

export default TaskForm;
