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

/**
 * Resource store
 */
interface ResourceStore {
    currentResource: any;
    resources: any[];
    setCurrentResource: (currentResource: any) => void;
    setResources: (resources: any[]) => void;
}

const resourceDefault = {
    id: '',
    name: `Pre Alpha ${process.env.NEXT_PUBLIC_COMMIT_HASH}`,
    standalone: true,
    available: true,
}

export const useResourceStore = create(persist<ResourceStore>(
    (set) => ({
        currentResource: resourceDefault,
        resources: [],
        setCurrentResource: (currentResource) => set((state) => ({
            ...state,
            currentResource,
        })),
        setResources: (resources) => set((state) => ({
            ...state,
            resources,
        })),
    }),
    {
        name: 'resource',
    }
));

/**
 * Resource UI store, not persistent
 */
interface ResourceUIStore {
    resourceDefault: {
        id: string | number;
        name: string;
        standalone: boolean;
        available: boolean;
    }
    loading: boolean;
    setLoading: (loading: boolean) => void;
}

export const useResourceUIStore = create<ResourceUIStore>(
    (set) => ({
        resourceDefault,
        loading: false,
        setLoading: (loading) => set((state) => ({
            ...state,
            loading,
        })),
    })
);
