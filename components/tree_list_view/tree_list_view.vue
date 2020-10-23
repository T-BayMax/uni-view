<template>
	<!--components/tree_list_view/tree_list_view.wxml-->
	<view class="ul">
		<view class="li-item" @tap="isBranch ? toggle() : tapItem(model)" :data-item="model">
			<view>
				<image
					:src="model.children ? '/static/icon_complete.png' : isSelect == model.id ? '/static/icon_playing.png' : '/static/icon_online_play.png'"
					style="margin-right:20rpx;width:28rpx;height:28rpx;"
				></image>
				<text v-if="model.children" style="font-size:36rpx;font-weight:bold;">{{ model.label }}</text>
				<text v-else :class="isSelect == model.id ? 'font-selection-color' : ''">{{ model.label }}</text>
			</view>
			<image v-if="model.children" src="/static/icon_pack_up_unfold.png" :class="'menu-img ' + (open ? 'rotateRight' : '')"></image>
			<!-- <image wx:else src="/static/icon_download.png" style="width:32rpx;height:32rpx;padding: 20rpx;"></image> -->
		</view>
		<view style="padding-left: 60rpx;" v-if="isBranch" :hidden="!open"><tree v-for="(item, index) in model.children" :key="index" :model="item"></tree></view>
	</view>
</template>

<script>
import tree from './tree_list_view';

export default {
	name: 'tree',
	data() {
		return {
			open: true,
			isBranch: false,
			isSelect: ''
		};
	},

	components: {
		tree
	},
	props: {
		model: Object
	},
	mounted: function(e) {
		console.log(this.model);
		this.isBranch = Boolean(this.model.children && this.model.children.length);
		console.log(this);
	},
	methods: {
		toggle: function(e) {
			if (this.isBranch) {
				this.open = !this.open;
			}
		},
		tapItem: function(item) {
			// var item = e.currentTarget.dataset.item;
			this.isSelect = item.id;
			console.log('组件里点击的id: ' + item);
			this.$emit(
				'bindItem',
				{
					detail: {
						itemid: item.id,
						fileId: item.fileId
					}
				},
				{
					bubbles: true,
					composed: true
				}
			);
		}
	}
};
</script>
<style>
.ul .li-item {
	/* width: calc(100% - 60rpx); */
	padding: 20rpx 30rpx;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: space-between;
	/* margin: 0 30rpx; */
	/* padding-right:35rpx;  */
	font-size: 30rpx;
	font-family: PingFang-SC-Medium;
	font-weight: 500;
	/* border-bottom: 0.5rpx solid rgba(213, 213, 214, 0.5); */
}

/* .ul .li-item-child {
  
} */

.ul .li-item .text {
	font-size: 30rpx;
	font-family: PingFang-SC-Medium;
	font-weight: 500;
}

.menu-img {
	width: 24rpx;
	height: 14rpx;
	padding: 20rpx;
}

.rotateRight {
	transform: rotate(180deg);
	/*180°旋转图片。 */
}
</style>
