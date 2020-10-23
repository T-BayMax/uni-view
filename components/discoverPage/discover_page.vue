<template>
	<view style="width: 100%;height: 100%;">
		<star-view @scoreStar="scoreStar"  :width="34" :height="34" :padding="5" :grade="score"></star-view>
		<tree-list-view v-for="(item, index) in treeData" :key="index" v-if="treeData && treeData != null" release="true" :model="item" @bindItem="bindItem"></tree-list-view>
	</view>
</template>

<script>
import app from '../../App.vue';
import starView from '../../components/starView/star_view.vue';
import treeListView from '../../components/tree_list_view/tree_list_view.vue';
export default {
	name: 'discover',
	components: {
		starView,
		treeListView
	},
	/**
	 * 页面的初始数据
	 */
	data() {
		return {
			score: 3,
			treeData: [
				{ id: 1, label: '项目一', children: [{ id: 2, label: '项目一(1)' }] },
				{ id: 3, label: '项目二', children: [{ id: 3, label: '项目二(1)' }] }
			]
		};
	},
	mounted() {},

	methods: {
		scoreStar(res) {
			console.log(res);
		},
		bindItem(res) {}
	}
};
</script>

<style></style>
