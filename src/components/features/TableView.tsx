import { Status, Task } from "../../gql/graphql";
import TaskTable from "../ui/TaskTable";

interface TableViewProps {
  statusOptions: Status[];
  tasks: Task[] | undefined;
}

const TableView = ({ statusOptions, tasks }: TableViewProps) => {
  console.log("TableView: ", tasks);
  
  return (
    <div className="flex h-[calc(100vh-240px)] min-w-max flex-col gap-8 overflow-y-auto">
      <table className="h-auto w-full min-w-[348px] border-collapse border-spacing-x-0 border-spacing-y-[15px] text-justify">
        <thead className="flex h-14 rounded-md bg-color_neutral_4 text-body-M text-color_neutral_1">
          <tr className="flex w-full items-center justify-between">
            <th className="flex h-14 w-2/5 min-w-80 items-center rounded-es rounded-ss border border-color_neutral_3 pl-4 font-normal">
              # Task Name
            </th>
            <th className="flex h-14 w-1/5 min-w-44 items-center border border-color_neutral_3 pl-4 font-normal">
              Task Tags
            </th>
            <th className="flex h-14 w-1/5 min-w-44 items-center border border-color_neutral_3 pl-4 font-normal">
              Estimate
            </th>
            <th className="flex h-14 w-1/5 min-w-44 items-center border border-color_neutral_3 pl-4 font-normal">
              Task Assign Name
            </th>
            <th className="flex h-14 w-1/5 min-w-44 items-center rounded-ee rounded-se border border-color_neutral_3 pl-4 font-normal">
              Due Date
            </th>
          </tr>
        </thead>
      </table>
      {tasks && tasks.length > 0 ? statusOptions.map((status) => (
          <TaskTable
            key={status}
            status={status}
            tasks={tasks?.length !== 0 ? tasks?.filter((task) => task.status === status) : []}
          />
        )) : 
          <div className="flex w-full items-center justify-center gap-4 bg-color_neutral_4 rounded-lg p-4 text-color_neutral_1">
            <p className="text-body-xL text-color_neutral_2">No tasks found</p>
          </div>
      }
    </div>
  );
};

export default TableView;
