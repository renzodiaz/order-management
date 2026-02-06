export const normalizeJsonApi = (response) => ({
    data: response.data.map((item) => ({
        id: item.id,
        ...item.attributes,
    })),
    meta: response.meta,
})