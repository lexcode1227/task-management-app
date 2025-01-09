import { useEffect, useRef, useState } from "react";
import { useUpdateTaskMutation } from "../../gql/graphql";
import { Status, Task } from "../../gql/graphql";
import { dragAndDrop } from "@formkit/drag-and-drop/react";
import Card from "./Card";
import { formatStatus } from "../../libs/utils";

interface TaskColumnExampleProps {
  status: Status;
  tasks: Task[];
}

interface HandleUpdateTask {
  taskId: string;
  newTaskStatus: Status;
}

const TaskColumnExample = ({ status, tasks }: TaskColumnExampleProps) => {
  const [taskListArray, setTaskListArray] = useState<Task[]>(tasks);
  const parentRef = useRef<HTMLDivElement>(null);
  const [updateTaskMutation] = useUpdateTaskMutation();

  useEffect(() => {
    setTaskListArray(tasks);
  }, [tasks]);

    const handleDrop = async ({ taskId, newTaskStatus}: HandleUpdateTask) => {
        try {
        await updateTaskMutation({
            variables: {
            input: {
                id: taskId,
                status: newTaskStatus,
            },
            }
        });

        setTaskListArray((prevTasks) =>
            prevTasks.map((task) =>
            task.id === taskId ? { ...task, status: newTaskStatus } : task,
            ),
        );
        } catch (error) {
        console.error("Failed to update task status:", error);
        }
    };

  useEffect(() => {
    if (parentRef.current) {
      dragAndDrop({
        parent: parentRef.current,
        // state: [taskListArray, setTaskListArray],
        state: [
          taskListArray,
          (updatedTasks: any) => {
            updatedTasks.forEach((task: any) => {
              if (task.status !== status) {
                handleDrop({ taskId: task.id, newTaskStatus: status });
              }
            });
          },
        ],
        onDragend: (updatedTask: any) => {
            console.log(updatedTask.parent);
            console.log(updatedTask.draggedNode);
            console.log(status);
            
          if (updatedTask.parent?.el?.id !== status) {
            handleDrop({
              taskId: (updatedTask.draggedNode.data.value as Task).id,
              newTaskStatus: updatedTask.parent.el.id as Status,
            });
          }
        },
      });
    }
  }, [taskListArray, status]);

  return (
    <section className="flex w-full min-w-[348px] max-w-[350px] flex-1 flex-col gap-4">
      <h2 className="text-body-L font-bold text-color_neutral_1">
        {formatStatus(status)} ({taskListArray.length})
      </h2>
      <div
        className="flex h-[calc(100vh-240px)] flex-col gap-4 overflow-y-auto"
        id={status}
        ref={parentRef}
      >
        {taskListArray.length !== 0 ? (
          taskListArray.map((task) => (
            <Card
              key={task.id}
              task={task}
              draggable={true}
              data-label={task.id}
            />
          ))
        ) : (
          <p className="text-body-L text-color_neutral_2">No tasks found</p>
        )}
      </div>
    </section>
  );
};

export default TaskColumnExample;
