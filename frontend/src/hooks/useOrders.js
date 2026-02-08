import { useQuery } from "@tanstack/react-query"
import { api } from "../utils/api"
import { normalizeJsonApi } from "../utils/jsonApi";
import { useOrderStore } from "./stores/useOrderStore.js";

const fetchOrders = async ({page, perPage}) => {
    const { data } = await api.get('/orders', {
        params: {
            page,
            per_page: perPage,
        },
    })

    return normalizeJsonApi(data)
}

const fetchStats = async () => {
    const { data } = await api.get('/stats')
    return data
}

export const useOrders = () => {
    const { page, perPage } = useOrderStore()

    return useQuery({
        queryKey: ['orders', page, perPage],
        queryFn: () => fetchOrders({page, perPage})
    })
}

export const useOrderStats = () => {
    return useQuery({
        queryKey: ['order-stats'],
        queryFn: () => fetchStats(),
        staleTime: 30_000
    })
}