import axios from 'axios'
import { Toast } from 'vant'

export class HttpService {
  service: any = null

  showError = null
  isBlocking = false
  constructor(config, showError, isBlocking) {
    // showError参数代表接口报错是否需要全局的错误提醒，默认值为true
    // isBlocking 参数代表接口报错是否需要返回reject，阻塞后面的then执行
    const axiosConfig = {
      timeout: 1000 * 60,
      paramsSerializer(params) {
        return JSON.stringify(params)
      },
      ...config
    }
    this.service = axios.create(axiosConfig)
    this.addRequestFilter().addResponseFilter()
    this.showError = showError
    this.isBlocking = isBlocking
  }

  addRequestFilter() {
    // request 拦截器 axios 的一些配置
    this.service.interceptors.request.use(
      (config) => {
        return config
      },
      (error) => {
        console.error('error:', error) // for debug
        Promise.reject(error)
      }
    )
    return this
  }

  addResponseFilter() {
    // respone 拦截器 axios 的一些配置
    this.service.interceptors.response.use(
      (res) => {
        console.log('res', res)
        // setIsLoading(false)
        if (res.status === 200) {
          const { data } = res
          if (data.code === 200 || data.code === 0) {
            return Promise.resolve(data.data)
          }
          // if (data.code === 500) {
          //   ElMessage.error('服务端异常')
          //   return Promise.reject(new Error(res.data.message || res.data.msg || 'Error'))
          // }
          // 判断一下是否二进制流
          if (res.data instanceof Blob) {
            return Promise.resolve(res.data)
          }

          if (this.showError) {
            Toast(data.message || data.msg || 'Error')
          }
          if (this.isBlocking) {
            return Promise.resolve(res.data)
          }
          return Promise.reject(new Error(data.message || data.msg || 'Error'))
        }
        Toast('服务异常!')
        return Promise.reject(new Error(res.data.message || res.data.msg || 'Error'))
      },
      (error) => {
        Toast('网络错误!')
        return Promise.reject(error)
      }
    )
    return this
  }
}

export default (conf, showError = true, isBlocking = false) =>
  new HttpService(conf, showError, isBlocking).service
