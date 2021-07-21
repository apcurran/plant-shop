import create from "zustand";

const store = (set) => ({
    token: null,
    user: null,
    setToken: (accessToken) => set((state) => ({ token: accessToken })),
    setUser: (userInfo) => set((state) => ({ user: userInfo}))
});

const useAuthStore = create(store);

export default useAuthStore;