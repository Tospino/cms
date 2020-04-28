<template>
  <div class="ruleList">
    <div class="tip">共搜索到<span class="num">{{ruleList.length}}条</span>规则</div>
    <div class="result">
      <div class="ruleItem" v-for="item in ruleList" :key="item.id" @click="toDetail(item)">{{item.ruleContentTitle}}</div>
    </div>
  </div>
</template>
<script>
import { getRulesBySearch } from '@/api/rules'

export default {
  created () {
    this.searchText = this.$route.query.searchText || undefined
    this.getRuleList(this.searchText)
  },
  watch: {
    '$route' () {
      this.searchText = this.$route.query.searchText || undefined
      this.getRuleList(this.searchText)
    }
  },
  data () {
    return {
      searchText: '',
      ruleList: []
    }
  },
  methods: {
    getRuleList (searchText) {
      getRulesBySearch({ ruleContentTitle: searchText })
        .then(res => {
          if (res.status_code === 200) {
            this.ruleList = res.data
          }
        })
    },
    toDetail (item) {
      this.$router.push({ name: 'ruleDetail', params: { detailId: item.ruleContentId } })
    }
  }
}
</script>
<style lang="less">
@disabled: #C0C4CC;
@fontColor: #C81623;
.ruleList {
  .tip {
    font-size: 14px;
    line-height: 40px;
    .num {
      font-weight: 700;
      color: @fontColor;
    }
  }
  .result {
    padding: 10px 0 20px;
    .ruleItem {
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      cursor: pointer;
      &:hover {
        color: @fontColor;
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
