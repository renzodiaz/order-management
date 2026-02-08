import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { orderSchema } from "../../../validations/orderSchema"
import { useCreateOrder } from "../../../hooks/useCreateOrder"
import { useUpdateOrder } from "../../../hooks/useUpdateOrder"

import InputText from "../../InputText"

const OrderForm = ({order, onSuccess}) => {
    const create = useCreateOrder()
    const update = useUpdateOrder()

    const isEdit = Boolean(order?.id)
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: yupResolver(orderSchema),
        defaultValues: {
            customer_name: order?.customer_name || '',
            customer_email: order?.customer_email || '',
            product_name: order?.product_name || '',
            quantity: order?.quantity || '',
            total_price: order?.total_price || ''
        }
    })
    const onSubmit = async (values) => {
        const mutationOptions = {
            onSuccess: () => {
                if (!isEdit) reset()
                onSuccess?.()
            }
        }

        if (isEdit) {
            update.mutate({ id: order.id, ...values }, mutationOptions)
        } else {
            create.mutate(values, mutationOptions)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <InputText
                label="Customer name"
                name="customer_name"
                placeholder="John Doe"
                register={register}
                error={errors.customer_name}
            />

            <InputText
                label="Customer email"
                name="customer_email"
                type="email"
                placeholder="john@example.com"
                register={register}
                error={errors.customer_email}
            />

            <InputText
                label="Product name"
                name="product_name"
                placeholder="MacBook Pro"
                register={register}
                error={errors.product_name}
            />

            <InputText
                label="Quantity"
                name="quantity"
                type="number"
                register={register}
                error={errors.quantity}
            />

            <InputText
                label="Total price"
                name="total_price"
                type="number"
                step="0.01"
                register={register}
                error={errors.total_price}
            />


            <div className="flex justify-end gap-2 pt-4">
                <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    {isEdit ? "Update order" : "Create order"}
                </button>
            </div>
        </form>
    )
}

export default OrderForm