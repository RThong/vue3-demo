import axios, { type AxiosRequestConfig } from 'axios'

const instance = axios.create({
  baseURL: 'https://66b0d4d36a693a95b53a603f.mockapi.io/api/v1', // 设置基础 URL
  timeout: 5000 // 设置超时时间
})

// 添加请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    // config.headers.Authorization = 'Bearer your-token'; // 添加 token
    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    return response // 只返回 data 字段
  },
  (error) => {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

async function get<T>(url: string, config?: AxiosRequestConfig) {
  const { data } = await instance.get<T>(url, config)
  return data
}

export { get }
export default instance
