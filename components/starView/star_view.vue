<template>
<view>
<!--components/starView/star_view.wxml-->
 <image v-for="(item, index) in stars" :key="index"  @click="isChoose?scoreStar(index):''" :src="item.flag==0?'/static/star_default.png':'/static/star_checked.png'" :style="'width: ' + width + 'rpx;  height: ' + width + 'rpx;padding: ' + padding + 'rpx;'"></image>
</view>
</template>

<script>

export default {
  data() {
    return {
      stars: [{
        flag: 0
      }, {
        flag: 0
      }, {
        flag: 0
      }, {
        flag: 0
      }, {
        flag: 0
      }],
      item: 0,
      allItem: 0
    };
  },

  components: {},
  props: {
    /**星星个数 */
    grade: {
      type: Number,
      default: 0
    },
    isChoose: {
      type: Boolean,
      default: true
    },
    width: {
      type: Number,
      default: 32
    },
    height: {
      type: Number,
      default: 32
    },
    padding: {
      type: Number,
      default: 10
    }
  },
  watch: {
    'grade': function (grade) {
      for (var i = 0; i <= this.grade - 1; i++) {
        var item = 'stars[' + i + '].flag';
        this.stars[ i ].flag= 1
      }
    }
  },

  beforeMount() {
    console.log("attached");

    for (var i = 0; i <= this.grade - 1; i++) {
      this.stars[ i ].flag= 1
    }
  },

  methods: {
    /**星星选择 */
    scoreStar: function (index) {
      var that = this;
      this.$emit('scoreStar', {
        detail: {
          grade: index + 1
        }
      }, {
        bubbles: true,
        composed: true
      });

      for (var i = index; i < that.stars.length; i++) {
        that.stars[ i ].flag= 0
      }

      for (var i = 0; i <= index; i++) {
        that.stars[ i ].flag= 1
      }
    }
  }
};
</script>
<style>

.star-image {
  width: 34rpx;
  height: 32rpx;padding: 10rpx;
}

</style>