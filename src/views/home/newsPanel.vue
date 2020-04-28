<template>
  <div class="newsPanel">
    <div class="title">
      新闻动态
      <span class="cursorPointer fr" @click="$router.push({name: 'newsList'})">
        <span class="iconfont icon-youjiantou"></span>
      </span>
    </div>
    <div class="line"></div>
    <ul class="content">
      <li v-for="(item, index) in list" :key="index" class="newItem" @click="toNewsDetail(item.newsContentId)">
        <span class="date">{{item.newsRTime}}</span>
        <span class="text">{{item.newsTitle}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
import { getNewsListForHome } from '@/api/news'

export default {
  created () {
    this.getNewsList()
  },
  data () {
    return {
      list: []
    }
  },
  methods: {
    getNewsList () {
      getNewsListForHome()
        .then(res => {
          this.list = res.rows || []
          this.list = this.list.splice(0, 8)
        })
    },
    toNewsDetail (id) {
      this.$router.push({ name: 'newsDetail', params: { newsId: id } })
    }
  }
}
</script>
<style lang="less">
.newsPanel {
  background: #fff;
  box-sizing: border-box;
  padding: 20px;
  height: 320px;
  width: 350px;
  border-radius: 10px;
  .title {
    height: 40px;
    line-height: 40px;
    .iconfont {
      &:hover {
        color: #2ca7f8;
      }
    }
  }
  .line {
    width: 100%;
    height: 1px;
    background: #eee;
  }
  .content {
    height: 225px;
    overflow:hidden;
    padding: 10px 5px;
    .newItem {
      font-size: 12px;
      height: 30px;
      line-height: 30px;
      width: 100%;
      overflow:hidden;
      white-space:nowrap;
      text-overflow:ellipsis;
      cursor: pointer;
      &:hover {
        color: #2ca7f8;
      }
      .date {
        color: #dd2222;
        margin-right: 10px;
      }
    }
  }
}
</style>
