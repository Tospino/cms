<template>
  <div class="ruleDetail">
    <div class="title clearfix">
      <div class="titleText fl">
        {{ruleDetail.ruleContentTitle}}
      </div>
<!--       <div class="download fr">
        <el-button>下载pdf</el-button>
      </div> -->
    </div>
    <div class="detailContent" v-html="ruleDetail.ruleContent"></div>
  </div>
</template>
<script>
import { getRuleDetails } from '@/api/rules'

export default {
  created () {
    this.detailId = this.$route.params.detailId
    this.getRuleDetails(this.detailId)
  },
  watch: {
    '$route' () {
      this.detailId = this.$route.params.detailId
      this.getRuleDetails(this.detailId)
    }
  },
  data () {
    return {
      detailId: undefined,
      ruleDetail: {}
    }
  },
  methods: {
    getRuleDetails (detailId) {
      getRuleDetails({ ruleContentId: detailId })
        .then(res => {
          if (res.status_code === 200) {
            this.ruleDetail = res.data || {}
          }
        })
    }
  }
}
</script>
<style lang="less">
.ruleDetail {
  .title {
    padding: 10px 0;
    .titleText {
      font-weight: 700;
      padding: 20px 0;
      color: #000;
    }
    .download {
      .el-button {
        border: 1px solid #dd2222;
        color: #ee2222;
        border-radius: 2px;
        &:hover {
          background: #dd2222;
          color: #fff;
        }
      }
    }
  }
  .detailContent {
    padding: 10px;
  }
}
</style>
