import { create } from 'zustand';
import {persist} from 'zustand/middleware'

interface UIStore {
    feedView: number;
    setFeedView: (feedView: number) => void;
}

// UI Settings Store
export const useUIStore = create(persist<UIStore>(
    (set) => ({
        feedView: 1,
        setFeedView: (feedView: number) => set({ feedView }),
    }), {
        name: 'ui-settings',
    }
));
