import { useGetTasksQuery } from "../../gql/graphql";
import Error from "./../errors/Error";
import TaskColumnSkeleton from "../ui/loadingSkeletons/TaskColumnSkeleton";
import { useAppStore } from "../../store/store";
import GridView from "./GridView";
import TableView from "./TableView";

const DashboardView = () => {
  const viewMode = useAppStore((state) => state.viewMode);
  const searchByTaskName = useAppStore((state) => state.searchByTaskName);

  const { loading, error, data } = useGetTasksQuery({
    variables: searchByTaskName !== ""
    ? { input: { name: searchByTaskName } }
    : { input: {} },
  });

  const tasks = data?.tasks || [];

  if (loading) return <TaskColumnSkeleton />;
  if (error) return <Error message={error.message} />;

  const statusOptions = [...new Set(data?.tasks.map((task) => task.status))];

  return (
    <section className="scroll-hidden w-full flex-1 overflow-x-auto overscroll-x-none">
      {viewMode === "grid" ? (
        <GridView statusOptions={statusOptions} tasks={tasks} />
      ) : (
        <TableView statusOptions={statusOptions} tasks={tasks} />
      )}
    </section>
  );
};

export default DashboardView;
