import { useMutation, useQueryClient } from "@tanstack/react-query"
import { api} from "../utils/api"
import toast from "react-hot-toast"
import { normalizeJsonApi } from "../utils/jsonApi.js"

export function useCreateOrder() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (payload) => {
            const { data } = await api.post('/orders', {
                order: payload
            })
            return normalizeJsonApi(data)
        },
        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: ["orders"]
                }),
                queryClient.invalidateQueries({
                    queryKey: ["order-stats"]
                })
            ])
            toast.success('Order created successfully!')
        },
        onError: () => {
            const message = error.response?.data?.message || 'Failed to create order'
            toast.error(message)
        }
    })
}