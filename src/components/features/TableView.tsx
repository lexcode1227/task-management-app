import { Status, Task } from "../../gql/graphql";
import TaskTable from "../ui/TaskTable";

interface TableViewProps {
  statusOptions: Status[];
  tasks: Task[];
}

const TableView = ({ statusOptions, tasks} : TableViewProps) => {
  return (
    <div className="min-w-max flex flex-col gap-8 overflow-y-auto h-[calc(100vh-240px)]">
      <table className="w-full min-w-[348px] h-auto text-justify border-collapse border-spacing-y-[15px] border-spacing-x-0">
        <thead className="flex text-body-M text-color_neutral_1 bg-color_neutral_4 h-14 rounded-md">
            <tr className="flex justify-between items-center w-full">
                <th className="flex items-center pl-4 w-2/5 font-normal border border-color_neutral_3 h-14 rounded-ss rounded-es"># Task Name</th>
                <th className="flex items-center pl-4 w-1/5 font-normal border border-color_neutral_3 h-14">Task Tags</th>
                <th className="flex items-center pl-4 w-1/5 font-normal border border-color_neutral_3 h-14">Estimate</th>
                <th className="flex items-center pl-4 w-1/5 font-normal border border-color_neutral_3 h-14">Task Assign Name</th>
                <th className="flex items-center pl-4 w-1/5 font-normal border border-color_neutral_3 h-14 rounded-se rounded-ee">Due Date</th>
            </tr>
        </thead>
      </table>
      {statusOptions.map((status) => (
        <TaskTable
          key={status}
          status={status}
          tasks={tasks.filter(task => task.status === status)}
        />
      ))}
  </div>
  )
}

export default TableView
