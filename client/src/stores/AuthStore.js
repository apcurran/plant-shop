import create from "zustand";

const store = (set) => ({
    user: null,
    setUser: (userInfo) => set((state) => ({
        user: userInfo
    }))
});

const useAuthStore = create(store);

export default useAuthStore;