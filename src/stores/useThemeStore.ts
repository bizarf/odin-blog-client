import { create } from "zustand";

// type definition for the store
interface ThemeState {
    theme: string | undefined;
    setTheme: (theme: string | undefined) => void;
}

// creating a custom hook with Zustand. theme variable is the default state. setTheme is the function to change the theme state.
const useThemeStore = create<ThemeState>((set) => ({
    theme: undefined,
    setTheme: (theme) => set({ theme }),
}));

export default useThemeStore;
