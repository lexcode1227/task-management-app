import { Status, Task } from "../../gql/graphql";
import Card from "./Card";
import TaskColumnSkeleton from "./TaskColumnSkeleton";

interface TaskColumnProps {
  status: Status;
  tasks: Task[];
}

const TaskColumn = ({ status, tasks }: TaskColumnProps ) => {
  if (!tasks) return <TaskColumnSkeleton />;

  return (
    <section className="min-w-[348px] max-w-96 flex flex-1 w-full flex-col gap-4">
      <h2 className="text-body-L font-bold text-color_neutral_1">{status} ({tasks.length})</h2>
      <div className="flex h-[calc(100vh-240px)] flex-col gap-4 overflow-y-auto">
        {tasks?.map((task) => (
          <Card
            key={task.id}
            task={task}
          />
        ))}
      </div>
    </section>
  );
}

export default TaskColumn
