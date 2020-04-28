<template>
  <div class="issueList">
    <div class="searchTitle">
      搜索"{{searchTitle}}"共找到{{list.length}}个常见问题
    </div>
    <div class="issueContent">
      <template v-if="list.length">
        <div v-for="item in list" :key="item.helpContentId" class="issueItem" @click="toDetail(item)">
          <span class="diandian">·</span>
          <span class="text"></span>
          {{ item.helpContentTitle }}
        </div>
      </template>
      <template v-else>
        <div>
          暂无数据
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import { getHelpListBySearch } from '@/api/help'

export default {
  created () {
    this.searchTitle = this.$route.query.searchText
    this.getList(this.searchTitle)
  },
  watch: {
    '$route' () {
      this.searchTitle = this.$route.query.searchText
      this.getList(this.searchTitle)
    }
  },
  data () {
    /**
     * classifyId 当前导航项id
     */
    return {
      searchTitle: '',
      list: []
    }
  },
  methods: {
    getList (searchTitle) {
      getHelpListBySearch({ ruleContentTitle: searchTitle })
        .then(res => {
          if (res.status_code === 200) {
            this.list = res.data
          }
        })
    },
    /**
     * 路由跳转
     */
    toDetail (item) {
      this.$router.push({ name: 'issueDetail', params: { detailId: item.helpContentId } })
    }
  }
}
</script>
<style lang="less">
@disabled: #C0C4CC;
.issueList {
  padding-top: 30px;
  .title {
    height: 40px;
    border-bottom: 1px solid #e2e2e2;
  }
  .issueContent {
    padding: 20px;
    border-bottom: 1px solid #e2e2e2;
    font-size: 14px;
    .issueItem {
      cursor: pointer;
      height: 40px;
      line-height: 40px;
      .diandian {
        font-size: 30px;
        position: relative;
        top: 5px;
        margin-right: 10px;
      }
      .text {
        cursor: pointer;
      }
    }
  }
  .cutomSlot {
    font-weight: 400;
    text-align: center;
    & .disabled {
      color: @disabled;
    }
  }
}
</style>
