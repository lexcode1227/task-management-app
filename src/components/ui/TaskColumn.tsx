import { Cards } from "../../types";
import Card from "./Card";

interface TaskColumnProps {
    title: string;
    cards: Cards[];
}

const TaskColumn = ({ title, cards }: TaskColumnProps) => {  
  return (
    <section className="lg:w-[348px] flex w-full flex-col gap-4">
      <h2 className="text-body-L font-bold text-color_neutral_1">{title}</h2>
      <div className="flex h-[calc(100vh-240px)] flex-col gap-4 overflow-y-auto">
        {cards.map((card) => (
          <Card
            key={card.id}
            name={card.name}
            points={card.pointEstimate}
            tags={card.tags}
            avatar={card.assignee.avatar}
          />
        ))}
      </div>
    </section>
  );
}

export default TaskColumn
