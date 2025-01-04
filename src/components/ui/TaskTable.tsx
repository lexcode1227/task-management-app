import { Status, Task } from "../../gql/graphql";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@radix-ui/react-accordion";
import TaskColumnSkeleton from "./TaskColumnSkeleton";
import ChevronDownIcon from "../../assets/icons/chevron-down.svg?react";
import { formatDate, formatEstimatePoint } from "../../libs/utils";
// import Tags from "./Tags";

interface TaskTableProps {
  status: Status;
  tasks: Task[];
}

const TaskTable = ({ status, tasks }: TaskTableProps) => {
  if (!tasks) return <TaskColumnSkeleton />;
  return (
    <Accordion className="w-full min-w-[348px]" collapsible type="single">
      <AccordionItem className="accordion-item" value="item-1">
        <AccordionTrigger className="flex h-14 w-full items-center justify-start gap-2 rounded-t border border-color_neutral_3 bg-color_neutral_4 text-body-L font-bold text-color_neutral_1">
          <ChevronDownIcon className="text-color_neutral_2" />
          {status} <p className="text-color_neutral_2">({tasks.length})</p>
        </AccordionTrigger>
        <AccordionContent className="accordion-content">
          <table className="h-auto w-full border-collapse border-spacing-x-0 border-spacing-y-[15px] rounded-xl text-justify">
            <tbody className="flex flex-col bg-color_neutral_4 text-body-M text-color_neutral_1">
              {tasks.map((task, index) => (
                <tr
                  className="flex h-14 w-full items-center justify-between text-body-M text-color_neutral_1"
                  key={task.id}
                >
                  <td className="flex h-14 w-2/5 items-center border border-color_neutral_3 pl-4">
                    {`0${index + 1}`} {task.name}
                  </td>
                  <td className="flex h-14 w-1/5 flex-wrap items-center border border-color_neutral_3 pl-4">
                    {task.tags.map((tag) => tag).join(", ")}
                    {/* {task.tags.map(tag => (
                                    <Tags key={tag} titleTag={tag} />
                                ))} */}
                  </td>
                  <td className="flex h-14 w-1/5 items-center border border-color_neutral_3 pl-4">
                    {formatEstimatePoint(task.pointEstimate)} Points
                  </td>
                  <td className="flex h-14 w-1/5 items-center truncate border border-color_neutral_3 pl-4">
                    {task.assignee?.avatar ? (
                      <div className="flex items-center gap-2">
                        <img
                          alt="avatar"
                          className="h-8 w-8 rounded-full"
                          src={task.assignee.avatar}
                        />
                        {task.assignee?.fullName}
                      </div>
                    ) : (
                      "Unassigned"
                    )}
                  </td>
                  <td className="flex h-14 w-1/5 items-center border border-color_neutral_3 pl-4">
                    {formatDate(task.dueDate)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default TaskTable;
