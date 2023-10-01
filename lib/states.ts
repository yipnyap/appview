import { create } from 'zustand';

interface UIStore {
    feedView: number;
    setFeedView: (feedView: number) => void;
}

// UI Settings Store
export const useUIStore = create<UIStore>((set) => ({
    feedView: 1,
    setFeedView: (feedView: number) => set({ feedView }),
}));
