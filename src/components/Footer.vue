<template>
  <div class="copyRightFooter">
    Copyright@2020<span v-if="getYear() !== 2020">-{{getYear()}}</span>&nbsp;&nbsp;粤ICP备19054972号-1
  </div>
</template>
<script>
export default {
  methods: {
    getYear () {
      return new Date().getFullYear()
    }
  }
}
</script>
<style lang="less">
.copyRightFooter {
  height: 60px;
  line-height: 60px;
  text-align: center;
  font-size: 12px;
  color: #c0c0c0;
}
</style>
