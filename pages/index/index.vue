<template>
	<view style="width: 100%; height: 100%;">
		<NavigationBar left-distance="40rpx"  :innerText="innerText" :back="false"></NavigationBar>
		<view   :style="{ height: 'calc(100% - ' + navigationBarHeight + 'px - 102rpx)', 'margin-top': navigationBarHeight + 'px' }">
			<Home v-if="current_page === 'home'"></Home>
			<Discover v-if="current_page === 'discover'"></Discover>
			<Square v-if="current_page === 'square'"></Square>
			<Center v-if="current_page === 'user_center'"></Center>
		</view>
		<tab-bar :tabData="app_nav" @currentPageChange="currentPageChange"></tab-bar>
	</view>
</template>

<script>
	import app from '../../App.vue'
	
import NavigationBar from '../../components/navigationBar';

import Home from '../../components/homePage/home_page.vue';
import Discover from '../../components/discoverPage/discover_page.vue';
import Square from '../../components/squarePage/square_page.vue';
import Center from '../../components/centerPage/center_page.vue';
import TabBar from '../../components/tabBar';
export default {
	components: {
		NavigationBar,
		Home,
		Discover,
		Square,
		Center,
		TabBar
	},
	data() {
		return {
			current_page: 'home',
			innerText:"首页",
			navigationBarHeight: app.globalData.navigationBarHeight,
			app_nav: { bottom_active_color: '#333333', bottom_color: '#666666' }
		};
	},
	onLoad() {
	},

	methods: {
		// 底部导航栏切换
		currentPageChange(e) {
			console.log(e);
			this.current_page = e.page_key;
			this.innerText = e.text;
			
		}
	}
};
</script>

<style></style>
