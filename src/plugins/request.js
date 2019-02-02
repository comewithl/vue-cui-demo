import axios from 'axios'
import './axios'
import util from './util'
import urlConfig from '../config/urlConfig'

// 全局参数
let globalParams = {}
const DEFAULT_REQUEST_TYPE = 'post'

/**
 * @description 根据传入的配置参数，返回一个请求方法
 * @param {Object} config - 请求配置参数
 * @return {Function} - 返回请求方法，与传入的参数绑定
 * */
function createRequest(config) {
	let url = config.url
	let type = config.type.toLowerCase()
	let isPost = type === 'post'
	let headers = formatHeader(config.headers)
	let contentType = headers['Content-Type'] || ''
	let isJSONType = contentType.indexOf('application/json') >= 0
	/**
	 * @description 请求函数
	 * @param {Object} params - 请求参数
	 * @param {Object} [option] - 特殊的请求配置
	 * @param {Object} [previousResponse] - 上一个请求返回的数据
	 * @return {Promise}
	 * */
	return function (params, option, previousResponse) {
		params = Object.assign({}, config.params, globalParams, params)
		option = option || {}
		if (util.isFunction(config.data)) {
			params = config.data(params, previousResponse) || params
		}
		let promise = axios({
			method: type,
			url: util.isFunction(url) ? url(params) : url,
			data: isPost ? (isJSONType ? JSON.stringify(params) : qs.stringify(params)) : '',
			// 避免缓存get请求，加入时间戳
			params: isPost ? {} : Object.assign({ _t: (new Date()).getTime() }, params),
			headers: Object.assign(headers, option.headers),
			keepOriginResponse: config.keepOriginResponse
		})
		// 如果有下一步的请求
		if (config.next) {
			let nextRequest = createRequest(config.next)
			return promise.then((data) => {
				if (util.isFunction(config.shouldNext)) {
					if (config.shouldNext(data, params, option)) {
						return nextRequest(params, option, data)
					} else {
						return data
					}
				} else {
					return nextRequest(params, option, data)
				}
			})
		}
		return promise
	}
}

function normalizeUrlConfig(url, urlMap) {
	let config = {}
	if (typeof url === 'object') {
		config = Object.assign({
			headers: {},
			params: {}
		}, url, {
			type: (url.type || DEFAULT_REQUEST_TYPE).toLowerCase()
		})
		if (config.next) {
			let next = config.next
			if (util.isObject(next)) {
				config.next = normalizeUrlConfig(next)
			} else if (util.isDef(urlMap[next])) {
				config.next = normalizeUrlConfig(urlMap[next])
			} else {
				throw {
					message: '无法处理next: ' + config.next
				}
			}
		}
	} else {
		config.type = DEFAULT_REQUEST_TYPE
		config.url = url
		config.headers = {}
		config.params = {}
	}
	return config
}

function formatHeader(headers) {
	let fHeaders = {}
	let nameMapping = {
		contentType: 'Content-Type',
		'content-type': 'Content-Type'
	}
	for (let name in headers) {
		if (nameMapping[name]) {
			fHeaders[nameMapping[name]] = headers[name]
		} else {
			fHeaders[name] = headers[name]
		}
	}
	return fHeaders
}
// 遍历urlConfig，构造请求函数
let output = {}
for (let urlName in urlConfig) {
	let config = normalizeUrlConfig(urlConfig[urlName], urlConfig)
	output[urlName] = createRequest(config)
}

export default output