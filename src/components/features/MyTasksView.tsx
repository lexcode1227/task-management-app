import { useGetTasksQuery } from "../../gql/graphql";
import { useAppStore } from "../../store/store";
import ErrorLayout from "../errors/Error";
import TaskColumnSkeleton from "../ui/loadingSkeletons/TaskColumnSkeleton";
import GridView from "./GridView";
import TableView from "./TableView";

const MyTasksView = () => {
  const viewMode = useAppStore((state) => state.viewMode);
  const searchByTaskName = useAppStore((state) => state.searchByTaskName);

  const { loading, error, data } = useGetTasksQuery({
    variables: {
      input: {
        assigneeId: "b1875381-1ae2-4a11-a3eb-2493dba0eb13",
      },
    },
  });
  
  const tasks = data?.tasks || [];
  const filteredTasks = tasks.filter((task) => {
    return task.name.toLowerCase().includes(searchByTaskName.toLowerCase());
  });

  if (loading) return <TaskColumnSkeleton />;
  if (error) return <ErrorLayout message={error.message} />;

  const statusOptions = [...new Set(tasks.map((task) => task.status))];

  return (
    <section className="scroll-hidden w-full flex-1 overflow-x-auto overscroll-x-none">
      {viewMode === "grid" ? (
        <GridView statusOptions={statusOptions} tasks={searchByTaskName !== "" ? filteredTasks : tasks} />
      ) : (
        <TableView statusOptions={statusOptions} tasks={searchByTaskName !== "" ? filteredTasks : tasks} />
      )}
    </section>
  );
};

export default MyTasksView;
