import { useEffect, useState } from "react";
import { Status, Task, useUpdateTaskMutation } from "../../gql/graphql";
import { formatStatus } from "../../libs/utils";
import Card from "./Card";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";

interface TaskColumnProps {
  status: Status;
  tasks: Task[] | undefined;
}

// interface HandleUpdateTask {
//   taskId: string;
//   newTaskStatus: Status;
// }

const TaskColumn = ({ status, tasks }: TaskColumnProps) => {
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
    refetchQueries: ["getTasks"],
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
    }  };

  const [taskListRef, _taskItems, setTaskItems] = useDragAndDrop<HTMLDivElement, Task>(taskList, {
    group: "taskList",
    onDragend: async (selectedTask) => {      
      const draggedTask = selectedTask.draggedNode.data.value as Task;
      const newStatus = selectedTask.parent?.el?.id as Status;

      if (newStatus && draggedTask.status !== newStatus) {
        console.log("Task moved to another status");        
        await handleDrop(draggedTask, newStatus);
      } else {
        await handleReorder(selectedTask.values as Task[]);
        console.log("Task moved within the same status");
      }
    },
  });

  useEffect(() => {
    setTaskList(tasks ?? []);
    setTaskItems(tasks ?? []);
    
  }, [tasks, status]);

  return (
    <section className="flex w-full min-w-[348px] max-w-[350px] flex-1 flex-col gap-4">
      <h2 className="text-body-L font-bold text-color_neutral_1">
        {formatStatus(status)} ({taskList.length})
      </h2>
      <div
        className="flex h-[calc(100vh-240px)] flex-col gap-4 overflow-y-auto"
        id={status}
        ref={taskListRef}
      >
        {taskList.length !== 0 ? (
          taskList.map((task) => <Card key={task.id} task={task} data-label={task.id} />)
        ) : (
          <p className="text-body-L text-color_neutral_2">No tasks found</p>
        )}
      </div>
    </section>
  );
};


export default TaskColumn;
