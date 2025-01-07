import { useGetTasksQuery } from "../../gql/graphql";
import ErrorLayout from "./../errors/Error";
import TaskColumnSkeleton from "../ui/loadingSkeletons/TaskColumnSkeleton";
import { useAppStore } from "../../store/store";
import GridView from "./GridView";
import TableView from "./TableView";

const DashboardView = () => {
  const viewMode = useAppStore((state) => state.viewMode);
  const searchByTaskName = useAppStore((state) => state.searchByTaskName);

  const { loading, error, data } = useGetTasksQuery({
    variables: {
      input: {},
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

export default DashboardView;
