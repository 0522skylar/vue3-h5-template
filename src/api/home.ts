import { apiUrl } from '@/const/api'
import { axiosTest } from '@/uitls'

// 在axios基础上进行封装
export const getTest = (params?: any) => {
  return axiosTest.get(apiUrl.TEST_PROXY)
}
