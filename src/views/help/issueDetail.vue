<template>
  <div class="issueDetail">
    <div class="title">
      {{ helpDetails.helpContentTitle }}
    </div>
    <div class="detailContent" v-html="helpDetails.helpContent">
    </div>
    <div class="result">
      <div class="resultItem" @click="handleSolve(true)" :class="{'solved': beSolve, 'active': solvedFlag === 0}">
        <span class="iconfont icon-dianzan"></span>
        <span class="text">已解决</span>
      </div>
      <div class="resultItem" @click="unsolvedShow" :class="{'solved': beSolve, 'active': solvedFlag === 1}">
        <span class="iconfont icon-dianzan2"></span>
        <span class="text">未解决</span>
      </div>
      <div class="resultItem" @click="optionShow">
        <span class="iconfont icon-message-square"></span>
        <span class="text">您的意见评价</span>
      </div>
    </div>
    <unsolved ref="unsolved"></unsolved>
    <Option ref="option" :tagList="tagList" @submitSuccess="submitSuccess"></Option>
    <submitModal ref="submitModal"></submitModal>
  </div>
</template>
<script>
import { getHelpDetails } from '@/api/help'
import { solveHandler, getTagList, feedbackHandler } from '@/api/feedback'
import unsolved from './unsolved.vue'
import Option from './option.vue'
import submitModal from './submitModal.vue'
export default {
  components: { unsolved, Option, submitModal },
  created () {
    this.detailId = this.$route.params.detailId
    this.getHelpDetails(this.detailId)
    this.getTagList()
  },
  watch: {
    '$route' () {
      this.detailId = this.$route.params.detailId
      this.getHelpDetails(this.detailId)
    }
  },
  data () {
    return {
      helpDetails: {},
      beSolve: false,
      tagList: [],
      solvedFlag: undefined
    }
  },
  methods: {
    getHelpDetails (id) {
      getHelpDetails({ helpContentId: id })
        .then(res => {
          if (res.status_code === 200) {
            this.helpDetails = res.data || {}
          }
        })
    },
    unsolvedShow () {
      if (!this.beSolve) {
        this.handleSolve(false)
        this.$refs.unsolved.handleShow()
      }
    },
    optionShow () {
      this.$refs.option.handleShow()
    },
    submitSuccess (formData) {
      feedbackHandler({
        email: formData.email,
        phoneNumber: formData.phone,
        feedbackContent: formData.textarea,
        evaluateIp: window.returnCitySN['cip'],
        feedbackLabel: formData.selectedTags.join('，'),
        helpContentId: this.helpDetails.helpContentId
      }).then(res => {
        this.$refs.option.formReset()
        this.$refs.option.handleClose()
        this.$refs.submitModal.handleShow()
      })
    },
    handleSolve (solvedFlag) {
      if (this.beSolve) return
      // 已解决1，未解决0
      this.solvedFlag = solvedFlag ? 0 : 1
      const data = {
        feedbackIp: window.returnCitySN['cip'],
        helpContentId: this.helpDetails.helpContentId,
        solveStatus: this.solvedFlag
      }
      solveHandler(data)
        .then(res => {
          this.beSolve = true
        })
    },
    getTagList () {
      getTagList()
        .then(res => {
          this.tagList = res.rows
        })
    }
  }
}
</script>
<style lang="less">
.issueDetail {
  padding: 40px 20px;
  .title {
    font-weight: 700;
    height: 40px;
    border-bottom: 1px solid #aaa;
  }
  .detailContent {
    padding: 10px;
    border-bottom: 1px solid #aaa;
    font-size: 14px;
    text-indent: 28px;
    line-height: 26px;
  }
  .result {
    text-align: center;
    margin-top: 30px;
    .resultItem {
      cursor: pointer;
      color: #999898;
      display: inline-block;
      margin-right: 30px;
      padding: 0 20px;
      line-height: 40px;
      height: 40px;
      text-align: center;
      box-sizing: border-box;
      border: 1px solid #cbcbcb;
      border-radius: 2px;
      &:hover {
        border: 1px solid #2c83ef;
        background: #2c83ef;
        color: #fff;
      }
      &.solved {
        background: #ccc!important;
        &.active {
          background: #2c83ef!important;
          color: #fff;
          border: 1px solid #2c83ef;
        }
      }
      .iconfont {
        font-size: 20px;
        vertical-align: middle;
      }
      .text {
        margin-left: 10px;
      }
    }
  }
}
</style>
