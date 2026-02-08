import { useMutation, useQueryClient } from "@tanstack/react-query"
import { api} from "../utils/api"
import { showSuccess, showError } from "../utils/toast"
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
            showSuccess('Order created successfully!')
        },
        onError: (error) => {
            const message = error.response?.data?.message || 'Failed to create order'
            showError(message)
        }
    })
}