<template>
	<scroll-view scroll-y="true" class="input-backg" style="width: 100%;height: 100%;"><view>个人中心</view></scroll-view>
</template>

<script>
import app from '../../App.vue';
import store from '../../common/store.js';
import { findUsernfo } from '../../common/api';
export default {
	name: 'center',
	data() {
		return {
			user: ''
		};
	},

	components: {},
	props: {},
	mounted() {
		this.getUserInfo();
	},
	methods: {
		/**获取用户信息*/
		getUserInfo() {
			findUsernfo().then(res => this.onUsernfoSuccess(res), err => this.onFailed(err));
		},
		onUsernfoSuccess(res) {
			user = res;
			store.state.userInfo = res;
		},

		onFailed(msg) {
			if (msg) {
				uni.showToast({
					title: msg,
					icon: 'none',
					duration: 2000
				});
			}
		}
	}
};
</script>
<style>
.header-view {
	width: calc(100% - 60rpx);
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 30rpx;
}

.header-image {
	width: 120rpx;
	height: 120rpx;
	margin-right: 40rpx;
	border-radius: 50%;
	background: #f7f7f7;
}

.header-class {
	display: flex;
	width: 117rpx;
	height: 40rpx;
	justify-content: center;
	align-items: center;
	background: linear-gradient(-68deg, rgba(234, 190, 85, 1) 0%, rgba(243, 208, 140, 1) 100%);
	border-radius: 20rpx;
}

.integral-view {
	display: flex;
	justify-content: space-around;
	align-items: center;
	padding: 30rpx;
	margin-bottom: 10rpx;
}

.title {
	margin-top: 40rpx;
	margin-bottom: 10rpx;
	padding: 0 30rpx;
	font-size: 32rpx;
}

.list-item-image {
	width: 40rpx;
	height: 40rpx;
	margin-right: 20rpx;
}

.new-msg {
	width: 98rpx;
	height: 40rpx;
	margin-right: 30rpx;
	line-height: 40rpx;
	text-align: center;
	background: #f56162;
	border-radius: 20rpx;
	font-size: 28rpx;
}

.redDot {
	width: 20rpx;
	height: 20rpx;
	background: #f56162;
	border-radius: 50%;
	margin-right: 30rpx;
}
.exit {
	color: #fe5a61;
	width: 100%;
	text-align: center;
	height: 76rpx;
	line-height: 76rpx;
	position: absolute;
	bottom: 40rpx;
}
</style>
