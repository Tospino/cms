<template>
  <div class="cost container contentWidth">
    <div>
      请选择您的主要经营类目：
      <el-button class="add" @click="handleAdd">添加</el-button>
    </div>
    <el-table
      :data="tableData"
      :span-method="objectSpanMethod"
      border
      style="width: 100%; margin-top: 20px">
      <el-table-column
        prop="level1Name"
        label="一级类目">
      </el-table-column>
      <el-table-column
        prop="level2Name"
        label="二级类目">
      </el-table-column>
      <el-table-column
        prop="level3Name"
        label="三级类目">
      </el-table-column>
      <el-table-column
        prop="level4Name"
        label="四级类目">
      </el-table-column>
      <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row)">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
    <div class="form">
      <div class="item">
        请选择注册类型：
        <el-radio-group v-model="registerType" @change="registerTypeChange">
          <el-radio v-for="item in registerTypeList" :label="item.id" :key="item.id">{{item.name}}</el-radio>
        </el-radio-group>
      </div>
      <div class="item">
        请选择出口类型：
         <el-radio-group v-model="exportType" @change="exportTypeChange">
          <el-radio v-for="item in exportTypeList" :label="item.id" :key="item.id">{{item.name}}</el-radio>
        </el-radio-group>
      </div>
      <div class="tip">
        说明：您在此查询的资质信息为SOP第三方商家入驻所需资质。若您有其他需求，请联系客服咨询。谢谢！特别声明本平台不开放店铺
      </div>
    </div>
    <div class="tablePanel">
      <div class="title">
        招商说明和要求
      </div>
      <el-table :data="companyQualData" style="width: 100%; margin-top: 20px" border>
        <el-table-column prop="name" :label="registerType === 1? '企业资质':'个人资质'">
        </el-table-column>
        <el-table-column prop="desc" label="详情描述(复印件需加盖公司红章)">
        </el-table-column>
      </el-table>
      <el-table :data="businessQualData" style="width: 100%; margin-top: 20px" border>
        <el-table-column prop="name" :label="exportType === 1? '出口经营资质':'非出口经营资质'">
        </el-table-column>
        <el-table-column prop="desc" label="详情描述">
        </el-table-column>
      </el-table>
      <div class="title">
        资费
      </div>
      <el-table :data="categoryCostData" style="width: 100%; margin-top: 20px" border>
        <el-table-column prop="path" label="类目">
        </el-table-column>
        <el-table-column prop="cost" label="扣点(%)">
        </el-table-column>
      </el-table>
      <el-table :data="platformCostData" style="width: 100%; margin-top: 20px" border>
        <el-table-column prop="platformCost" label="平台使用费（元/月）">
        </el-table-column>
        <el-table-column prop="margin" label="保证金（元）">
        </el-table-column>
      </el-table>
    </div>
    <Footer></Footer>
<!--     <div class="enterBTN">
      <el-button>马上入驻</el-button>
    </div> -->
    <category ref="category" @saved="categoryHandle" :categoryList="categoryList"></category>
  </div>
</template>
<script>
import Footer from '@/components/Footer.vue'
import { cache } from '@/utils/cache'
import category from '@/components/category'
import { exportManage, noExportManage, personManage, componyManage, getCategoryTree, getPlatFormCost } from '@/api/cost'

export default {
  components: { category, Footer },
  created () {
    let obj = cache.getItem('enterObj')
    if (obj) {
      obj = (Object.prototype.toString.call(obj) === '[object Object]') ? obj : {}
      this.registerType = Number(obj.registerType) || undefined
      this.exportType = Number(obj.exportType) || undefined
      this.tableData = obj.tableData || []
      this.selectedList = obj.selectedList || []
      this.platformCostData[0].margin = this.getMargin(this.tableData)
      cache.removeItem('enterObj')
    }
    this.getCategoryTree()
    this.getPlatFormCost()
    this.getExportManage()
    this.getNoExportManage()
    this.getPersonManage()
    this.getComponyManage()
  },
  data () {
    return {
      registerTypeList: [
        { id: 1, name: '企业' },
        { id: 2, name: '个人' }
      ],
      exportTypeList: [
        { id: 1, name: '出口' }
      ],
      registerType: 1,
      exportType: 1,
      tableData: [],
      selectedList: [],
      companyQualData: [],
      businessQualData: [],
      exportTable: [],
      noExportTable: [],
      personTable: [],
      companyTable: [],
      categoryList: [],
      platformCostData: [{
        platformCost: 0,
        margin: 0
      }]
    }
  },
  watch: {
    registerType (v) {
      if (v === 1) {
        this.companyQualData = this.companyTable
      } else {
        this.companyQualData = this.personTable
      }
    },
    exportType (v) {
      // console.log('出口类型改变了')
      if (v === 1) {
        this.businessQualData = this.exportTable
      } else {
        this.businessQualData = this.noExportTable
      }
    }
  },
  computed: {
    categoryCostData () {
      return this.tableData.map(v => {
        return {
          path: `${v.level1Name}/${v.level2Name}/${v.level3Name}/${v.level4Name}`,
          cost: v.commissionPercentage && v.commissionPercentage.toFixed(2)
        }
      })
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
    getPlatFormCost () {
      getPlatFormCost()
        .then(res => {
          this.platformCostData[0].platformCost = res.rows && res.rows.length && res.rows[0].cost && res.rows[0].cost.toFixed(2)
        })
    },
    getExportManage () {
      exportManage({})
        .then(res => {
          res.rows = res.rows || []
          this.exportTable = res.rows.map(v => {
            return {
              name: v.exportQualifications,
              desc: v.detailRemark
            }
          })
          if (this.exportType === 1) {
            this.businessQualData = this.exportTable
          }
        })
    },
    getNoExportManage () {
      noExportManage({})
        .then(res => {
          res.rows = res.rows || []
          this.noExportTable = res.rows.map(v => {
            return {
              name: v.noexportQualifications,
              desc: v.detailRemark
            }
          })
          if (this.exportType === 2) {
            this.businessQualData = this.noExportTable
          }
        })
    },
    getPersonManage () {
      personManage({})
        .then(res => {
          res.rows = res.rows || []
          this.personTable = res.rows.map(v => {
            return {
              name: v.personalQualifications,
              desc: v.detailRemark
            }
          })
          if (this.registerType === 2) {
            this.companyQualData = this.personTable
          }
        })
    },
    getComponyManage () {
      componyManage({})
        .then(res => {
          res.rows = res.rows || []
          this.companyTable = res.rows.map(v => {
            return {
              name: v.companyQualifications,
              desc: v.detailRemark
            }
          })
          if (this.registerType === 1) {
            this.companyQualData = this.companyTable
          }
        })
    },
    /**
     * 表格表头合并
     * @param  {object} options.row         行对象
     * @param  {object} options.column      列对象
     * @param  {number} options.rowIndex    行索引
     * @param  {number} options.columnIndex 列索引
     * @return {Array}
     */
    objectSpanMethod ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex === 0) {
          return [this.tableData.length, 1]
        } else {
          return [0, 0]
        }
      }
    },
    /**
     * 点击类目添加按钮后触发(类目面板打开后回显选中类目)
     */
    handleAdd () {
      this.$refs.category.handleShow(this.tableData)
    },
    /**
     * 删除表格中类目时触发
     */
    handleDelete (item) {
      const index = this.tableData.findIndex(v => {
        return v.level4 === item.id
      })
      this.tableData.splice(index, 1)
      this.platformCostData[0].margin = this.getMargin(this.tableData)
    },
    /**
     * 类目选择弹框点击保存后触发
     */
    categoryHandle (a) {
      // console.log(a)
      this.tableData = a.selectedGroundList.map(v => {
        return Object.assign({ id: v.id, commissionPercentage: v.commissionPercentage, categoryMargin: v.categoryMargin }, v.pathObj)
      })
      this.platformCostData[0].margin = this.getMargin(this.tableData)
    },
    getMargin (arr = []) {
      const a = arr.map(v => {
        return v.categoryMargin
      })
      return Math.max(...a).toFixed(2)
    },
    /**
     * 注册类型改变后触发
     */
    registerTypeChange (registerType) {
      // console.log(registerType)
    },
    /**
     * 出口类型改变后触发
     */
    exportTypeChange (exportType) {
      // console.log(exportType)
    }
  }
}
</script>
<style lang="less">
.cost {
  padding-bottom: 0;
  .add {
    padding: 10px 45px;
    border-radius: 0;
    border: 1px solid #dd2222;
    color: #dd2222;
    &:hover {
      background: #dd2222;
      color: #fff;
    }
  }
  .form {
    padding: 20px 0;
    .item {
      padding: 5px 0;
    }
    .tip {
      font-size: 12px;
      line-height: 40px;
    }
  }
  .tablePanel {
    border: 1px solid #ddd;
    margin-bottom: 50px;
    padding: 30px;
    .title {
      margin-top: 20px;
      font-size: 20px;
    }
  }
  .el-table th {
    background: #f5f7f9;
  }
  .el-table tr {
    font-size: 12px;
  }
  .enterBTN {
    margin-top: 30px;
    text-align: center;
    .el-button {
      padding: 10px 30px;
      color: #fff;
      background: #dd2222;
    }
  }
}
</style>
