/**
 * Created by fuzl on 2017/6/6.
 */
import Vue from 'vue'
// import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Inject from './plugins/inject'
import elementUI from 'element-ui'
// import elementUIPlugin from 'element-ui-plugin'
import 'element-ui/lib/theme-chalk/index.css'
// import 'element-ui-plugin/lib/theme/index.css'
// 全局样式
// import './style/common.less'

Vue.use(elementUI)
// Vue.use(elementUIPlugin)
console.log('test app.html use')
Vue.use(VueRouter)
Vue.use(Inject)
// vuex `state manager`
// Vue.use(Vuex)
