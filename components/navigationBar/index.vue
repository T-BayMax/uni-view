+
<template>
	<view class="navbar" :style="{ height: navigationBarHeight + 'px', 'background-color': backgroundColor, 'border-bottom': lineColor }">
		<view style="white:100%," :style="{ height: statusBarHeight + 'px' }"></view>
		<view class="title-container" :style="{ height: barHeight + 'px' }">
			<view class="capsule" v-if="back">
				<view @click="bindBack" v-if="back"><image :src="backImg"></image></view>
				<!-- <view bindtap='backHome' v-if="{{home}}">
	        <image src='/image/home.png'></image>
	      </view>-->
			</view>

			<view :style="{ color: textColor, 'margin-left': leftDistance }" class="navbar-title">{{ innerText }}</view>
		</view>
	</view>
	<!-- <view style="{height: navigationBarHeight};background: #fff;"></view> -->
</template>

<script>
import app from '../../App.vue';
export default {
	name: 'navbar',
	// props: ['data'],

	props: {
		backgroundColor: {
			type: String,
			default: '#FFF'
		},
		lineColor: String,
		back: {
			type: Boolean,
			default: true
		},
		textColor: {
			type: String,
			default: '#000'
		},
		leftDistance: {
			type: String,
			default: '2px'
		},
		innerText: {
			type: String,
			default: '平台小程序'
		},
		backImg: {
			type: String,
			default: '../../static/images/custom_calendar_row_left.png'
		}
		// data: {
		// 	type: Object,
		// 	default: function() {
		// 		return {
		// 			backgroundColor: '#f8f8f8',
		// 			lineColor: '2rpx solid #fff',
		// 			back: false,
		// 			textColor: '#333',
		// 			leftDistance: '2px',
		// 			innerText: '平台小程序',
		// 			backImg: '../../static/images/custom_calendar_row_left.png'
		// 		};
		// 	}
		// }
	},
	data() {
		return {
			navigationBarHeight: '56',
			statusBarHeight: '0',
			barHeight: '56'
		};
	},
	// watch: {
	// 	data(newData, prevData) {
	// 		console.log(newData);
	// 		 this.data = newData;
	// 	}
	// },
	mounted() {
		// console.log('onLoad');
		this.navigationBarHeight = app.globalData.navigationBarHeight;
		this.statusBarHeight = app.globalData.statusBarHeight;
		this.barHeight = app.globalData.barHeight;
	},
	methods: {
		bindBack: function() {
			console.log('bindBack');
			var pages = getCurrentPages(); //当前页面栈
			console.log(pages);
			if (pages.length > 1) {
				uni.navigateBack({
					delta: 1
				});
			} else {
				uni.navigateTo({
					url: '/pages/start/start'
				});
			}
		}
	}
};
</script>

<style>
.navbar {
	width: 100%;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 999999;
}

.title-container {
	display: flex;
	align-items: center;
	/* position: relative; */
}

.capsule {
	/* margin-left: 21rpx; */
	display: flex;
	height: auto;
	align-items: center;
}

.capsule > view {
	width: 79rpx;
	align-items: center;
	margin: 0;
	display: flex;
	justify-content: center;
	/* position: relative; */
}

.capsule > view:nth-child(2) {
	border-left: 1px solid #fff;
}

.capsule image {
	width: 22rpx;
	height: 40rpx;
	/* left: 50%; 
	  transform: translate(-50%, -50%);*/
}

.navbar-title {
	/* color: white; */
	/* text-align: center; */
	font-size: 36rpx;
	max-width: 62%;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	/* width: 100%; */
}
</style>
