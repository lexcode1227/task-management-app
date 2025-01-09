import MenuDotsIcon from "../../assets/icons/menu-dots.svg?react";
import ClockIcon from "../../assets/icons/clock-icon.svg?react";
import MessageIcon from "../../assets/icons/message-icon.svg?react";
import SchemaIcon from "../../assets/icons/schema-icon.svg?react";
import FileIcon from "../../assets/icons/file-icon.svg?react";
import DeleteIcon from "../../assets/icons/delete-icon.svg?react";
import EditIcon from "../../assets/icons/edit-icon.svg?react";
import Tags from "./Tags";
import Dropdown from "./Dropdown";
import { Task, useDeleteTaskMutation } from "../../gql/graphql";
import ErrorLayout from "../errors/Error";
import { toast } from "sonner";
import LoadingSpinner from "./loadingSkeletons/LoadingSpinner";
import { useAppStore } from "../../store/store";
import {  formatDueDate, formatEstimatePoint, getRandomNum, getTodayDate } from "../../libs/utils";

interface CardProps {
  task: Task;
  draggable?: boolean;
  "data-label"?: string;
}

const Card = ({ task }: CardProps) => {
  const setIsEditingMode = useAppStore((state) => state.setIsEditingMode);
  const setTaskToEdit = useAppStore((state) => state.setTaskToEdit);
  const [deleteTaskMutation, { loading, error }] = useDeleteTaskMutation({
    update(cache, { data }) {
      if (!data?.deleteTask) return;

      cache.modify({
        fields: {
          tasks(existingTasks = [], { readField }) {
            return existingTasks.filter(
              (taskRef: any) => readField("id", taskRef) !== data.deleteTask.id,
            );
          },
        },
      });
    },
    refetchQueries: ["getTasks"],
  });

  const handleDelete = async () => {
    
    try {
      if (confirm(`Deleting task with id: ${task.id}`) == true) {
        (await deleteTaskMutation({
          variables: {
            input: {
              id: task.id,
            },
          },
        }));
      toast.success(`Task with ID:${task.id} deleted successfully`);
      }
    } catch (err) {
      toast.error(
        `Error deleting task with ID: ${task.id} due to: ${error?.message}`,
      );
    }
  };

  const handleEdit = () => {
    setIsEditingMode(true);
    setTaskToEdit(task);
  };

  if (loading) return <LoadingSpinner />; 
  if (error) return <ErrorLayout message={error.message} />;

  return (
    <article
      id={task.id}
      className="flex h-auto w-full flex-col items-center gap-[15px] rounded-lg bg-color_neutral_4 p-4 text-white"
    >
      <div className="flex w-full items-center justify-between">
        <h3 className="kanban-handle py-[2.5px] text-body-L font-bold">
          {task.name}
        </h3>
        <Dropdown
          icon={<MenuDotsIcon height={24} width={24} />}
          options={[
            {
              label: "Edit",
              icon: <EditIcon />,
              onClick: () => handleEdit(),
            },
            {
              label: "Delete",
              icon: <DeleteIcon />,
              onClick: () => handleDelete(),
            },
          ]}
        />
      </div>
      <div className="flex w-full items-center justify-between">
        <h4 className="text-body-M font-bold">
          {formatEstimatePoint(task.pointEstimate)} Points
        </h4>
        <Tags
          icon={<ClockIcon />}
          titleTag={formatDueDate(task.dueDate)}
          variant={
            getTodayDate() > task.dueDate ||
            formatDueDate(task.dueDate) === "YESTERDAY"
              ? "RAILS"
              : undefined
          }
        />
      </div>
      <div className="flex w-full flex-wrap items-center justify-start gap-2">
        {task?.tags?.map((tag) => (
          <Tags key={tag} titleTag={tag} variant={tag} />
        ))}
      </div>
      <div className="flex w-full items-center justify-between">
        <img
          alt="user avatar"
          className="w-8 rounded-full"
          src={
            task.assignee?.avatar ||
            "https://eu.ui-avatars.com/api/?name=HenryAgustin&size=250"
          }
        />
        <div className="flex items-center justify-between gap-4">
          <FileIcon height={24} width={24} />
          <div className="flex items-center justify-between gap-1">
            <span>{getRandomNum()}</span>
            <SchemaIcon height={24} width={24} />
          </div>
          <div className="flex items-center justify-between gap-1">
            <span>{getRandomNum()}</span>
            <MessageIcon height={24} width={24} />
          </div>
        </div>
      </div>
    </article>
  );
};

export default Card;
