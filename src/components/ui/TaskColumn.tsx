import { Status, Task } from "../../gql/graphql";
import { formatStatus } from "../../libs/utils";
import Card from "./Card";

interface TaskColumnProps {
  status: Status;
  tasks: Task[];
}

const TaskColumn = ({ status, tasks }: TaskColumnProps ) => {  
  if (!tasks) return <p>There is not any task...</p>;

  return (
    <section className="min-w-[348px] max-w-96 flex flex-1 w-full flex-col gap-4">
      <h2 className="text-body-L font-bold text-color_neutral_1">{formatStatus(status)} ({tasks.length})</h2>
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
