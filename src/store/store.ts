import { create } from "zustand";
import { Task } from "../gql/graphql";

interface AppState {
  user: { name: string; avatar: string } | null;
  darkMode: boolean;
  viewMode: "grid" | "table";
  isEditingMode: boolean;
  taskToEdit: Task | undefined;
  setUser: (user: { name: string; avatar: string }) => void;
  toggleDarkMode: () => void;
  setViewMode: (mode: "grid" | "table") => void;
  setIsEditingMode: (isEditingMode: boolean) => void;
  setTaskToEdit: (task: Task) => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  darkMode: false,
  viewMode: "grid",
  isEditingMode: false,
  taskToEdit: undefined,
  setUser: (user) => set({ user }),
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  setViewMode: (mode) => set({ viewMode: mode }),
  setIsEditingMode: (isEditingMode) => set({ isEditingMode }),
  setTaskToEdit: (task) => set({ taskToEdit: task }),
}));
