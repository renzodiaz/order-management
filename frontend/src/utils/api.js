import axios from 'axios'

// Since we are not using authorization we are not using axios interceptors
// so, lets keep it simple
export const api = axios.create({
    baseURL: 'http://localhost:3000/api/v1',
    headers: {
        Accept: 'application/json',
    },
})