import axios from 'axios'

export const fetchCourses = () =>
    axios.get('/api/courses')
    .catch(console.error);

export const fetchCourseById = id =>
    axios.get(`/api/courses/${id}`)
    .catch(console.error);