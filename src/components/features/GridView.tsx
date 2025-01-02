import { Status, Task } from "../../gql/graphql";
import TaskColumn from "../ui/TaskColumn"

interface GridViewProps {
  statusOptions: Status[];
  tasks: Task[];
}

const GridView = ({ statusOptions, tasks} : GridViewProps) => {
  return (
    <div className="flex min-w-max gap-8">
      {statusOptions.map((status) => (
        <TaskColumn
              key={status}
              status={status}
              tasks={tasks.filter(task => task.status === status)}
          />
      ))}
  </div>
  )
}

export default GridView
