import { useGetTasksQuery } from "../../gql/graphql";
import { useAppStore } from "../../store/store";
import ErrorLayout from "../errors/Error";
import TaskColumnSkeleton from "../ui/loadingSkeletons/TaskColumnSkeleton";
import GridView from "./GridView";
import TableView from "./TableView";

const MyTasksView = () => {
  const viewMode = useAppStore((state) => state.viewMode);

  const { loading, error, data } = useGetTasksQuery({
    variables: {
      input: {
        assigneeId: "703de395-1d49-4471-aafa-d990dcf32cd1",
      },
    },
  });
  console.log(data);
  const tasks = data?.tasks || [];

  if (loading) return <TaskColumnSkeleton />;
  if (error) return <ErrorLayout message={error.message} />;

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
