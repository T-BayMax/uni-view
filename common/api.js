import {request} from "./utils/request"

export function postWeixinLogin(params) { // 微信登录
	return request(params, "/api/weixinLogin/","post")
}
export function findUsernfo(params) { // 获取用户消息
	return request(params, "/api/weixin/pub/savePhone")
}