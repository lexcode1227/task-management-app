import { Status, Task } from "../../gql/graphql";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@radix-ui/react-accordion";
import TaskColumnSkeleton from "./TaskColumnSkeleton";
import ChevronDownIcon from "../../assets/icons/chevron-down.svg?react";
import { formatDate, formatEstimatePoint } from "../../libs/utils";
// import Tags from "./Tags";

interface TaskTableProps {
  status: Status;
  tasks: Task[];
}

const TaskTable = ({status, tasks} : TaskTableProps) => {
    if (!tasks) return <TaskColumnSkeleton />;
    return (
        <Accordion type="single" collapsible className="w-full min-w-[348px]">
            <AccordionItem value="item-1" className="accordion-item">
            <AccordionTrigger className="w-full flex gap-2 justify-start items-center bg-color_neutral_4 text-color_neutral_1 font-bold text-body-L h-14 border border-color_neutral_3 rounded-t">
                <ChevronDownIcon className="text-color_neutral_2" />
                {status} <p className="text-color_neutral_2">({tasks.length})</p>
            </AccordionTrigger>
            <AccordionContent className="accordion-content">
                <table className="w-full h-auto text-justify border-collapse border-spacing-y-[15px] border-spacing-x-0 rounded-xl">
                <tbody className="flex flex-col text-body-M text-color_neutral_1 bg-color_neutral_4">
                    {tasks.map((task, index) => (
                        <tr key={task.id} className="w-full text-body-M text-color_neutral_1 flex justify-between items-center h-14">
                            <td className="pl-4 w-2/5 h-14 border border-color_neutral_3 flex items-center">{`0${index + 1}`} {task.name}</td>
                            <td className="pl-4 w-1/5 h-14 border border-color_neutral_3 flex items-center flex-wrap">
                                {task.tags.map(tag => tag).join(', ')}
                                {/* {task.tags.map(tag => (
                                    <Tags key={tag} titleTag={tag} />
                                ))} */}
                            </td>
                            <td className="pl-4 w-1/5 h-14 border border-color_neutral_3 flex items-center">{formatEstimatePoint(task.pointEstimate)} Points</td>
                            <td className="pl-4 w-1/5 h-14 border border-color_neutral_3 flex items-center truncate">
                                {task.assignee?.avatar 
                                    ? 
                                        <div className="flex items-center gap-2">
                                            <img src={task.assignee.avatar} alt="avatar" className="w-8 h-8 rounded-full " /> 
                                            {task.assignee?.fullName}
                                        </div>
                                    : 'Unassigned'}
                            </td>
                            <td className="pl-4 w-1/5 h-14 border border-color_neutral_3 flex items-center">{formatDate(task.dueDate)}</td>
                        </tr>
                    ))}
                </tbody>
                </table>
            </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}

export default TaskTable