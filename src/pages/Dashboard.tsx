import { gql, useQuery } from "@apollo/client";
import TaskColumn from "../components/ui/TaskColumn";

const GET_TASKS = gql`
  query getTasks ($input: FilterTaskInput!) {
    tasks(input: $input) {
      id
      assignee {
        id
        avatar
      }
      tags
      status
      pointEstimate
      name
    }
  }
`;

const Dashboard = () => {
  const { loading, error, data } = useQuery(GET_TASKS, {
    variables: {
      input: {},
    },
  });
  console.log(data);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const backlogTasks = data.tasks.filter(
    (task: any) => task.status === "BACKLOG",
  );
  const todoTasks = data.tasks.filter((task: any) => task.status === "TODO");
  const inProgressTasks = data.tasks.filter(
    (task: any) => task.status === "IN_PROGRESS",
  );
  const cancelledTasks = data.tasks.filter(
    (task: any) => task.status === "CANCELLED",
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
