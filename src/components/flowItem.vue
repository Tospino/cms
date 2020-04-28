<template>
  <div class="flowItem" :style="styleObject">
    <div class="title">
      <slot name="title"></slot>
    </div>
    <div class="content">
      <div class="summary">
        <slot name="summary"></slot>
      </div>
      <div class="line"></div>
      <div class="detail">
        <slot name="detail"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  computed: {
    styleObject () {
      return {
        width: `${this.w}px`,
        height: `${this.h}px`
      }
    }
  },
  props: {
    w: {
      type: Number,
      default: 250
    },
    h: {
      type: Number,
      default: 320
    }
  }
}
</script>
<style lang="less">
.flowItem {
  display: inline-block;
  vertical-align: middle;
  border: 1.5px solid #999;
  border-radius: 10px;
  padding: 20px 10px;
  margin-right: 20px;
  position: relative;
  box-sizing: border-box;
  &:last-child {
     margin-right: 0
  }
  .title {
    position: absolute;
    left: 50%;
    top: 0;
    transform: translate(-50%, -50%);
  }
  .content {
    height: 100%;
  }
  .summary {
    height: 30%;
    text-align: center;
    padding: 30px 0 0 0;
    box-sizing: border-box;
  }
  .line {
    width: 100%;
    height: 1px;
    background: #999;
  }
  .detail {
    padding: 10px;
    font-size: 12px;
    line-height: 20px;
  }
}
</style>
