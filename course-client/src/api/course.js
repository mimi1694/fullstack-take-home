import axios from 'axios'

export const fetchCourses = () =>
    axios.get('/api/courses')
    .catch(err => console.log(err))
