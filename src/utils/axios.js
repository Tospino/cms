import axios from 'axios'

const baseUrl = process.env.VUE_APP_API_ROOT

const service = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
  timeout: 100000
})

// request拦截器
service.interceptors.request.use(config => {
  return config
})

// response拦截器
service.interceptors.response.use(response => {
  return response.data
}, error => {
  if (error.response && parseInt(error.response.status) !== 200) {
  }
  return Promise.reject(error)
})

export default service
