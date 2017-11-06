import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import axios from 'axios'
import axiosApi from './common/axiosApi'

import App from './App'
import router from './router'
import store from './store'

import NProgress from 'nprogress'//页面顶部进度条
import 'nprogress/nprogress.css'

import constants from './constants'
import util from './util'
import * as filters from './filters'

import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
Vue.use(MuseUI)

import N3Components from 'N3-components'
import 'N3-components/dist/index.min.css'
Vue.use(N3Components)

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.use(ElementUI)

import './style/common.css'

Vue.prototype.$api = axiosApi


Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
Date.prototype.addDays = function (d) {
    return new Date(this.setDate(this.getDate() + d));
}
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
});

// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.interceptors.request.use(
    config => {
        config.headers['Content-Type'] = 'application/json;charset=UTF-8';
        // config.headers[constants.COOKIES.XKCSID] = 'BAB4FB09BBE64089A9B2015CCD906E0A';
        config.headers[constants.COOKIES.XKCAPIKEY] = 'E9AF80C7FC1B5E54E2B83C7A032810FD';
        return config;
    },
    err => {
        return Promise.reject(err);
    });

// http response 拦截器
axios.interceptors.response.use(
    response => {
        return response.data;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 返回 401 清除token信息并跳转到登录页面
                    store.commit(types.LOGOUT);
                    router.replace({
                        path: 'login',
                        query: {redirect: router.currentRoute.fullPath}
                    })
            }
        }
        return Promise.reject(error.response.data)   // 返回接口返回的错误信息
    });

axios.defaults.withCredentials = true;

router.beforeEach((to, from, next) => {
    NProgress.start();
    if (to.path == '/login') {
        next()
    }
    else {
        next()
    }
})

router.afterEach(transition => {
    NProgress.done();
});

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
