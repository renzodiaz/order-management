import { create } from "zustand"

export const useModalStore = create((set) => ({
    isOpen: false,
    title: null,
    content: null,

    openModal: ({title, content}) => {
        console.log('Opening modal with title:', title)
        set({ isOpen: true, title, content })
    },
    closeModal: () => {
        console.log('Closing modal')
        set({ isOpen: false, title: null, content: null })
    }
}))