import { useGetTasksQuery } from "../../gql/graphql";
import Error from "./../errors/Error";
import TaskColumnSkeleton from "../ui/loadingSkeletons/TaskColumnSkeleton";
import { useAppStore } from "../../store/store";
import GridView from "./GridView";
import TableView from "./TableView";
import { statusOptions } from "../../libs/utils";

const DashboardView = () => {
  const viewMode = useAppStore((state) => state.viewMode);
  const searchFilter = useAppStore((state) => state.searchFilter);

  const { loading, error, data } = useGetTasksQuery({
    variables: { input: searchFilter },
  });

  const tasks = data?.tasks || [];

  if (loading) return <TaskColumnSkeleton />;
  if (error) return <Error message={error.message} />;
  
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
