import TaskColumn from "../components/ui/TaskColumn";
import TaskColumnSkeleton from "../components/ui/TaskColumnSkeleton";
import { useGetTasksQuery } from "../gql/graphql";

const Dashboard = () => {
  const { loading, error, data } = useGetTasksQuery({
    variables: {
      input: {},
    },
  });
  console.log(data);
  
  if (loading) return <TaskColumnSkeleton/>;
  if (error) return <p>Error</p>;

  const backlogTasks = data?.tasks.filter(
    (task) => task.status === "BACKLOG",
  );
  const todoTasks = data?.tasks.filter((task) => task.status === "TODO");
  const inProgressTasks = data?.tasks.filter(
    (task) => task.status === "IN_PROGRESS",
  );
  const cancelledTasks = data?.tasks.filter(
    (task) => task.status === "CANCELLED",
  );
  return (
    <section className="w-[1108px] flex-1 overflow-x-auto overscroll-x-none scroll-hidden">
      <div className="flex min-w-max gap-8">
        <TaskColumn title="Backlogs" cards={backlogTasks} />
        <TaskColumn title="Todo" cards={todoTasks} />
        <TaskColumn title="In Progress" cards={inProgressTasks} />
        <TaskColumn title="Cancelled" cards={cancelledTasks} />
      </div>
    </section>
  );
};

export default Dashboard;
