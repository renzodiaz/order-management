import {useMutation, useQueryClient} from "@tanstack/react-query";
import {api} from "../utils/api.js";
import { showSuccess, showError } from "../utils/toast"

export function useDeleteOrder() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (id) => {
            await api.delete(`/orders/${id}`)
        },
        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({queryKey: ["orders"]}),
                queryClient.invalidateQueries({queryKey: ["order-stats"]})
            ])
            showSuccess('Order deleted successfully!')
        },
        onError: (error) => {
            const message = error.response?.data?.message || 'Failed to delete order'
            showError(message)
        }
    })
}