import { useGetTasksQuery } from "../../gql/graphql";
import { useAppStore } from "../../store/store";
import Error from "../errors/Error";
import TaskColumnSkeleton from "../ui/loadingSkeletons/TaskColumnSkeleton";
import GridView from "./GridView";
import TableView from "./TableView";

const MyTasksView = () => {
  const viewMode = useAppStore((state) => state.viewMode);
  const user = useAppStore((state) => state.user);
  const searchByTaskName = useAppStore((state) => state.searchByTaskName);

  const { loading, error, data } = useGetTasksQuery({
    variables: searchByTaskName !== ""
    ? { input: { name: searchByTaskName, assigneeId: user?.id } }
    : {
        input: {
          assigneeId: user?.id,
        },
      },
  });
  
  const tasks = data?.tasks || [];

  if (loading) return <TaskColumnSkeleton />;
  if (error) return <Error message={error.message} />;

  const statusOptions = [...new Set(tasks.map((task) => task.status))];

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

export default MyTasksView;
