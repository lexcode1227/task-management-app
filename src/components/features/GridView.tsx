import { Status, Task } from "../../gql/graphql";
import TaskColumn from "../ui/TaskColumn";

interface GridViewProps {
  statusOptions: Status[];
  tasks: Task[] | undefined;
}

const GridView = ({ statusOptions, tasks }: GridViewProps) => {
  const sortedTasks = tasks?.slice().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  return (
    <div className="flex min-w-max gap-8">
      { tasks && tasks.length > 0 ? statusOptions.map((status) => (
        <TaskColumn
          key={status}
          status={status}
          tasks={sortedTasks?.length !== 0 ? tasks?.filter((task) => task.status === status) : []}
        />
      )) : 
        <div className="flex w-full items-center justify-center gap-4 bg-color_neutral_4 rounded-lg p-4 text-color_neutral_1">
          <p className="text-body-xL text-color_neutral_2">No tasks found</p>
        </div>
      }
    </div>
  );
};

export default GridView;
