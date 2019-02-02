function handleResponseMessageCode(responseData, config) {
	const ignoreError = config.ignoreError
	switch (responseData.messageCode) {
	case 'unexpected_error':
		!ignoreError && alert(responseData.message)
		break
	default:
		break
	}
}

/**
 * 
 * @param {@} response 
 */
export const ResponseSuccessFunc = function (response) {
	let config = response.config
	let data = response.data // {<message>,<messageCode>,<data>,<success>}
	if (data.success) {
		return config.keepOriginResponse ? data : data.data
	} else {
		// 针对响应成功，suceess为false的情况处理messageCode
		handleResponseMessageCode(data, config)
		return Promise.reject(data)
	}
}
// 请求状态码不为200的拦截处理
export const ResponseFailFunc = function (err) {
	// 状态码处理
	if (err && err.response) {
		switch (err.response.status) {
		case 400:
			err.message = '请求错误'
			break

		case 401:
			err.message = '未授权，请登录'
			break

		case 403:
			err.message = '拒绝访问'
			break

		case 404:
			err.message = `请求地址出错: ${err.response.config.url}`
			break

		case 408:
			err.message = '请求超时'
			break

		case 500:
			err.message = '服务器内部错误'
			break

		case 501:
			err.message = '服务未实现'
			break

		case 502:
			err.message = '网关错误'
			break

		case 503:
			err.message = '服务不可用'
			break

		case 504:
			err.message = '网关超时'
			break

		case 505:
			err.message = 'HTTP版本不受支持'
			break

		default:
		}
	}
	return Promise.reject(err)
}
