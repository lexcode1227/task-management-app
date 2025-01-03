import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { taskSchema } from "../../validations/taskSchema";
import { CreateTaskInput, PointEstimate, Status, TaskTag, useCreateTaskMutation, useGetUsersQuery } from "../../gql/graphql";
import { toast } from "sonner";
import * as Dialog from "@radix-ui/react-dialog";
import { gql } from "@apollo/client";

interface FormProps {
    handleClose: () => void;
}

const Form = ({ handleClose }: FormProps) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<CreateTaskInput>({
        resolver: zodResolver(taskSchema),
        defaultValues: {
            status: Status.Backlog,
        },
    });
    const { data: usersData, loading: usersLoading,  } = useGetUsersQuery();

    const [createTaskMutation, { data, loading, error }] = useCreateTaskMutation({
      update(cache, { data }) {
        if (!data?.createTask) return;

        // Agregar la nueva tarea a la lista cacheada
        cache.modify({
          fields: {
            tasks(existingTasks = []) {
              // Crear una referencia para la nueva tarea
              const newTaskRef = cache.writeFragment({
                data: data.createTask,
                fragment: gql`
                  fragment NewTask on Task {
                    id
                    name
                    creator {
                      fullName
                    }
                    pointEstimate
                    status
                    tags
                    dueDate
                  }
                `,
              });

              // Retornar la lista actualizada con la nueva tarea
              return [...existingTasks, newTaskRef];
            },
          },
        });
      },
    });
    console.log(data);

    const estimateOptions = Object.entries(PointEstimate).map(
      ([key, value]) => (
        <option
          key={key}
          value={value}
          className="flex h-[25px] select-none items-center gap-2 rounded-[3px] px-[25px] text-[13px] leading-none text-color_neutral_1 bg-color_neutral_3 hover:bg-color_neutral_4"
        >
          {value}
        </option>
      ),
    );
    const tagsOptions = Object.entries(TaskTag).map(([key, value]) => (
      <option
        key={key}
        value={value}
        className="flex h-[25px] select-none items-center gap-2 rounded-[3px] px-[25px] text-[13px] leading-none text-color_neutral_1 bg-color_neutral_3 hover:bg-color_neutral_4"
      >
        {value}
      </option>
    ));

    const assigneeOptions = usersData?.users?.map((user) => (
      <option
        key={user.id}
        value={user.id}
        className="flex h-[25px] select-none items-center gap-2 rounded-[3px] px-[25px] text-[13px] leading-none text-color_neutral_1 bg-color_neutral_3 hover:bg-color_neutral_4"
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
            required
            min={today}
          />
          {errors.dueDate && <span>date errors</span>}
        </div>
      </div>
      <div className="mt-[25px] flex items-center justify-end gap-6">
        <Dialog.Close asChild>
          <button
            className="text-violet11 hover:bg-violet4 focus:shadow-violet7 inline-flex w-16 appearance-none items-center justify-center rounded-lg bg-transparent p-2 focus:shadow-[0_0_0_2px] focus:outline-none"
            aria-label="Close"
          >
            Cancel
          </button>
        </Dialog.Close>
        <div>
          <button
            type="submit"
            disabled={loading || usersLoading}
            className="hover:bg-green5 focus:shadow-green7 inline-flex w-16 items-center justify-center rounded-lg bg-color_primary_2 p-2 text-body-M font-normal leading-none text-color_neutral_1 focus:shadow-[0_0_0_2px] focus:outline-none"
          >
            Create
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
