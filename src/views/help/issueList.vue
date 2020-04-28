<template>
  <div class="issueList">
    <div class="title">
      {{ title }}
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
import { getHelpList } from '@/api/help'

export default {
  created () {
    this.title = this.$route.query.classifyName
    this.classifyId = Number(this.$route.params.classifyId) || undefined
    this.getList(this.classifyId)
  },
  watch: {
    '$route' () {
      this.title = this.$route.query.classifyName
      this.classifyId = Number(this.$route.params.classifyId) || undefined
      this.getList(this.classifyId)
    }
  },
  data () {
    /**
     * classifyId 当前导航项id
     */
    return {
      classifyId: '',
      title: '争议处理规则',
      list: []
      // pageNo: 1,
      // pageSize: 10,
      // total: 56
    }
  },
  // computed: {
  //   lastPage () {
  //     return parseInt(this.total / this.pageSize) + 1
  //   }
  // },
  methods: {
    getList (id) {
      getHelpList({ helpCenterId: id })
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
      this.$router.push({ name: 'issueDetail', params: { classifyId: this.classifyId, detailId: item.helpContentId } })
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
