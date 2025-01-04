import { create } from "zustand";

interface AppState {
  user: { name: string; avatar: string } | null;
  darkMode: boolean;
  viewMode: "grid" | "table";
  setUser: (user: { name: string; avatar: string }) => void;
  toggleDarkMode: () => void;
  setViewMode: (mode: "grid" | "table") => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  darkMode: false,
  viewMode: "grid",
  setUser: (user) => set({ user }),
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  setViewMode: (mode) => set({ viewMode: mode }),
}));
