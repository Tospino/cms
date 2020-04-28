<template>
  <el-dialog
    class="unsolved"
    :visible.sync="dialogVisible"
    width="500px"
    :before-close="handleClose">
    <div class="unsolved-title">
      <div class="h1">很抱歉，没有解决您的问题</div>
      <div class="tip">
        选择其它渠道解决
      </div>
    </div>
    <div class="unsolved-main">
      <div class="unsolved-item">
        <div class="unsolved-item-title">
          联系电话
        </div>
        <div class="text">
          0755-29890666
        </div>
      </div>
      <div class="unsolved-item">
        <div class="unsolved-item-title">
          公司邮箱
        </div>
        <div class="text">
          info@tospino.com
        </div>
      </div>
    </div>
  </el-dialog>
</template>
<script>
export default {
  data () {
    return {
      dialogVisible: false
    }
  },
  methods: {
    handleShow () {
      this.dialogVisible = true
    },
    handleClose () {
      this.dialogVisible = false
    }
  }
}
</script>
<style lang="less" scoped>
.unsolved {
  /deep/.el-dialog__body {
    padding: 0;
  }
  .unsolved-title {
    height: 120px;
    box-sizing: border-box;
    text-align: center;
    padding-top: 20px;
    .h1 {
      font-size: 16px;
      font-weight: 700;
    }
    .tip {
      margin-top: 20px;
    }
  }
  .unsolved-main {
    background: #eee;
    height: 120px;
    padding: 20px;
    .unsolved-item {
      display: inline-block;
      width: 49%;
      height: 100%;
      border-right: 1px solid #666;
      text-align: center;
      padding: 20px 0;
      box-sizing: border-box;
      &:last-child {
        border: 0 none;
      }
      .unsolved-item-title {
        font-size: 14px;
        font-weight: 700;
        margin-bottom: 20px;
      }
    }
  }
}
</style>
