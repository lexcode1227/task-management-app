import { useGetTasksQuery } from "../../../gql/graphql";
import Error from "../../errors/Error";
import TaskColumn from "../TaskColumn";
import TaskColumnSkeleton from "../TaskColumnSkeleton";

const DashboardView = () => {
    const { loading, error, data } = useGetTasksQuery({
        variables: {
          input: {},
        },
      });
      console.log(data);
      const tasks = data?.tasks || [];
      
      if (loading) return <TaskColumnSkeleton/>;
      if (error) return <Error message={error.message} />;
    
    const statusColumn = [...new Set(tasks.map((task) => task.status))];

      return (
        <section className="w-full flex-1 overflow-x-auto overscroll-x-none scroll-hidden">
          <div className="flex min-w-max gap-8">
            {statusColumn.map((status) => (
              <TaskColumn
                    key={status}
                    status={status}
                    tasks={tasks.filter(task => task.status === status)}
                />
            ))}
          </div>
        </section>
      );
};

export default DashboardView
