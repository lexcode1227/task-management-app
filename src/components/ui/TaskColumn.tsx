import { Status, Task } from "../../gql/graphql";
import { formatStatus } from "../../libs/utils";
import Card from "./Card";

interface TaskColumnProps {
  status: Status;
  tasks: Task[];
}

const TaskColumn = ({ status, tasks }: TaskColumnProps) => {
  return (
    <section className="flex w-full min-w-[348px] max-w-[350px] flex-1 flex-col gap-4">
      <h2 className="text-body-L font-bold text-color_neutral_1">
        {formatStatus(status)} ({tasks.length})
      </h2>
      <div className="flex h-[calc(100vh-240px)] flex-col gap-4 overflow-y-auto">
        { tasks.length !== 0 ? 
          tasks?.map((task) => <Card key={task.id} task={task} />)
        : <p className="text-body-L text-color_neutral_2">No tasks found</p>
        }
      </div>
    </section>
  );
};

export default TaskColumn;
