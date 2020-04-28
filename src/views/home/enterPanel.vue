<template>
  <div class="enterPanel">
    <div class="title">查看入驻需要的资料和费用</div>
    <div class="tip">
      您可以在入驻前，按照将要开通店铺的经营类目、店铺类型，查看资质要求和相关费用。
    </div>
    <div class="form">
      <div class="item">
        <span>请选择您的主要经营类目：</span>
        <span class="selectedText textElliptical">{{selectedText ? selectedText : '暂无选择类目'}}</span>
        <el-button class="add" @click="handleAdd">选择类目</el-button>
      </div>
      <div class="item">
        请选择注册类型：
        <template>
          <el-radio v-model="registerType" label="1">企业</el-radio>
          <el-radio v-model="registerType" label="2">个人</el-radio>
        </template>
      </div>
      <div class="item">
        请选择出口类型：
        <template>
          <el-radio v-model="exportType" label="1">出口</el-radio>
        </template>
      </div>
    </div>
    <el-button class="enterBTN" @click="toEnter">查询</el-button>
    <category ref="category" @saved="categoryHandle" :categoryList="categoryList"></category>
  </div>
</template>
<script>
import { cache } from '@/utils/cache'
import { getCategoryTree } from '@/api/cost'
import category from '@/components/category'
export default {
  components: { category },
  created () {
    this.getCategoryTree()
  },
  data () {
    return {
      registerType: '1',
      exportType: '1',
      selectedText: '',
      tableData: [],
      selectedList: [],
      categoryList: []
    }
  },
  methods: {
    getCategoryTree () {
      getCategoryTree()
        .then(res => {
          if (res.status_code === 200) {
            this.categoryList = (res.data && res.data.list) || []
          }
        })
    },
    handleAdd () {
      this.$refs.category.handleShow(this.tableData)
    },
    categoryHandle (a) {
      this.tableData = a.selectedGroundList.map(v => {
        return Object.assign({ id: v.id, commissionPercentage: v.commissionPercentage, categoryMargin: v.categoryMargin }, v.pathObj)
      })
      this.selectedList = a.selectedList
      this.selectedText = this.tableData.map(v => {
        return `${v.level1Name}/${v.level2Name}/${v.level3Name}/${v.level4Name}`
      }).join(',')
    },
    toEnter () {
      cache.setItem('enterObj', JSON.stringify({
        registerType: this.registerType,
        exportType: this.exportType,
        tableData: this.tableData,
        selectedList: this.selectedList
      }))
      this.$router.push({ name: 'cost' })
    }
  }
}
</script>
<style lang="less">
.enterPanel {
  .title {
    font-size: 18px;
    padding: 15px 0;
  }
  .tip {
    padding: 10px 0;
    font-size: 14px;
  }
  .selectedText {
    display: inline-block;
    width: 120px;
    vertical-align: middle;
    margin-right: 15px;
    font-size: 12px;
    height: 32px;
    line-height: 32px;
    padding-left: 10px;
    border: 1px solid #aaa;
    border-radius: 2px;
  }
  .form {
    .item {
      padding: 10px 0;
    }
  }
  .add {
    padding: 10px 20px;
    color: #fff;
    border: 0 none;
    font-size: 12px;
    background: #dd2222;
    border-radius: 2px;
  }
  .enterBTN {
    margin-top: 20px;
    padding: 10px 45px;
    border-radius: 0;
    border: 1px solid #dd2222;
    color: #dd2222;
    &:hover {
      background: #dd2222;
      color: #fff;
    }
  }
}
</style>
