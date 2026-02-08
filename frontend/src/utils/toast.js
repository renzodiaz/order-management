import toast from "react-hot-toast"

export const showSuccess = (message) => {
    toast.success(message, {
        style: {
            background: '#10b981',
            color: '#fff',
            padding: '16px',
            borderRadius: '8px',
        },
    })
}

export const showError = (message) => {
    toast.error(message, {
        style: {
            background: '#ef4444',
            color: '#fff',
            padding: '16px',
            borderRadius: '8px',
        },
    })
}

export const showLoading = (message) => {
    return toast.loading(message, {
        style: {
            background: '#3b82f6',
            color: '#fff',
            padding: '16px',
            borderRadius: '8px',
        },
    })
}