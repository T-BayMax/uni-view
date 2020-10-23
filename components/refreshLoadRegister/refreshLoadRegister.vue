<template>
	<view style="width: 100%;height: 100%;">
		<view class="refresh-block" :style="{ height: refreshHeight + 'px' }">
			<image :class="loading ? 'roate' : pull ? '' : 'pull'" :src="loading ? '../../static/icon_loading.png' : '../../static/icon_arrow.png'"></image>
			<text class="refreshing_text">{{ refreshing_text }}</text>
		</view>
		<scroll-view
			:scroll-y="true"
			style="position:relative;width:100%;left:0;height:100%;"
			:style="{ bottom: loadMoreHeight + 'px' }"
			@scrolltoupper="upper"
			@scrolltolower="lower"
			@scroll="scroll"
			@touchstart="start"
			@touchend="touchend"
			@touchmove="move"
		>
			<!-- <view class="main-list theme-backg" style="width:100%;height:auto;" > -->

			<slot name="content-list"></slot>
			<!-- </view> -->
		</scroll-view>
		<view class="loadMore-block" :style="{ height: loadMoreHeight + 'px' }">
			<image :class="loading ? 'roate' : pull ? 'pull' : ''" :src="loading ? '../../static/icon_loading.png' : '../../static/icon_arrow.png'"></image>
			<text class="loading-text">{{ loading_text }}</text>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			pull: true, //true 下拉刷新状态或者上拉加载更多状态   false 释放
			loading: false, //是否在加载中
			refreshing: false,
			refreshing_text: '下拉刷新',
			loading_text: '上拉加载更多',
			loadingHeight: 48, //正在加载时高度
			refreshHeight: 0, //刷新布局高度
			loadMoreHeight: 0, //加载更多布局高度
			scrolling: false, //滚动中
			isUpper: true,
			isLower: false,
			windowHeight: 603, //获取屏幕高度
			downY: 0, //触摸时Y轴坐标
			end: true //touchEnd
		};
	},
	comments: {},
	mounted() {
		let self=this
		uni.getSystemInfo({
			success: function(res) {
				self.windowHeight = res.windowHeight;
				self.loadingHeight = res.windowHeight * 0.08;
			}
		});
	},
	methods: {
		scroll(event) {
			// console.log(event);
			// console.log('scroll');
			if (this.end && this.isLower) {
				//如果快速拖动 然后释放 会在end后继续scroll
				//可能出现scroll到顶点后依然走scroll方法
				return;
			}

			if (this.end && this.isUpper) {
				return;
			}

			this.scrolling = true;
			this.isUpper = false;
			this.isLower = false;
		}, //上拉  滚动条 滚动到底部时触发

		lower() {
			// console.log('lower');
			this.end = true;
			this.isLower = true;
			this.scrolling = false;
		}, //下拉  滚动条 滚动顶底部时触发

		upper() {
			// console.log('upper');
			this.end = true;
			this.isUpper = true;
			this.scrolling = false;
		},

		start(e) {
			// console.log('start');
			this.end = false;

			if (this.scrolling || this.loading) {
				return;
			}

			var startPoint = e.touches[0];
			var clientY = startPoint.clientY;

			this.downY = clientY;
			this.refreshHeight = 0;
			this.loadMoreHeight = 0;
			this.pull = true;
			this.refreshing_text = '下拉刷新';
			this.loading_text = '上拉加载更多';
		},
		touchend(e) {
			// console.log('touchend');
			this.end = true;
			this.scrolling = false;

			if (this.refreshing) {
				return;
			} //释放开始刷新

			var height = this.loadingHeight;

			if (this.refreshHeight > this.loadingHeight) {
				// if (this.refresh == undefined) {
				// 	this.refreshHeight = 0;
				// 	this.loadMoreHeight = 0;
				// 	this.loading = false;

				// 	return;
				// }

				this.refreshHeight = height;
				this.loading = true;
				this.pull = false;
				this.refreshing_text = '正在刷新...';

				this.$emit('refresh');
				// this.refresh();
			} else if (this.loadMoreHeight > height) {
				// if (this.loadMore == undefined) {
				// 	this.refreshHeight = 0;
				// 	this.loadMoreHeight = 0;
				// 	this.loading = false;

				// 	return;
				// }

				this.loadMoreHeight = height;
				this.loading = true;
				this.pull = false;
				this.loading_text = '正在加载更多...';
				this.$emit('loadMore');
				// this.loadMore();
			} else {
				(this.refreshHeight = 0), (this.loadMoreHeight = 0), (this.loading = false), (this.pull = true);
			}
		},

		loadFinish(success) {
			if (success) {
				if (success == 'none') {
					this.loading_text = '没有更多了';
				} else {
					this.refreshing_text = '刷新成功';
					this.loading_text = '加载成功';
				}
			} else {
				this.refreshing_text = '刷新失败';
				this.loading_text = '加载失败';
			}
			let self = this;
			setTimeout(function() {
				//2s后刷新结束
				self.refreshHeight = 0;
				self.loadMoreHeight = 0;
				self.loading = false;
			}, 1000);
		},

		move(e) {
			if (this.scrolling) {
				return;
			}

			if (this.loading) {
				return;
			}
			// console.log('move');

			var movePoint = e.changedTouches[0];
			var moveY = (movePoint.clientY - this.downY) * 0.5;

			if (Math.abs(moveY) > this.loadingHeight * 3) {
				return;
			} //1.下拉刷新

			if (this.isUpper && moveY > 0) {
				this.refreshHeight = moveY;

				if (this.refreshHeight > this.loadingHeight) {
					this.pull = false;
					this.refreshing_text = '释放立即刷新';
				} else {
					this.pull = true;
					this.refreshing_text = '下拉刷新';
				}
			} else if (this.isLower && moveY < 0) {
				console.log('loadMore');
				//2上拉加载更多
				this.loadMoreHeight = Math.abs(moveY);

				if (this.loadMoreHeight > this.loadingHeight) {
					this.pull = false;
					this.loading_text = '释放加载更多';
				} else {
					this.pull = true;
					this.refreshing_text = '上拉加载更多';
				}
			}
		}
	}
};
</script>

<style>
/*上拉加载更多布局*/
.loadMore-block {
	z-index: 1;
	position: absolute;
	background-color: #efefef;
	width: 100%;
	text-align: center;
	box-sizing: border-box;
	overflow: hidden;
	left: 0;
	right: 0;
	bottom: 0;
}
.loadMore-block image {
	position: absolute;
	left: 20%;
	right: 0;
	top: 15rpx;
	text-align: center;
	width: 60rpx;
	height: 60rpx;
}
.loadMore-block .loading-text {
	position: absolute;
	width: 100%;
	left: 0;
	right: 0;
	top: 15rpx;
	text-align: center;
	height: 60rpx;
	line-height: 60rpx;
}

/*下拉刷新布局*/
.refresh-block {
	position: relative;
	background-color: #efefef;
	width: 100%;
	height: 0px;
	text-align: center;
	overflow: hidden;
}

.refresh-block image {
	position: absolute;
	left: 25%;
	right: 0;
	bottom: 15rpx;
	text-align: center;
	width: 60rpx;
	height: 60rpx;
}
.refresh-block .refreshing_text {
	position: absolute;
	width: 100%;
	left: 0;
	right: 0;
	bottom: 15rpx;
	text-align: center;
	height: 60rpx;
	line-height: 60rpx;
}

@-webkit-keyframes rotate {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
@keyframes rotate {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
.refresh-block .roate,
.loadMore-block .roate {
	-moz-animation: rotate 1s infinite linear;
	-webkit-animation: rotate 1s infinite linear;
	animation: rotate 1s infinite linear;
}
.refresh-block .pull,
.loadMore-block .pull {
	transform: rotate(180deg) scale(1) translate(0%, 0%);
	transition: All 0.5s ease;
}
</style>
