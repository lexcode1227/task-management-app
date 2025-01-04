import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { taskSchema } from "../../validations/taskSchema";
import {
  CreateTaskInput,
  PointEstimate,
  Status,
  TaskTag,
  useCreateTaskMutation,
  useGetUsersQuery,
} from "../../gql/graphql";
import { toast } from "sonner";
import * as Dialog from "@radix-ui/react-dialog";
import { CREATE_TASK_FRAGMENT } from "../../gql/query/fragments";

interface FormProps {
  handleClose: () => void;
}

const Form = ({ handleClose }: FormProps) => {
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
  const { data: usersData, loading: usersLoading } = useGetUsersQuery();

  const [createTaskMutation, { loading, error }] = useCreateTaskMutation({
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

  const estimateOptions = Object.entries(PointEstimate).map(([key, value]) => (
    <option
      className="flex h-[25px] select-none items-center gap-2 rounded-[3px] bg-color_neutral_3 px-[25px] text-[13px] leading-none text-color_neutral_1 hover:bg-color_neutral_4"
      key={key}
      value={value}
    >
      {value}
    </option>
  ));
  const tagsOptions = Object.entries(TaskTag).map(([key, value]) => (
    <option
      className="flex h-[25px] select-none items-center gap-2 rounded-[3px] bg-color_neutral_3 px-[25px] text-[13px] leading-none text-color_neutral_1 hover:bg-color_neutral_4"
      key={key}
      value={value}
    >
      {value}
    </option>
  ));

  const assigneeOptions = usersData?.users?.map((user) => (
    <option
      className="flex h-[25px] select-none items-center gap-2 rounded-[3px] bg-color_neutral_3 px-[25px] text-[13px] leading-none text-color_neutral_1 hover:bg-color_neutral_4"
      key={user.id}
      value={user.id}
    >
      {user.fullName}
    </option>
  ));

  const today = new Date().toISOString().split("T")[0];

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
      toast.error(`Error creating task ${data.name} ${error?.message}`);
    }
  };

  return (
    <form
      className="flex w-full flex-col text-color_neutral_2"
      name="taskForm"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="mb-2.5 grid text-color_neutral_2">
        <input
          className="inline-flex h-[35px] w-full flex-1 items-center justify-center rounded bg-transparent px-2.5 text-[15px] leading-none text-color_neutral_2 outline-none"
          id="taskName"
          {...register("name", {
            pattern: {
              value: /^[A-Za-z\s]+$/,
              message: "Task name must contain only alphabetic characters",
            },
          })}
          placeholder="Task title"
          required
        />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      <div className="flex w-full gap-2.5">
        <div className="mb-2.5 grid w-1/4 text-color_neutral_2">
          <select
            className="inline-flex h-[35px] items-center justify-center gap-[5px] rounded bg-color_neutral_2/10 text-[13px] leading-none shadow-[0_2px_10px] shadow-black/10 outline-none focus:shadow-none"
            id="estimate"
            {...register("pointEstimate")}
            required
          >
            {estimateOptions}
          </select>
          {errors.pointEstimate && <p>{errors.pointEstimate.message}</p>}
        </div>
        <div className="mb-2.5 grid w-1/4 text-color_neutral_2">
          <select
            className="inline-flex h-[35px] items-center justify-center gap-[5px] rounded bg-color_neutral_2/10 text-[13px] leading-none shadow-[0_2px_10px] shadow-black/10 outline-none focus:shadow-none"
            id="assigneeId"
            {...register("assigneeId")}
            required
          >
            {assigneeOptions}
          </select>
          {errors.assigneeId && <p>{errors.assigneeId.message}</p>}
        </div>
        <div className="mb-2.5 grid w-1/4 text-color_neutral_2">
          <select
            className="inline-flex h-[35px] items-center justify-center gap-[5px] rounded bg-color_neutral_2/10 text-[13px] leading-none shadow-[0_2px_10px] shadow-black/10 outline-none focus:shadow-none"
            id="tags"
            {...register("tags")}
            required
          >
            {tagsOptions}
          </select>
          {errors.tags && <p>{errors.tags.message}</p>}
        </div>
        <div className="mb-2.5 grid w-1/4 text-color_neutral_2">
          <input
            className="h-full w-full bg-color_neutral_2/10 px-2 text-color_neutral_2"
            id="dueDate"
            type="date"
            {...register("dueDate", { valueAsDate: true })}
            min={today}
            required
          />
          {errors.dueDate && <span>date errors</span>}
        </div>
      </div>
      <div className="mt-[25px] flex items-center justify-end gap-6">
        <Dialog.Close asChild>
          <button
            aria-label="Close"
            className="text-violet11 hover:bg-violet4 focus:shadow-violet7 inline-flex w-16 appearance-none items-center justify-center rounded-lg bg-transparent p-2 focus:shadow-[0_0_0_2px] focus:outline-none"
          >
            Cancel
          </button>
        </Dialog.Close>
        <div>
          <button
            className="hover:bg-green5 focus:shadow-green7 inline-flex w-16 items-center justify-center rounded-lg bg-color_primary_2 p-2 text-body-M font-normal leading-none text-color_neutral_1 focus:shadow-[0_0_0_2px] focus:outline-none"
            disabled={loading || usersLoading}
            type="submit"
          >
            Create
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
