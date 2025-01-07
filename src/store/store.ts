import { create } from "zustand";
import { Task, User } from "../gql/graphql";

interface AppState {
  user: User | null;
  darkMode: boolean;
  viewMode: "grid" | "table";
  isEditingMode: boolean;
  taskToEdit: Task | undefined;
  searchByTaskName: string;
  isSidebarOpen: boolean;
  setUser: (user: User) => void;
  toggleDarkMode: () => void;
  setViewMode: (mode: "grid" | "table") => void;
  setIsEditingMode: (isEditingMode: boolean) => void;
  setTaskToEdit: (task: Task) => void;
  setSearchByTaskName: (searchByTaskName: string) => void;
  setIsSidebarOpen: (collapseSidebar: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  darkMode: false,
  viewMode: "grid",
  isEditingMode: false,
  taskToEdit: undefined,
  searchByTaskName: "",
  isSidebarOpen: false,
  setUser: (user: User) => set({ user }),
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  setViewMode: (mode) => set({ viewMode: mode }),
  setIsEditingMode: (isEditingMode) => set({ isEditingMode }),
  setTaskToEdit: (task) => set({ taskToEdit: task }),
  setSearchByTaskName: (searchByTaskName) => set({ searchByTaskName }),
  setIsSidebarOpen: (isSidebarOpen) => set({ isSidebarOpen }),
}));
