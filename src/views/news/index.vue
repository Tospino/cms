<template>
  <div class="news container">
    <div class="news-content clearfix contentWidth">
      <div class="news-main fl">
        <router-view/>
      </div>
      <div class="fr other">
        <!-- <div class="lianjie"></div> -->
        <div class="nearTerm">
          <div class="title">近期文章</div>
          <div class="newItem textElliptical" v-for="(item, index) in recentNewsList" :key="index" @click="toNewsDetail(item.newsContentId)">
            {{item.newsTitle}}
          </div>
        </div>
        <div class="classified">
          <div class="title">分类目录</div>
          <div class="newItem textElliptical" :class="{isActive: item.newsTypeId===activeType}" v-for="(item, index) in newsTypeList" :key="index" @click="toNewsList(item.newsTypeId)">
            {{item.newsTypeName}}
            <span v-if="item.count" style="margin-left: 5px;">({{item.count}})</span>
          </div>
        </div>
      </div>
    </div>
    <Bottom></Bottom>
  </div>
</template>
<script>
import Bottom from '@/components/Bottom'
import { getNewsTypeList, getRecentNews } from '@/api/news'

export default {
  created () {
    this.getRecentNews()
    this.getNewsTypeList()
    this.activeType = (this.$route.params && Number(this.$route.params.typeId)) || undefined
  },
  watch: {
    '$route' (v) {
      this.activeType = v.params && v.params.typeId
    }
  },
  components: { Bottom },
  data () {
    return {
      recentNewsList: [],
      newsTypeList: [],
      activeType: undefined
    }
  },
  methods: {
    // 获取新闻分类列表
    getNewsTypeList () {
      getNewsTypeList()
        .then(res => {
          this.newsTypeList = res.rows
        })
    },
    // 获取最近新闻列表
    getRecentNews () {
      getRecentNews()
        .then(res => {
          this.recentNewsList = res.rows
        })
    },
    toNewsDetail (id) {
      this.$router.push({ name: 'newsDetail', params: { newsId: id } })
    },
    toNewsList (id) {
      this.$router.push({ name: 'newsList', params: { typeId: id } })
    }
  }
}
</script>
<style lang="less">
.news {
  padding-bottom: 0;
  .news-content {
    padding: 20px 0 60px;
    min-height: calc(100vh - 290px);
    box-sizing: border-box;
    .news-main {
      width: 930px;
      margin-right: 30px;
    }
    .other {
      width: 250px;
      .lianjie {
        height: 300px;
      }
      .title {
        font-size: 18px;
        height: 40px;
        line-height: 40px;
        margin-bottom: 10px;
      }
      .nearTerm {
        margin-bottom: 20px;
      }
      .newItem {
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        padding-right: 5px;
        border-bottom: 1px solid #d5d5d5;
        cursor: pointer;
        &:hover {
          color: #2ca7f8;
        }
        &.isActive {
          color: #dd2222;
        }
      }
    }
  }
}
</style>
