import DashboardIcon from "../../assets/icons/menu-square.svg?react";
import TasksIcon from "../../assets/icons/menu-hamburguer.svg?react";
import DialogModal from "./DialogModal";
import { useAppStore } from "../../store/store";
import { cn } from "../../libs/utils";

const Topbar = () => {
  const viewMode = useAppStore((state) => state.viewMode);
  const setViewMode = useAppStore((state) => state.setViewMode);

  return (
    <div className="mt-9 flex items-center justify-between">
      <div className="flex gap-2">
        <button
          className={cn("p-2", {
            "rounded-lg border border-color_primary_4 text-color_primary_4":
              viewMode === "table",
            "bg-transparent text-color_neutral_1": viewMode !== "table",
          })}
          onClick={() => setViewMode("table")}
        >
          <TasksIcon height={24} width={24} />
        </button>
        <button
          className={cn("p-2", {
            "rounded-lg border border-color_primary_4 text-color_primary_4":
              viewMode === "grid",
            "bg-transparent text-color_neutral_1": viewMode !== "grid",
          })}
          onClick={() => setViewMode("grid")}
        >
          <DashboardIcon height={24} width={24} />
        </button>
      </div>
      <DialogModal />
    </div>
  );
};

export default Topbar;
