import create from "zustand";

const store = (set) => ({
    token: "",
    user: {},
    isAdmin: false,
    setToken: (accessToken) => set((state) => ({ token: accessToken })),
    setUser: (userInfo) => set((state) => ({ user: userInfo})),
    setIsAdmin: (isAdmin) => set((state) => ({ isAdmin: isAdmin }))
});

const useAuthStore = create(store);

export default useAuthStore;