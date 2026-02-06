import { create } from "zustand"

export const useOrderStore = create((set) => ({
    orders: [],
    stats: [],
    loading: false,
    error: null,
    page: 1,
    perPage: 10,
    setPage: (page) => set({ page }),
    setPerPage: (perPage) => set({ perPage })
}))