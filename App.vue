<script>
import store from 'common/store.js';
	export default {
	
		onLaunch: function() {
				let self = this;
				let menuButtonInfo = uni.getMenuButtonBoundingClientRect();
				console.log(menuButtonInfo);
				if (menuButtonInfo) {
					self.$options.globalData.navigationBarHeight = menuButtonInfo.height + menuButtonInfo.height;
					self.$options.globalData.statusBarHeight = menuButtonInfo.height;
					self.$options.globalData.barHeight = menuButtonInfo.top;
				}
				const { windowWidth, windowHeight } = uni.getSystemInfoSync();
				          self.globalData.windowWidth = windowWidth
				          self.globalData.windowHeight = windowHeight
				// console.log('App Launch');
			},
			onShow: function() {
				// console.log('App Show');
			},
			onHide: function() {
				// console.log('App Hide');
			},
			globalData: {navigationBarHeight: 64, statusBarHeight: 20, barHeight: 44,windowWidth:750,windowHeight:1334, }
		
	}
</script>

<style>
	/*每个页面公共css */
	
	@import url('./uni.scss');
</style>
