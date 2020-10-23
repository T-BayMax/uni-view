<template>
	<view style="width: 100%; height: 100%;    position: relative; ">
		<load-refresh @loadMore="loadMore" @refresh="refresh" ref="loadRefresh">
			<view slot="content-list">
				<view style="padding: 30rpx;" v-for="(item, index) in list">{{ item }}</view>
			</view>
		</load-refresh>
	</view>
</template>

<script>
import app from '../../App.vue';
import loadRefresh from '../refreshLoadRegister/refreshLoadRegister.vue';

export default {
	name: 'square',
	components: {
		'load-refresh': loadRefresh
	},
	data() {
		return {
			page: 1,
			period_page: 1,
			last: false,
			list: []
		};
	},

	mounted() {
		console.log('mounted');
		this.getList();
	},

	methods: {
		getList() {
			let self = this;
			for (let i = 0; i < 20; i++) {
				this.list.push(i);
			}
			if (this.list.length > 40) {
				this.last = true;
				setTimeout(() => {
					self.$refs.loadRefresh.loadFinish(false);
				}, 2000);
			}
			setTimeout(() => {
				self.$refs.loadRefresh.loadFinish(true);
			}, 2000);
		},
		//刷新数据
		refresh: function() {
			this.page = 1;
			this.period_page = 1;
			this.getList();
		},
		//加载更多数据
		loadMore: function() {
			if (this.last) {
				this.$refs.loadRefresh.loadFinish('none');
			} else {
				this.period_page = this.period_page + 1;
				this.getList();
			}
		}
	}
};
</script>
<style></style>
