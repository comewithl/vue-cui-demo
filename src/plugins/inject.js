import Axios from './axios'
import Vue from 'vue'
import Requests from './request'
import Constant from './constant'

export default {
	install: () => {
		Vue.prototype.$axios = Axios
		Vue.prototype.$request = Requests
		Vue.prototype.$constant = Constant
	}
}