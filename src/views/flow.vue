<template>
  <div class="flow container contentWidth">
    <img class="flowImg" :src="flowImg"/>
    <Footer></Footer>
  </div>
</template>
<script>
import Footer from '@/components/Footer.vue'
import { getEnterFlow } from '@/api/enterFlow'
const baseUrl = process.env.VUE_APP_API_ROOT
export default {
  components: { Footer },
  created () {
    this.getEnterFlow()
  },
  data () {
    return {
      flowImg: ''
    }
  },
  methods: {
    getEnterFlow () {
      getEnterFlow()
        .then(res => {
          this.flowImg = res.rows && res.rows[0] && res.rows[0].processPicture
          this.flowImg = `${baseUrl}${this.flowImg}`
        })
    }
  }
}
</script>
<style lang="less">
.flow {
  height: 100%;
  padding-bottom: 0;
  .flowImg {
    width: 1050px;
    min-height: 100%;
  }
}
</style>
