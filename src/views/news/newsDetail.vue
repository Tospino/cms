<template>
  <div class="newsDetail">
    <div class="title">{{detail.newsTitle}}</div>
    <div class="middle clearfix">
      <div class="info fl">
        <span class="infoItem">阅读次数: {{detail.readNumber}}</span>
        <span class="infoItem">信息来源: {{detail.source}}</span>
        <span class="infoItem">发布时间: {{detail.newsReleaseTime}}</span>
      </div>
      <div class="tool fr">
        <div>字体:
          【
          <span v-for="(item, i) in fontSizeList" :key="i" class="toolBtn" @click="setContentStyle(item)">{{item.name}}</span>
          】
        </div>
      </div>
    </div>
    <div class="main">
      <div class="contentWrap" :class="activeFontstyle" v-html="detail.newsContent"></div>
    </div>
  </div>
</template>
<script>
import { getNewsDetails } from '@/api/news'

const baseUrl = process.env.VUE_APP_API_ROOT
export default {
  created () {
    this.newsId = Number(this.$route.params.newsId) || undefined
    this.getNewsDetails(this.newsId)
  },
  watch: {
    '$route' () {
      this.newsId = Number(this.$route.params.newsId) || undefined
      this.getNewsDetails(this.newsId)
    }
  },
  data () {
    return {
      newsId: undefined,
      detail: {},
      activeFontstyle: 'middleFont',
      fontSizeList: [
        { name: '小',
          fontStyle: 'smallFont'
        },
        { name: '中',
          fontStyle: 'middleFont'
        },
        { name: '大',
          fontStyle: 'bigFont'
        }
      ]
    }
  },
  methods: {
    getNewsDetails (id) {
      if (!id) return
      getNewsDetails({ newsContentId: id })
        .then(res => {
          if (res.status_code === 200) {
            res.data.newsMainPicture = res.data.newsMainPicture ? `${baseUrl}${res.data.newsMainPicture}` : ''
            res.data.readNumber = res.data.readNumber >= 10000 ? `${(res.data.readNumber / 10000).toFixed(1)}万` : res.data.readNumber
            this.detail = res.data || {}
          }
        })
    },
    setContentStyle (item) {
      this.activeFontstyle = item.fontStyle
    }
  }
}
</script>
<style lang="less">
.newsDetail {
  padding-top: 10px;
  .title {
    height: 60px;
    line-height: 60px;
    color: #dd2222;
    font-size: 20px;
    text-align: center;
  }
  .middle {
    line-height: 40px;
    font-size: 12px;
    border-bottom: 1px solid #eee;
    .info {
      .infoItem {
        margin-right: 15px;
      }
    }
    .toolBtn {
      cursor: pointer;
      letter-spacing: 3px;
    }
  }
  .main {
    padding: 30px 0;
    .imgWrap {
      text-align: center;
      margin-bottom: 20px;
      img {
        width: 400px;
      }
    }
    .contentWrap {
      line-height: 30px;
      &.bigFont span{
        font-size: 22px!important;
        letter-spacing: 4px;
      }
      &.smallFont span{
        font-size: 14px!important;
      }
      &.middleFont span {
        font-size: 18px!important;
      }
    }
  }
}
</style>
