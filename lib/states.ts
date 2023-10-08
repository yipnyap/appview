import {create} from 'zustand';
import {persist} from 'zustand/middleware'

interface UIStore {
    feedView: number;
    analyticalAllowed: boolean;

    setOptions: (options: object) => void;
}

// UI Settings Store
export const useUIStore = create(persist<UIStore>(
    (set) => ({
        feedView: 1,
        analyticalAllowed: false,

        setOptions: (options) => set((state) => ({
            ...state,
            ...options,
        })),
    }), {
        name: 'ui-settings',
    }
));

/**
 * User Account Store
 * Holds the user's account information, refresh token, etc.
 */
interface UserAccountStore {
    accessToken: string;
    user: any;
    setAccessToken: (accessToken: string) => void;
    setUser: (user: any) => void;
}

export const useUserAccountStore = create(persist<UserAccountStore>(
    (set) => ({
        accessToken: '',
        user: null,

        setAccessToken: (accessToken) => set((state) => ({
            ...state,
            accessToken,
        })),
        setUser: (user: any) => set((state) => ({
            ...state,
            user,
        })),
    }), {
        name: 'user-account',
    }
));