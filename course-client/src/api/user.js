import axios from 'axios'

export const fetchUsers = () =>
    axios.get('/api/users')
        .catch(console.error)

export const fetchUser = (id) =>
    axios.get(`/api/users/${id}`)
        .catch(console.error)

export const createUser = (name, email) => 
    axios.post(`api/users`, { name, email })
        .catch(console.error);

export const updateUser = (userId, sectionIds) =>
    axios.put(`api/users`, { userId, sectionIds });