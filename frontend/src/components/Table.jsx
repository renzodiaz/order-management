import { useModalStore } from "../hooks/stores/useModalStore"
import OrderForm from "../components/features/order/OrderForm"

const Table = ({orders}) => {
    const { openModal, closeModal } = useModalStore()

    const handleEdit = (order) => {
        openModal({
            title: "Edit order",
            content: () => (<OrderForm order={order} onSuccess={closeModal} />)
        })
    }

    return (
        <div className="px-4 sm:px-6 lg:px-8 pt-5 bg-white shadow rounded-lg mt-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold text-gray-900">Orders</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all the orders in your account including their customer name,  email and product.
                    </p>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                    <button
                        type="button"
                        className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={() => openModal({
                            title: "Create order",
                            content: () => (<OrderForm onSuccess={closeModal} />)
                        })}
                    >
                        Create order
                    </button>
                </div>
            </div>
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="relative min-w-full divide-y divide-gray-300">
                            <thead>
                            <tr>
                                <th scope="col" className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                    Customer
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Email
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Product
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Quantity
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Price
                                </th>
                                <th scope="col" className="py-3.5 pr-4 pl-3 sm:pr-0">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                            {orders.map((order) => (
                                <tr key={order.id}>
                                    <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0">
                                        {order.customer_name}
                                    </td>
                                    <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">{order.customer_email}</td>
                                    <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">{order.product_name}</td>
                                    <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">{order.quantity}</td>
                                    <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">{order.total_price}</td>
                                    <td className="py-4 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-0">
                                        <button
                                            onClick={() => handleEdit(order)}
                                            type="button"
                                            className="text-indigo-600 hover:text-indigo-900"
                                        >
                                            Edit<span className="sr-only">, {order.customer_email}</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Table