import { Status, Task } from "../../gql/graphql";
import TaskTable from "../ui/TaskTable";

interface TableViewProps {
  statusOptions: Status[];
  tasks: Task[];
}

const TableView = ({ statusOptions, tasks }: TableViewProps) => {
  return (
    <div className="flex h-[calc(100vh-240px)] min-w-max flex-col gap-8 overflow-y-auto">
      <table className="h-auto w-full min-w-[348px] border-collapse border-spacing-x-0 border-spacing-y-[15px] text-justify">
        <thead className="flex h-14 rounded-md bg-color_neutral_4 text-body-M text-color_neutral_1">
          <tr className="flex w-full items-center justify-between">
            <th className="flex h-14 w-2/5 items-center rounded-es rounded-ss border border-color_neutral_3 pl-4 font-normal">
              # Task Name
            </th>
            <th className="flex h-14 w-1/5 items-center border border-color_neutral_3 pl-4 font-normal">
              Task Tags
            </th>
            <th className="flex h-14 w-1/5 items-center border border-color_neutral_3 pl-4 font-normal">
              Estimate
            </th>
            <th className="flex h-14 w-1/5 items-center border border-color_neutral_3 pl-4 font-normal">
              Task Assign Name
            </th>
            <th className="flex h-14 w-1/5 items-center rounded-ee rounded-se border border-color_neutral_3 pl-4 font-normal">
              Due Date
            </th>
          </tr>
        </thead>
      </table>
      {statusOptions.map((status) => (
        <TaskTable
          key={status}
          status={status}
          tasks={tasks.filter((task) => task.status === status)}
        />
      ))}
    </div>
  );
};

export default TableView;
