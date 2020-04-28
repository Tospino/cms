<template>
  <div class="newsList">
    <el-carousel class="news-banner" height="300px">
      <el-carousel-item v-for="(item, i) in slides" :key="i" :style="'backgroundImage: url('+ item.newsPicture +')'" @click.native="linkTo(item)">
      </el-carousel-item>
      </el-carousel>
    <div class="list-wrap">
      <div class="newsItem clearfix" v-for="item in newsList" :key="item.id">
        <div class="newsDate fl">
          <div class="date">
            <div class="month">{{item.month}}</div>
            <div class="day">{{item.day}}</div>
            <div class="year">{{item.year}}</div>
          </div>
          <div class="auth">
            {{item.orderPaytime}}
          </div>
        </div>
        <div class="newsMain fr">
          <div class="imgWrap" v-if="item.newsMainPicture" :style="'backgroundImage: url('+ item.newsMainPicture +')'"></div>
          <div class="newsTitle">
            {{item.newsTitle}}
          </div>
          <div class="newsContent">
            {{item.contentText.substring(0, 200)}}<span class="more" @click="toNewsDetail(item.newsContentId)">(...阅读更多</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getNewsSlides } from '@/api/slides'
import { getNewsListAll, getNewsList } from '@/api/news'

const baseUrl = process.env.VUE_APP_API_ROOT
export default {
  created () {
    this.typeId = Number(this.$route.params.typeId) || undefined
    this.getNewsList()
    this.getNewsSlides()
  },
  watch: {
    '$route' () {
      this.typeId = Number(this.$route.params.typeId) || undefined
      this.getNewsList()
    }
  },
  data () {
    return {
      typeId: undefined,
      pageNo: 1,
      pageSize: 10,
      slides: [],
      newsList: []
    }
  },
  methods: {
    getNewsSlides () {
      getNewsSlides({})
        .then(res => {
          this.slides = res.rows || []
          this.slides.forEach(v => {
            v.newsPicture = `${baseUrl}${v.newsPicture}`
          })
        })
    },
    // 获取新闻列表
    getNewsList (pageNo = 1) {
      this.pageNo = pageNo
      // console.log('重新获取了列表')
      // 如果有分类id,通过id去查询新闻列表
      // let params = { pageNo: this.pageNo, pageSize: this.pageSize }
      let params = {}
      if (this.typeId) {
        // params = { pageNo: this.pageNo, pageSize: this.pageSize, newsTypeId: this.typeId }
        params = { newsTypeId: this.typeId }
        getNewsList(params)
          .then(res => {
            this.newsList = res.rows || []
            this.newsList.forEach(v => {
              v.newsMainPicture = v.newsMainPicture ? `${baseUrl}${v.newsMainPicture}` : ''
              v.contentText = this.formatDetail(v.newsContent)
            })
          })
      } else {
        getNewsListAll(params)
          .then(res => {
            this.newsList = res.rows || []
            this.newsList.forEach(v => {
              v.newsMainPicture = v.newsMainPicture ? `${baseUrl}${v.newsMainPicture}` : ''
              v.contentText = this.formatDetail(v.newsContent)
            })
          })
      }
    },
    toNewsDetail (id) {
      this.$router.push({ name: 'newsDetail', params: { newsId: id } })
    },
    linkTo (slide) {
      if (!slide.newsPictureLink) return
      window.open(slide.newsPictureLink, '_blank')
    },
    formatDetail (htmlText) {
      const regexp = /&nbsp;/gi
      const filteRregexp = /<\/?[^>]*>/gi
      htmlText = htmlText.replace(regexp, '')
      htmlText = htmlText.replace(filteRregexp, '')
      return htmlText
    }
  }
}
</script>
<style lang="less">
.newsList {
  .news-banner.el-carousel--horizontal {
    margin-bottom: 20px;
    overflow: hidden;
    .el-carousel__item {
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
    }
  }
  .newsItem {
    margin-bottom: 10px;
  }
  .newsDate {
    width: 90px;
    background: #2ca7f8;
    text-align: center;
    font-size: 12px;
    .date {
      padding: 10px 0;
      line-height: 20px;
      color: #fff;
      .day {
        font-size: 16px;
      }
    }
    .auth {
      background: #eee;
      line-height: 30px;
    }
  }
  .newsMain {
    width: 800px;
    .imgWrap {
      width: 100%;
      height: 300px;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
    }
    .newsTitle {
      padding: 20px 0;
      font-size: 24px;
      line-height: 30px;
    }
    .newsContent {
      font-size: 15px;
      line-height: 26px;
    }
    .more {
      color: #2ca7f8;
      cursor: pointer;
    }
  }
}
</style>
