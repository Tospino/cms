<template>
  <div class="layout-wrap">
    <Header></Header>
    <div class="layout-content">
      <router-view/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'

export default {
  name: 'home',
  components: {
    Header
  }
}
</script>
<style lang="less">
.layout-wrap {
  height: 100vh;
  display: flex;
  flex-direction: column;
  .layout-content {
    flex: 1;
  }
}
</style>
