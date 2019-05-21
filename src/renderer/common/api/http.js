import Axios from 'axios';
// import qs from 'qs'
import config from '../config/index';
import {Message} from 'element-ui';
import store from '../../store/index'
import router from '../../router/index'

// 自定义Axios实例
const instance = Axios.create({
	// 配置api地址
	baseURL: config.baseUrl,
	// 请求超时时间
	timeout: 100000,
	// 设置请求头
	// headers: {'content-type': 'application/json;charset=UTF-8'},
	// 设置数据格式化
	transformRequest: [(data) => {
		// data = qs.stringify(data)
		data = JSON.stringify(data)
		return data
	}],
	// 携带cookie
	withCredentials: false
})

// instance.defaults.withCredentials = true

// Axios请求拦截器
instance.interceptors.request.use(config => {
	config.headers.Token = store.state.UserInfo.token;
	// 如果修改请求头，则不格式化请求数据
	if (config.headers['Content-Type'] !== 'application/json;charset=UTF-8') {
		config.transformRequest = data => data
	}
	return config;
}, error => {
	console.log(error);
	return Promise.reject(error);
})

// Axios响应拦截器
instance.interceptors.response.use(response => {
	// token更新
	const token = response.headers.authorization
	if (token) {
		store.dispatch('refreshToken', {isLogin: true, token: token})
	}
	// 对响应数据处理
	const data = response.data
	if (data.resultStatus) {
		// Message.success(data.msg);
	} else {
		// Message.error(data.msg);
	}
	return response.data
}, error => {
	// 对响应错误数据处理
	if (error && error.response) {

		console.log(error)
		console.log(error.response)
		if (error.response.status === 404) {
			console.log('error');
		} else if (error.response.status === 400) {
			console.log('error');
		} else if (error.response.status === 401) {
			Message.error('令牌失效，请重新登录');
			store.dispatch('refreshToken', {isLogin: false, token: ''})
			router.push('/')
		}
	}
	return Promise.reject(error);
})

export default (method, url, params, config = {headers: {'Content-Type': 'application/json;charset=UTF-8'}}) => {
	if (method === 'get' || method === 'delete') {
		// 解决IE缓存Get请求问题，增加时间戳
		params ? params.t = new Date().getTime() : params = {t: new Date().getTime()}
		params = {params: params}
	}
	return new Promise((resolve, reject) => {
		instance[method](url, params, config).then(response => {
			resolve(response);
		}, error => {
			reject(error);
		}).catch(error => {
			reject(error);
		})
	}).catch(error => {
		console.log(error);
	});
}

