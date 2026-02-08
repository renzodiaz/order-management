export const normalizeJsonApi = (response) => {
    // Handle array response (list of items)
    if (Array.isArray(response.data)) {
        return {
            data: response.data.map((item) => ({
                id: item.id,
                ...item.attributes,
            })),
            meta: response.meta,
        }
    }

    // Handle single object response (single item)
    if (response.data && typeof response.data === 'object') {
        return {
            data: {
                id: response.data.id,
                ...response.data.attributes,
            },
            meta: response.meta,
        }
    }

    // Fallback - return as is
    return response
}