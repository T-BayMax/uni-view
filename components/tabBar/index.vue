<template>
	<view>
		<view class="tabar" :style="{backgroundColor:tabData.bottom_background}">
			<view class="tabar-item" v-for="(item,index) in nav_list" :key="index" :style="{width:100/nav_list.length+'%'}"
			 @click='currentPageChange(item)'>
				<image :hidden="pageKey!=item.page_key" :src="item.active_url" />
				<image :hidden="pageKey==item.page_key" :src="item.url" />
				<text :hidden="pageKey!=item.page_key" :style="{color:tabData.bottom_active_color}">{{item.title}}</text>
				<text :hidden="pageKey==item.page_key" :style="{color:tabData.bottom_color}">{{item.title}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import { baseURL } from '@/common/utils/config'
	export default {
		name: 'tabBar',
		props: {
			tabData: {
				type: Object,
				required: true,
			
			}
		},
		data() {
			return {
				pageKey:'home',
				nav_list:[
					{
						title:'首页',
						url:require('../../static/icon_home_def.png'),
						active_url:require('../..//static/icon_home.png'),
						page_key:'home'
					},{
						title:'发现',
						url:require('../../static/icon_discover_def.png'),
						active_url:require('../../static/icon_discover.png'),
						page_key:'discover'
					},{
						title:'精选',
						url:require('../../static/icon_square_def.png'),
						active_url:require('../../static/icon_square.png'),
						page_key:'square'
					},{
						title:'个人中心',
						url:require('../../static/icon_my_def.png'),
						active_url:require('../../static/icon_my.png'),
						page_key:'user_center'
					}
				]
			};
		},
		methods: {
			currentPageChange(e) {
				let detail = {}
				detail.page_key = e.page_key;
				detail.text = e.title;
				this.pageKey=detail.page_key;
				this.$emit('currentPageChange',detail)
				
			}
		}
	}
</script>

<style scoped>
	.tabar {
		position: fixed;
		z-index: 1;
		bottom: 0;
		width: 100%;
		height: 100rpx;
		background-color: #fff;
		display: flex;
		/* border-top: 1px solid #E4E7ED; */
		box-sizing: border-box;
	}

	.tabar .tabar-item {
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}

	.tabar .tabar-item image {
		width: 40rpx;
		height: 40rpx;
	}

	.tabar .tabar-item text {
		font-size: 24rpx;
		color: #8a8a8a;
		margin-top: 8rpx;
	}
</style>
