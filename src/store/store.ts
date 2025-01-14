import { create } from "zustand";
import { FilterTaskInput, Task, User } from "../gql/graphql";

interface AppState {
  user: User | null;
  darkMode: () => boolean;
  viewMode: "grid" | "table";
  isEditingMode: boolean;
  taskToEdit: Task | undefined;
  searchFilter: FilterTaskInput;
  isSidebarOpen: boolean;
  setUser: (user: User) => void;
  toggleDarkMode: () => void;
  setViewMode: (mode: "grid" | "table") => void;
  setIsEditingMode: (isEditingMode: boolean) => void;
  setTaskToEdit: (task: Task) => void;
  setSearchFilter: (searchFilter: FilterTaskInput) => void;
  setIsSidebarOpen: (collapseSidebar: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  darkMode: () => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return true;
    }
    return false;
  },
  viewMode: "grid",
  isEditingMode: false,
  taskToEdit: undefined,
  searchFilter: {},
  isSidebarOpen: false,
  setUser: (user: User) => set({ user }),
  toggleDarkMode: () => set((state) => ({
    darkMode: () => !state.darkMode()
  })),
  setViewMode: (mode) => set({ viewMode: mode }),
  setIsEditingMode: (isEditingMode) => set({ isEditingMode }),
  setTaskToEdit: (task) => set({ taskToEdit: task }),
  setSearchFilter: (filter) => set({ searchFilter: filter }),
  setIsSidebarOpen: (isSidebarOpen) => set({ isSidebarOpen }),
}));
