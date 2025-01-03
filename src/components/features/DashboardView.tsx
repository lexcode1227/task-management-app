import { useGetTasksQuery } from "../../gql/graphql";
import ErrorLayout from "./../errors/Error";
import TaskColumnSkeleton from "../ui/TaskColumnSkeleton";
import { useAppStore } from "../../store/store";
import GridView from "./GridView";
import TableView from "./TableView";

const DashboardView = () => {
    const viewMode = useAppStore((state) => state.viewMode);

    const { loading, error, data } = useGetTasksQuery({
        variables: {
          input: {},
        },
      });
      const tasks = data?.tasks || [];
      
      if (loading) return <TaskColumnSkeleton/>;
      if (error) return <ErrorLayout message={error.message} />;
    
    const statusOptions = [...new Set(tasks.map((task) => task.status))];

      return (
        <section className="w-full flex-1 overflow-x-auto overscroll-x-none scroll-hidden">
          { viewMode === "grid" ? 
            <GridView statusOptions={statusOptions} tasks={tasks} />
          : 
            <TableView statusOptions={statusOptions} tasks={tasks} />
          }
        </section>
      );
};

export default DashboardView
