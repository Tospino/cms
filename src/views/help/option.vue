<template>
  <el-dialog
    class="option"
    :close-on-click-modal="false"
    :visible.sync="dialogVisible"
    width="600px"
    :before-close="handleClose">
    <div class="option-title">
      请您给一些意见和评价
    </div>
    <div class="tags clearfix">
      <div class="tagItem fl" v-for="(tag, index) in tagList" :key="index" @click="handleSelect(tag)" :class="{selected: checkTag(tag.labelId)}">{{tag.labelName}}</div>
    </div>
    <div class="form">
      <el-input
        type="textarea"
        :rows="6"
        maxlength="200"
        show-word-limit
        placeholder="请输入您的其他意见和评价"
        v-model="formData.textarea">
      </el-input>
      <div class="inputGroup clearfix">
        <div class="inputItem fl">
          <div><span class="label">手机号:</span><el-input v-model="formData.phone"></el-input></div>
          <div class="tip">{{tips.phone}}</div>
        </div>
        <div class="inputItem fl">
          <div><span class="label">邮箱:</span><el-input v-model="formData.email"></el-input></div>
          <div class="tip emailtip">{{tips.email}}</div>
        </div>
      </div>
      <div class="submit">
        <el-button class="submitBtn" @click="handleSubmit">提交</el-button>
      </div>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: {
    tagList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      dialogVisible: false,
      selectedTags: [],
      formData: {
        textarea: '',
        phone: '',
        email: ''
      },
      tips: {
        phone: '',
        email: ''
      }
    }
  },
  methods: {
    handleShow () {
      this.dialogVisible = true
    },
    handleClose () {
      this.dialogVisible = false
    },
    checkTag (tagId) {
      return this.selectedTags.find(v => {
        return v.labelId === tagId
      })
    },
    handleSelect (tag) {
      if (this.checkTag(tag.labelId)) {
        const i = this.selectedTags.findIndex(v => {
          return v.labelId === tag.labelId
        })
        this.selectedTags.splice(i, 1)
      } else {
        this.selectedTags.push(tag)
      }
    },
    handleSubmit () {
      const phoneReg = /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/
      const emailReg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (this.formData.phone && !phoneReg.test(this.formData.phone)) {
        this.tips.phone = '手机格式错误'
        return false
      }
      this.tips.phone = ''
      if (this.formData.email && !emailReg.test(this.formData.email)) {
        this.tips.email = '邮箱格式错误'
        return false
      }
      this.tips.email = ''
      const selectedTagsText = this.selectedTags.map(v => {
        return v.labelName
      })
      this.$emit('submitSuccess', Object.assign(this.formData, { selectedTags: selectedTagsText }))
    },
    // 重置表单数据
    formReset () {
      this.formData = {
        textarea: '',
        phone: '',
        email: ''
      }
      this.selectedTags = []
      this.tips = {
        phone: '',
        email: ''
      }
    }
  }
}
</script>
<style lang="less">
.option {
  .el-dialog__header {
    padding: 0;
  }
  .option-title {
    font-size: 18px;
    font-weight: 700;
    text-align: center;
    padding: 20px;
    margin-bottom: 20px;
  }
  .tags {
    .tagItem {
      padding: 7px 10px;
      border: 1px solid #d1d1d1;
      border-radius: 2px;
      margin-right: 10px;
      margin-bottom: 10px;
      cursor: pointer;
      &.selected {
        border: 1px solid #2c83ef;
        color: #2c83ef;
      }
    }
  }
  .form {
    .el-textarea__inner, .el-input__inner {
      border-radius: 2px;
    }
    .inputItem {
      margin: 20px 0 5px;
      width: 50%;
      .label {
        margin-right: 10px;
      }
      .el-input {
        width: 200px;
        .el-input__inner {
          height: 36px;
          line-height: 36px;
        }
      }
      .tip {
        height: 24px;
        line-height: 24px;
        box-sizing: border-box;
        padding: 0 60px;
        font-size: 12px;
        color: red;
        &.emailtip {
          padding-left: 40px;
        }
      }
    }
    .submit {
      text-align: center;
      .submitBtn {
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
}
</style>
