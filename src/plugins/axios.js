import axios from 'axios'
import { AXIOS_DEFAULT_CONFIG } from '../config/index'
import { ResponseSuccessFunc, ResponseFailFunc } from '../config/intercepters/axios'


axios.interceptors.request.use(function (config) {
	config = Object.assign(config, AXIOS_DEFAULT_CONFIG)
	return config
})

// 响应内容拦截
axios.interceptors.response.use(ResponseSuccessFunc, ResponseFailFunc)

export default axios


