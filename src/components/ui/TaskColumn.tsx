import { Cards } from "../../types";
import Card from "./Card";

interface TaskColumnProps {
    title: string;
    cards: Cards[];
}

const TaskColumn = ({ title, cards }: TaskColumnProps) => {
  return (
    <section className="flex flex-col gap-4 w-full w-max-[348px]">
      <h2 className="text-body-L font-bold text-color_neutral_1">{title}</h2>
      <div className="flex flex-col gap-4">
        {cards.map((card) => (
            <Card
              key={card.id}
              title={card.title}
              points={card.points}
              tags={card.tags}
              avatarUrl={card.avatarUrl}
            />
        ))}
      </div>
    </section>
  )
}

export default TaskColumn
