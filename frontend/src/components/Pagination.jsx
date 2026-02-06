import { useOrderStore } from "../hooks/stores/useOrderStore";

const Pagination = ({ pagination }) => {
    const { setPage } = useOrderStore()
    return(
        <nav
            aria-label="Pagination"
            className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
        >
            <div className="hidden sm:block">
                <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{pagination.current_page}</span> to <span className="font-medium">10</span> of{' '}
                    <span className="font-medium">{pagination.total_count}</span> results
                </p>
            </div>
            <div className="flex flex-1 justify-between sm:justify-end">
                <button
                    type="button"
                    disabled={!pagination.prev_page}
                    onClick={() => setPage(pagination.prev_page)}
                    className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-700 inset-ring inset-ring-gray-300 hover:bg-gray-50"
                >
                    Previous
                </button>
                <button
                    type="button"
                    disabled={!pagination.next_page}
                    onClick={() => setPage(pagination.next_page)}
                    className="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-700 inset-ring inset-ring-gray-300 hover:bg-gray-50"
                >
                    Next
                </button>
            </div>
        </nav>
    )
}

export default Pagination