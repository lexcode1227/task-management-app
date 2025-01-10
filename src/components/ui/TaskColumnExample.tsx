import { useEffect, useState } from "react";
import { useUpdateTaskMutation } from "../../gql/graphql";
import { Status, Task } from "../../gql/graphql";
import {  useDragAndDrop } from "@formkit/drag-and-drop/react";
import Card from "./Card";
import { formatStatus } from "../../libs/utils";

interface TaskColumnExampleProps {
  status: Status;
  tasks: Task[];
}

// interface HandleUpdateTask {
//   taskId: string;
//   newTaskStatus: Status;
// }

// const TaskColumnExample = ({ status, tasks }: TaskColumnExampleProps) => {
//   const [taskListArray, setTaskListArray] = useState<Task[]>(tasks);
//   console.log(tasks);
  
//   const parentRef = useRef<HTMLDivElement>(null);
//   const [updateTaskMutation] = useUpdateTaskMutation();

//   useEffect(() => {
//     setTaskListArray(tasks);
//   }, [tasks, status]);

//     const handleDrop = async ({ taskId, newTaskStatus}: HandleUpdateTask) => {
//         try {
//         await updateTaskMutation({
//             variables: {
//             input: {
//                 id: taskId,
//                 status: newTaskStatus,
//             },
//             }
//         });

//         setTaskListArray((prevTasks) =>
//             prevTasks.map((task) =>
//             task.id === taskId ? { ...task, status: newTaskStatus } : task,
//             ),
//         );
//         } catch (error) {
//         console.error("Failed to update task status:", error);
//         }
//     };

//   useEffect(() => {
//     if (parentRef.current) {
//       dragAndDrop({
//         parent: parentRef.current,
//         state: [
//           taskListArray,
//           (updatedTasks: any) => {
//             updatedTasks.forEach((task: any) => {
//               if (task.status !== status) {
//                 handleDrop({ taskId: task.id, newTaskStatus: status });
//               }
//             });
//           },
//         ],
//         group: "taskList",
//         onDragend: (updatedTask: any) => {
//             console.log(updatedTask);
//             console.log(updatedTask.parent);
//             console.log(updatedTask.draggedNode);
//             console.log(status);
            
//           if (updatedTask.parent?.el?.id !== status) {
//             handleDrop({
//               taskId: (updatedTask.draggedNode.data.value as Task).id,
//               newTaskStatus: updatedTask.parent.el.id as Status,
//             });
//           }
//         },
//       });
//     }
//   }, [taskListArray, status]);

//   return (
//     <section className="flex w-full min-w-[348px] max-w-[350px] flex-1 flex-col gap-4">
//       <h2 className="text-body-L font-bold text-color_neutral_1">
//         {formatStatus(status)} ({taskListArray.length})
//       </h2>
//       <div
//         className="flex h-[calc(100vh-240px)] flex-col gap-4 overflow-y-auto"
//         id={status}
//         ref={parentRef}
//       >
//         {taskListArray.length !== 0 ? (
//           taskListArray.map((task) => (
//             <Card
//               key={task.id}
//               task={task}
//               data-label={task.id}
//             />
//           ))
//         ) : (
//           <p className="text-body-L text-color_neutral_2">No tasks found</p>
//         )}
//       </div>
//     </section>
//   );
// };

const TaskColumnExample = ({ status, tasks }: TaskColumnExampleProps) => {
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

  const handleReorder = (reorderedTasks: Task[]) => {
    setTaskList(reorderedTasks);
  };

  const [taskListRef, taskItems] = useDragAndDrop<HTMLDivElement, Task>(taskList, {
    group: "taskList",
    onDragend: async (updatedTask: any) => {
      const draggedTask = updatedTask.draggedNode.data.value as Task;
      const newStatus = updatedTask.parent?.el?.id as Status;

      if (newStatus && draggedTask.status !== newStatus) {
        await handleDrop(draggedTask, newStatus);
      } else {
        handleReorder(updatedTask.values);
      }
    },
  });

  useEffect(() => {
    setTaskList(tasks ?? []);
  }, [tasks, taskItems]);

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


export default TaskColumnExample;
