import axiosInstance, { AxiosResponseProps } from '@/uitls/request'
import { apiUrl } from '@/const/api'
import axios from 'axios'
const configEnv = import.meta.env
export const getList = (params: any) => {
  return axiosInstance.get(apiUrl.TEST_PROXY)
}

// 使用axios
export const getOrder = (params?: any) => {
  // return axiosInstance.get(apiUrl.TEST_PROXY)
  return axios.get(`${configEnv.VITE_BASE_URL}`)
}