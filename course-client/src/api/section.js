import axios from 'axios'

export const fetchSections = () =>
    axios.get('/api/sections')
    .catch(console.error);

export const fetchSectionById = id =>
    axios.get(`/api/sections/${id}`)
    .catch(console.error);