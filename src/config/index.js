// 控制请求是否本地MOCK
export const REQUEST_LOCAL_ENABLE = false
// axios配置
export const AXIOS_DEFAULT_CONFIG = {
	timeout: 5000,
	maxContentLength: 2000,
	headers: {
		'post': {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
		}
	}
}

// vuex 配置

export const VUEX_DEFAULT_CONFIG = {

}

// API默认配置

export const API_DEFAULT_CONFIG = {
	mockBaseURL: '',
	mock: REQUEST_LOCAL_ENABLE,
	debug: false
}

// 服务端常量表获取或者配置

export const NORAML_CONST_MAP = {
}

