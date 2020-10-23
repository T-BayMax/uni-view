import store from '../store'
import {
	baseURL,
	pyBaseURL
} from './config'

// 获取请求方式
function getType(data, method, contentType) {
	console.log("params", data)
	let type = {}
	method = method ? 'post' : 'get'
	type = {
		method,
		data: {
			...data
		},
		// params: contentType?{
		// 	...data
		// }:'',
		header: {
			'content-type': contentType ? 'application/json' : 'application/x-www-form-urlencoded; charset=UTF-8',
			"organization": '304133043692638210',
			"Authorization": store.state.userInfo ? store.state.userInfo.access_token : '',
		}
	}
	return type
}

function Request(data, url, method, contentType) {
console.log("url",baseURL + url)
	return new Promise((resolve, reject) => {
		//uni.showLoading()
		uni.request({
			url: url,
			...getType(data, method, contentType),
		}).then(response => {
			console.log(response[1].data)
			if (response[1].statusCode == 403) {
				uni.navigateTo({
					/**跳转登录页 */
					url: '/pages/startPage/start_page',
				})
			} else {
				let res = response[1]
				if (res.data.code == 0 || res.data.code == 200) {
					resolve(res.data.data)
				} else if (res.data.code == 403 || res.data.code == 2 || res.data.code == 3) {
					uni.navigateTo({
						/**跳转登录页 */
						url: '/pages/startPage/start_page',
					})
					reject(res.data.msg)
				} else {
					reject(res.data.msg)
				}
			}
		}).catch(err => {
			console.log(err)
			reject(err)
		})
	})
}


export function UploadFile(data, url, file, fileName) {
console.log("url",baseURL + url)
	return new Promise((resolve, reject) => {
		//uni.showLoading()
		uni.request({
			url: baseURL + url,
			...getType(data, "post"),
		}).then(response => {
			console.log(response[1].data)
			if (response[1].statusCode == 403) {
				uni.navigateTo({
					/**跳转登录页 */
					url: '/pages/startPage/start_page',
				})
			} else {
				let data = JSON.parse(response[1].data)
				if (data.code == 0 || data.code == 200) {
					resolve(data.data)
				} else if (data.code == 403) {
					uni.navigateTo({
						/**跳转登录页 */
						url: '/pages/startPage/start_page',
					})
					reject(data.msg)
				} else {
					reject(data.msg)
				}
			}
		}).catch(err => {
			console.log(err)
			reject(err)
		})
	})
}


export function request(data, url, method, contentType) {
	return Request(data, baseURL + url, method, contentType)
}
