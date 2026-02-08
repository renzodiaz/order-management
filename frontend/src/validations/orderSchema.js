import * as yup from 'yup';

export const orderSchema = yup.object({
    customer_name: yup.string().required(),
    customer_email: yup.string().email().required(),
    product_name: yup.string().required(),
    quantity: yup.number().positive().integer().required()
})