import axios from 'axios'
import queryString from 'query-string'

// const baseUrl = 'http://127.0.0.1:5000/api/v1/'
const baseUrl = 'https://alhansat-kanban-task-management.onrender.com/api/v1/'

const getToken = () => localStorage.getItem('token')

const axiosClient = axios.create({
  baseURL: baseUrl,
  paramsSerializer: params => queryString.stringify({ params })
})

axiosClient.interceptors.request.use(async config => {
  return {
    ...config,
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${getToken()}`
    }
  }
})

axiosClient.interceptors.response.use(response => {
  if (response && response.data) return response.data
  return response
}, err => {
  if (!err.response) {
    console.log(err);
    return alert(err,"axiosClient","29")
    
  }
  throw err.response
})

export default axiosClient