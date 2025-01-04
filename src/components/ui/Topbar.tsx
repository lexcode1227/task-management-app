import DashboardIcon from "../../assets/icons/menu-square.svg?react";
import TasksIcon from "../../assets/icons/menu-hamburguer.svg?react";
import DialogModal from "./DialogModal";
import { useAppStore } from "../../store/store";

const Topbar = () => {
  const viewMode = useAppStore((state) => state.viewMode);
  const setViewMode = useAppStore((state) => state.setViewMode);

  return (
    <div className="mt-9 flex items-center justify-between">
      <div className="flex gap-2">
        <button
          className={`p-2 ${viewMode === "table" ? "rounded-lg border border-color_primary_4 text-color_primary_4" : "bg-transparent text-color_neutral_1"}`}
          onClick={() => setViewMode("table")}
        >
          <TasksIcon height={24} width={24} />
        </button>
        <button
          className={`p-2 ${viewMode === "grid" ? "rounded-lg border border-color_primary_4 text-color_primary_4" : "bg-transparent text-color_neutral_1"}`}
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
