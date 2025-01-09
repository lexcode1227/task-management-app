import { Status, Task, useUpdateTaskMutation } from "../../gql/graphql";
import { formatStatus } from "../../libs/utils";
import Card from "./Card";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";

interface TaskColumnProps {
  status: Status;
  tasks: Task[];
}

interface HandleUpdateTask {
  taskId: string;
  newTaskStatus: Status;
}

const TaskColumn = ({ status, tasks }: TaskColumnProps) => {
  console.log("Tasks: "+ tasks);
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
    refetchQueries: ["getTasks"],
  });

  const handleDrop = async ({ taskId, newTaskStatus }: HandleUpdateTask) => {
    try {
      await updateTaskMutation({
        variables: {
          input: {
            id: taskId,
            status: newTaskStatus,
          },
        },
      });
    } catch (error) {
      console.error("Failed to update task status:", error);
    }
  };

  const [taskListRef, taskItems] = useDragAndDrop<HTMLDivElement, Task>(tasks, {
    group: "taskList",
    onDragend: async ({ parent, draggedNode }) => {
      if (parent?.el?.id !== status) {
        handleDrop({
          taskId: (draggedNode.data.value as Task).id,
          newTaskStatus: parent.el.id as Status,
        });
      }
    },
  });

  return (
    <section className="flex w-full min-w-[348px] max-w-[350px] flex-1 flex-col gap-4">
      <h2 className="text-body-L font-bold text-color_neutral_1">
        {formatStatus(status)} ({tasks.length})
      </h2>
      <div
        className="flex h-[calc(100vh-240px)] flex-col gap-4 overflow-y-auto"
        id={status}
        ref={taskListRef}
      >
        {tasks.length !== 0 ? (
          taskItems?.map((task) => (
            <Card key={task.id} task={task} data-label={task.id} />
          ))
        ) : (
          <p className="text-body-L text-color_neutral_2">No tasks found</p>
        )}
      </div>
    </section>
  );
};

export default TaskColumn;
