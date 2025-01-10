import { Status, Task, useUpdateTaskMutation } from "../../gql/graphql";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@radix-ui/react-accordion";
import ChevronDownIcon from "../../assets/icons/chevron-down.svg?react";
import { cn, formatDueDate, formatEstimatePoint, formatStatus, getDueDateColor, getTodayDate } from "../../libs/utils";
import Tags from "./Tags";
import GridHorizontalIcon from "../../assets/icons/grid-horizontal.svg?react";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { useState, useEffect } from "react";

interface TaskTableProps {
  status: Status;
  tasks: Task[] | undefined;
}

const TaskTable = ({ status, tasks }: TaskTableProps) => {
  const [taskList, setTaskList] = useState<Task[]>(tasks ?? []);

  const [updateTaskMutation] = useUpdateTaskMutation({
    update(cache, { data }) {
      if (!data?.updateTask) return;

      cache.modify({
        fields: {
          tasks(existingTasks = [], { readField }) {
            return existingTasks.map((taskRef: any) => {
              if (readField("id", taskRef) === data.updateTask.id) {
                return { ...taskRef, ...data.updateTask };
              }
              return taskRef;
            });
          },
        },
      });
    },
  });

  const handleDrop = async (draggedTask: Task, newStatus: Status) => {
    try {
      if (draggedTask.status === newStatus) {
        console.log("Task moved within the same status");
        return;
      }
      await updateTaskMutation({
        variables: {
          input: {
            id: draggedTask.id,
            status: newStatus,
          },
        },
      });
    } catch (error) {
      console.error("Failed to update task status:", error);
    }
  };

  const handleReorder = async (reorderedTasks: Task[]) => {
    try {
      const updatedTasks = reorderedTasks.map((task, index) => ({
        ...task,
        position: index,
      }));

      setTaskList(updatedTasks);

      for (const task of updatedTasks) {
        await updateTaskMutation({
          variables: {
            input: {
              id: task.id,
              position: task.position,
            },
          },
        });
      }
    } catch (error) {
      console.error("Failed to reorder tasks:", error);
    }
  };

  const [taskListRef, _taskItems, setTaskItems] = useDragAndDrop<HTMLTableSectionElement, Task>(taskList, {
    group: "taskList",
    dragHandle: ".kanban-handle",
    onDragend: async (selectedTask) => {
      const draggedTask = selectedTask.draggedNode.data.value as Task;
      const newStatus = selectedTask.parent?.el?.id as Status;

      if (newStatus && draggedTask.status !== newStatus) {
        await handleDrop(draggedTask, newStatus);
      } else {
        await handleReorder(selectedTask.values as Task[]);
      }
    },
  });

  useEffect(() => {
    setTaskList(tasks ?? []);
    setTaskItems(tasks ?? []);
  }, [tasks, status]);

  return (
    <Accordion className="w-full min-w-[348px]" collapsible type="single">
      <AccordionItem className="accordion-item" value="item-1">
        <AccordionTrigger className="AccordionTrigger flex h-14 w-full items-center justify-start gap-2 rounded-t border border-color_neutral_3 bg-color_neutral_4 pl-2 text-body-L font-bold text-color_neutral_1">
          <ChevronDownIcon
            className={
              "AccordionChevron text-color_neutral_2 transition-transform"
            }
            aria-hidden
          />
          {formatStatus(status)}{" "}
          <p className="text-color_neutral_2">({tasks?.length})</p>
        </AccordionTrigger>
        <AccordionContent className="accordion-content">
          <table className="h-auto w-full border-collapse border-spacing-x-0 border-spacing-y-[15px] rounded-xl text-justify">
            <tbody ref={taskListRef} className="flex flex-col bg-color_neutral_4 text-body-M text-color_neutral_1">
              {taskList?.length !== 0 ? (
                taskList?.map((task, index) => (
                  <tr
                    className="flex h-14 w-full items-center justify-between text-body-M text-color_neutral_1 last:rounded-ee-lg last:rounded-es-lg"
                    key={task.id}
                  >
                    <td className="relative flex h-14 w-2/5 min-w-80 items-center gap-3 border border-color_neutral_3 pl-4">
                      <span className="drag-handle">
                        <GridHorizontalIcon className="text-color_neutral_2" />
                      </span>
                      <span
                        className={cn("absolute left-0 h-[80%] w-1", {
                          "bg-[#DA584B]":
                            getDueDateColor(new Date(task.dueDate)) === "red",
                          "bg-yellow-500":
                            getDueDateColor(new Date(task.dueDate)) ===
                            "yellow",
                          "bg-green-500":
                            getDueDateColor(new Date(task.dueDate)) === "green",
                        })}
                      ></span>
                      <div className="flex items-center gap-2">
                        <span>{index < 9 ? `0${index + 1}` : index + 1}</span>
                        <h2>{task.name}</h2>
                      </div>
                    </td>
                    <td className="flex h-14 w-1/5 min-w-44 flex-wrap items-center justify-start gap-2 border border-color_neutral_3 pl-2">
                      {task.tags.length > 1 ? (
                        <>
                          <Tags
                            key={task.tags[0]}
                            titleTag={task.tags[0]}
                            variant={task.tags[0]}
                          />
                          <Tags
                            key="remaining"
                            titleTag={`+${task.tags.length - 1}`}
                          />
                        </>
                      ) : (
                        <Tags titleTag={task.tags[0]} variant={task.tags[0]} />
                      )}
                    </td>
                    <td className="flex h-14 w-1/5 min-w-44 items-center border border-color_neutral_3 pl-4">
                      {formatEstimatePoint(task.pointEstimate)} Points
                    </td>
                    <td className="flex h-14 w-1/5 min-w-44 items-center truncate border border-color_neutral_3 pl-4">
                      <div className="flex items-center gap-2">
                        <img
                          alt="avatar"
                          className="h-8 w-8 rounded-full"
                          src={
                            task.assignee?.avatar ||
                            "https://eu.ui-avatars.com/api/?name=HenryAgustin&size=250"
                          }
                        />
                        {task.assignee?.fullName}
                      </div>
                    </td>
                    <td
                      className={cn(
                        "flex h-14 w-1/5 min-w-44 items-center border border-color_neutral_3 pl-4",
                        {
                          "text-color_primary_3":
                            getTodayDate() > task.dueDate ||
                            formatDueDate(task.dueDate) === "YESTERDAY",
                          "text-color_neutral_1":
                            task.dueDate === new Date().getTime() ||
                            task.dueDate === new Date().getTime() + 86400000,
                        },
                      )}
                    >
                      {formatDueDate(task.dueDate) === "YESTERDAY"
                        ? "Yesterday"
                        : formatDueDate(task.dueDate)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="flex h-14 w-full items-center justify-between text-body-M text-color_neutral_1">
                  <td className="flex h-14 w-full items-center justify-center border border-color_neutral_3 pl-4">
                    No tasks found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default TaskTable;
