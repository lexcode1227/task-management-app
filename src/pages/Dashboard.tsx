import TaskColumn from "../components/ui/TaskColumn";

const Dashboard = () => {
  const cardsArr = [
    {
      id: 1,
      title: "Slack",
      points: "5 Points",
      tags: [
        { titleTag: "IOS APP" }
      ],
      avatarUrl: "https://eu.ui-avatars.com/api/?name=HA&size=250"
    },
    {
      id: 2,
      title: "Twitter",
      points: "3 Points",
      tags: [
        { titleTag: "IOS APP" }
      ],
      avatarUrl: "https://eu.ui-avatars.com/api/?name=HA&size=250"
    },
    {
      id: 3,
      title: "Instagram",
      points: "8 Points",
      tags: [
        { titleTag: "IOS APP" }
      ],
      avatarUrl: "https://eu.ui-avatars.com/api/?name=HA&size=250"
    },
    {
      id: 4,
      title: "Facebook",
      points: "5 Points",
      tags: [
        { titleTag: "IOS APP" }
      ],
      avatarUrl: "https://eu.ui-avatars.com/api/?name=HA&size=250"
    }
  ]
  return (
    <section className="w-full flex gap-4">
      <TaskColumn title="Working (03)" cards={cardsArr} />
      <TaskColumn title="In progress (03)" cards={cardsArr} />
      <TaskColumn title="Completed (03)" cards={cardsArr} />
    </section>
  );
};

export default Dashboard;
