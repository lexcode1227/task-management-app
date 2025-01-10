import { useEffect, useState } from "react";
import { Status, Task, useUpdateTaskMutation } from "../../gql/graphql";
import { formatStatus } from "../../libs/utils";
import Card from "./Card";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";

interface TaskColumnProps {
  status: Status;
  tasks: Task[] | undefined;
}

const TaskColumn = ({ status, tasks }: TaskColumnProps) => {
  const sortedTasks = tasks?.sort((a, b) => a.position - b.position);
  const [taskList, setTaskList] = useState<Task[]>(sortedTasks ?? []);
  
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
      if (draggedTask.status === newStatus) return
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

  const [taskListRef, _taskItems, setTaskItems] = useDragAndDrop<
    HTMLDivElement,
    Task
  >(taskList, {
    group: "taskList",
    onDragend: async (selectedTask) => {
      const draggedTask = selectedTask.draggedNode.data.value as Task;
      const newStatus = selectedTask.parent?.el?.id as Status;

      if (newStatus && draggedTask.status !== newStatus) {
        await handleDrop(draggedTask, newStatus);
      }
       else {
        await handleReorder(selectedTask.values as Task[]);
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
          taskList.map((task) => (
            <Card key={task.id} task={task} data-label={task.id} />
          ))
        ) : (
          <div className="flex w-full items-center justify-center gap-4 bg-color_neutral_4 text-color_neutral_1 rounded-lg">
            <div className="h-[208px] w-[348px] rounded-lg bg-color_neutral_4 p-4">
              <p className="text-body-xL text-color_neutral_2 rounded-lg">
                No tasks found
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};


export default TaskColumn;
