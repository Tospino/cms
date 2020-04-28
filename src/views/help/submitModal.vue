<template>
  <el-dialog
    class="submitModal"
    :show-close="false"
    :visible.sync="dialogVisible"
    width="420px"
    :before-close="handleClose">
    <div class="successIcon">
      <span class="iconfont icon-ico-success"></span>
    </div>
    <div class="successTip">
      <span>感谢您提出的宝贵意见，相信明天会更好！</span>
    </div>
    <div class="closeBtn">
      <el-button @click="handleClose">关闭</el-button>
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
<style lang="less">
.submitModal {
  text-align: center;
  .el-dialog__header {
    padding: 0;
  }
  .successIcon {
    .iconfont {
      color: #0f890d;
      font-size: 60px;
    }
  }
  .successTip {
    margin: 20px 0 40px;
  }
  .closeBtn {
    .el-button {
      width: 120px;
      height: 38px;
      border-radius: 2px;
      &:hover {
        background: #2c83ef;
        color: #fff;
      }
    }
  }
}
</style>
