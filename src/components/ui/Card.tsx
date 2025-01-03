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

const Card = ({ task }: { task: Task }) => {
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
  });

  const handleDelete = async () => {
      try {
        confirm(`Deleting task with id: ${task.id}`) == true &&
        await  deleteTaskMutation({
            variables: {
              input: {
                id: task.id,
              },
            },
        });
        toast.success(`Task with ID:${task.id} deleted successfully`);
      } catch (err) {
        toast.error(`Error deleting task with ID: ${task.id} due to: ${error?.message}`);
      }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorLayout message={error.message} />;

  return (
    <article className="flex h-52 w-full flex-col items-center gap-4 rounded-lg bg-color_neutral_4 p-4 text-white">
      <div className="flex w-full items-center justify-between">
        <h3 className="py-[2.5px] text-body-L font-bold">{task.name}</h3>
        <Dropdown
          icon={<MenuDotsIcon width={24} height={24} />}
          options={[
            {
              label: "Edit",
              icon: <EditIcon />,
              onClick: () => console.log("Edit"),
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
        <h4 className="text-body-M font-bold">{task.pointEstimate}</h4>
        <Tags
          titleTag="Today"
          icon={<ClockIcon />}
          bgColor="bg-color_neutral_2/10"
          textColor="text-color_neutral_1"
        />
      </div>
      <div className="flex w-full items-center justify-start gap-2">
        {task?.tags?.map((tag, index) => <Tags key={index} titleTag={tag} />)}
      </div>
      <div className="flex w-full items-center justify-between">
        <img
          src={
            task.assignee?.avatar ||
            "https://eu.ui-avatars.com/api/?name=HenryAgustin&size=250"
          }
          alt="user avatar"
          className="w-8 rounded-full"
        />
        <div className="flex items-center justify-between gap-4">
          <FileIcon width={24} height={24} />
          <div className="flex items-center justify-between gap-1">
            <span>5</span>
            <SchemaIcon width={24} height={24} />
          </div>
          <div className="flex items-center justify-between gap-1">
            <span>3</span>
            <MessageIcon width={24} height={24} />
          </div>
        </div>
      </div>
    </article>
  );
};

export default Card