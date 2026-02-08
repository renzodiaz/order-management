import { useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "../utils/api"
import toast from "react-hot-toast"
import { normalizeJsonApi } from "../utils/jsonApi.js"

export function useUpdateOrder() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ id, ...payload}) => {
            const { data } = await api.patch(`/orders/${id}`, {
                order: payload
            })
            return normalizeJsonApi(data)
        },
        onMutate: async (updatedOrder) => {
            await queryClient.cancelQueries({ queryKey: ["orders"] })

            const previousOrder = queryClient.getQueryData(["orders"])

            queryClient.setQueryData(["orders"], (oldData) => {
                if (!oldData) return oldData

                return {
                    ...oldData,
                    data: oldData.data.map((order) => (order.id === updatedOrder.id ? updatedOrder : order))
                }
            })

            return { previousOrder }
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
            toast.success('Order updated successfully!')
        },
        onError: (error) => {
            const message = error.response?.data?.message || 'Failed to update order'
            toast.error(message)
        }
    })
}