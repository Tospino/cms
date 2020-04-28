<template>
  <div class="ruleList">
    <div class="tip">共搜索到<span class="num">{{ruleList.length}}条</span>规则</div>
    <div class="result">
      <div class="ruleItem" v-for="item in ruleList" :key="item.id" @click="toDetail(item)">{{item.ruleContentTitle}}</div>
    </div>
<!--     <el-pagination
      layout="prev, slot, next"
      prev-text="上一页"
      next-text="下一页"
      :current-page="pageNo"
      @current-change="getList"
      :total="total">
      <template slot>
        <span class="cutomSlot">
          <button type="button" :disabled="pageNo === 1" class="btn-prev" @click="getList(1)"><span>首页</span></button>
          <span>{{pageNo}}</span>
          <button type="button" :disabled="pageNo === lastPage" class="btn-next" @click="getList(lastPage)"><span>末页</span></button>
        </span>
      </template>
    </el-pagination> -->
  </div>
</template>
<script>
import { getRuleList } from '@/api/rules'

export default {
  created () {
    this.classifyId = Number(this.$route.params.classifyId) || undefined
    this.getRuleList(this.classifyId)
  },
  watch: {
    '$route' () {
      this.classifyId = Number(this.$route.params.classifyId) || undefined
      this.getRuleList(this.classifyId)
    }
  },
  data () {
    return {
      classifyId: undefined,
      ruleList: []
      // total: 0,
      // pageSize: 10,
      // pageNo: 1
    }
  },
  // computed: {
  //   lastPage () {
  //     return parseInt(this.total / this.pageSize) + 1
  //   }
  // },
  methods: {
    getRuleList (id) {
      if (!id) return
      getRuleList({ ruleId: id })
        .then(res => {
          if (res.status_code === 200) {
            this.ruleList = res.data || []
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
