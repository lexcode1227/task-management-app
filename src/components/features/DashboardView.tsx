import { useGetTasksQuery } from "../../gql/graphql";
import Error from "./../errors/Error";
import TaskColumn from "../ui/TaskColumn";
import TaskColumnSkeleton from "../ui/TaskColumnSkeleton";
import { useAppStore } from "../../store/store";

const DashboardView = () => {
    const viewMode = useAppStore((state) => state.viewMode);

    const { loading, error, data } = useGetTasksQuery({
        variables: {
          input: {},
        },
      });
      console.log(data);
      const tasks = data?.tasks || [];
      
      if (loading) return <TaskColumnSkeleton/>;
      if (error) return <Error message={error.message} />;
    
    const statusOptions = [...new Set(tasks.map((task) => task.status))];

      return (
        <section className="w-full flex-1 overflow-x-auto overscroll-x-none scroll-hidden">
          { viewMode === "grid" ? 
            <div className="flex min-w-max gap-8">
              {statusOptions.map((status) => (
                <TaskColumn
                      key={status}
                      status={status}
                      tasks={tasks.filter(task => task.status === status)}
                  />
              ))}
            </div>
          : 
            <div className="grid grid-cols-3 gap-8">
              <h2>Table View</h2>
            </div>
          }
        </section>
      );
};

export default DashboardView
