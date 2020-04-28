<template>
  <div class="home">
    <el-carousel height="420px">
      <el-carousel-item v-for="(item, i) in slides" :key="i" :style="'backgroundImage: url('+ item.homePicture +')'" @click.native="linkTo(item)">
      </el-carousel-item>
    </el-carousel>
    <div class="middle">
      <div class="contentWidth clearfix">
        <newsPanel class="fl"></newsPanel>
        <flowPanel class="fr"></flowPanel>
      </div>
    </div>
    <div class="enter">
      <div class="contentWidth clearfix">
        <div class="fl">
          <enterPanel></enterPanel>
        </div>
        <div class="fr cursorPointer" @click="$router.push({name: 'cost'})">
          <img src="@/assets/img/enter.png" alt="">
        </div>
      </div>
    </div>
    <div class="services">
      <div class="contentWidth">
        <div class="services-title">
          为您提供优质服务
        </div>
        <div>
          <div v-for="(item, i) in serviceList" class="service-item" :key="i">
            <img :src="item.img" alt="" class="img">
            <span class="text">{{item.name}}</span>
          </div>
        </div>
      </div>
    </div>
    <Bottom></Bottom>
  </div>
</template>
<script>
import newsPanel from './newsPanel.vue'
import flowPanel from './flowPanel.vue'
import enterPanel from './enterPanel.vue'
import Bottom from '@/components/Bottom.vue'
import { getHomeSlides } from '@/api/slides'

const baseUrl = process.env.VUE_APP_API_ROOT
export default {
  components: { newsPanel, flowPanel, enterPanel, Bottom },
  created () {
    this.getHomeSlides()
  },
  data () {
    /**
     * slides 轮播图列表
     * serviceList 服务特色列表
     */
    return {
      slides: [],
      serviceList: [
        { img: require('@/assets/img/service/u80.svg'), name: '内容翻译' },
        { img: require('@/assets/img/service/u81.svg'), name: '图片处理' },
        { img: require('@/assets/img/service/u83.svg'), name: '跨境运输' },
        { img: require('@/assets/img/service/u85.svg'), name: '报关清关' },
        { img: require('@/assets/img/service/u82.svg'), name: '海外仓储' },
        { img: require('@/assets/img/service/u86.svg'), name: '数据中心' },
        { img: require('@/assets/img/service/u84.svg'), name: '快速配送' },
        { img: require('@/assets/img/service/u79.svg'), name: '货款结算' }
      ]
    }
  },
  methods: {
    getHomeSlides () {
      getHomeSlides().then(res => {
        this.slides = res.rows || []
        this.slides.forEach(v => {
          v.homePicture = v.homePicture ? `${baseUrl}${v.homePicture}` : ''
        })
      })
    },
    linkTo (slide) {
      if (!slide.homePictureLink) return
      window.open(slide.homePictureLink, '_blank')
    }
  }
}
</script>
<style lang="less">
.home {
  .el-carousel {
    width: 100%;
    background: #eee;
    overflow: hidden;
  }
  .el-carousel__item {
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
  .middle {
    height: 380px;
    background: #f4f4f4;
    padding: 30px 0;
    box-sizing: border-box;
  }
  .enter {
    padding: 30px 0 40px;
  }
  .services {
    background: #eee;
    .services-title {
      font-size: 26px;
      color: #666;
      padding: 40px 0;
      text-align: center;
    }
    .service-item {
      display: inline-block;
      margin-bottom: 50px;
      width: 25%;
      .img {
        margin-right: 30px;
        vertical-align: middle;
      }
      .text {
        font-size: 18px;
        color: #666;
      }
    }
  }
  .copyRightFooter {
    background: #333;
  }
}
</style>
