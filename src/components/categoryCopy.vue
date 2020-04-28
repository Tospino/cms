<template>
  <el-dialog
    title="请选择类目"
    :visible.sync="dialogVisible"
    width="1000px"
    :before-close="handleClose">
    <div class="categoryPanel clearfix">
      <div class="categoryWrap">
        <div class="item" :class="{'active': activeLevl1.id === item.id}" v-for="(item, i) in lev1List" :key="i" @click="getChildren(item, 1)">
          {{item.name}}
        </div>
      </div>
      <div class="categoryWrap">
        <div class="item" :class="{'active': activeLevl2.id === item.id}" v-for="(item, i) in lev2List" :key="i"  @click="getChildren(item, 2)">
          <span>
            <el-checkbox v-model="item.checked" @change='handleChange(item, 2)' @click.native.stop></el-checkbox>
          </span>
          <span class="name">{{item.name}}</span>
        </div>
      </div>
      <div class="categoryWrap">
        <div class="item" :class="{'active': activeLevl3.id === item.id}" v-for="(item, i) in lev3List" :key="i" @click="getChildren(item, 3)">
          <el-checkbox v-model="item.checked" @change='handleChange(item, 3)' @click.native.stop></el-checkbox>
          <span class="name">{{item.name}}</span>
        </div>
      </div>
      <div class="categoryWrap">
        <div class="item" :class="{'active': activeLevl4.id === item.id}" v-for="(item, i) in lev4List" :key="i" @click="getChildren(item, 4)">
          <el-checkbox v-model="item.checked" @change='handleChange(item, 4)' @click.native.stop></el-checkbox>
          <span class="name">{{item.name}}</span>
        </div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleSave">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { list } from './json.js'
const lev1List = list

export default {
  /**
   * 树结构数据，中间一个字段标记选中状态
   * 一个数组变量放置选中项
   * 四个数组放置当前显示的四级类目
   * 四个当前选中行变量（当前选中行高亮，再点击后还是同一行不再获取子孙级）
   * 选中后，修改状态
   * 方法一： 维护树结构数据，提交时从树结构中提取出选中类目数组
   * 1.点击类目时获取子类目列表，放入数据子级，如果点击的是一级类目，重置整棵树状态，再标记该类目状态为选中。(再次点击同一目录，不去请求接口)
   * 2.选中类目后，标记该类目为选中状态，获取到子孙级类目列表后，将子孙级类目全部标记为选中状态。
   * 3.取消选中后，修改状态及其所有子孙级状态，可能还影响到父级状态。
   * 方法二： 维护选中数组（不采用）
   * 选中后，添加进选中数组，取消选中后从选中数组中移除
   */
  data () {
    return {
      dialogVisible: false,
      selected: [],
      activeLevl1: {},
      activeLevl2: {},
      activeLevl3: {},
      activeLevl4: {},
      lev1List,
      lev2List: [],
      lev3List: [],
      lev4List: []
    }
  },
  methods: {
    /**
     * 点击当前行时触发，设置当前选中行并获取其子级类目，另设置子级类目框当前显示为该当前选中行的子级
     */
    getChildren (item, level, changeStatu) {
      // 清空所有选中及树结构中选中标记及二级、三级、四级类目列表
      if (level === 1) {
        this.resetAll()
        this.selected.push(item.id)
        this.$set(item, 'checked', true)
      }
      // 设置当前选中行
      this[`activeLevl${level}`] = item
      // todo 获取子级列表
      // 如果有状态，将子级选中状态设置为该状态
      if (changeStatu) {
        this.changeStatu(item, level)
        if (item.checked) {
          // 如果被选中，获取所有子孙级类目，如果取消选中，说明已经被选中过，不用再获取子孙级
        }
      } else {
        // 如果只是被点击，没被选中，就获取子级列表就可以了
      }
      // 设置子级类目框当前显示为该当前选中行的子级
      this[`lev${level + 1}List`] = item.children
    },
    /**
     * 使用click事件会触发两次，使用change事件仅触发一次，所以使用change事件原始特性改变checked键的值并触发函数，使用click阻止冒泡
     */
    handleChange (item, level) {
      this.getChildren(item, level, true)
      // 父级被选中后，子级才显示，所以当前改变状态项的父级一定是当前被选中的上一级
      this.checkStatu(this[`activeLevl${level - 1}`], level)
    },
    /**
     * 每次有选中项状态改变时，改变所有子孙级的状态，并去判断设置父级的选中状态
     */
    changeStatu (item, level) {
      if (item.children) {
        item.children.forEach(v => {
          this.$set(v, 'checked', item.checked)
          this.changeStatu(v)
        })
      }
    },
    /**
     * 判断并设置祖先级的选中状态
     */
    checkStatu (item, level) {
      if (!level) return
      let checkedNum = 0
      if (item.children) {
        item.children.forEach(v => {
          if (v.checked) {
            checkedNum++
          }
        })
      }
      if (checkedNum) {
        this.$set(item, 'checked', true)
      } else {
        this.$set(item, 'checked', false)
      }
      this.checkStatu(this[`activeLevl${level - 1}`], level - 1)
    },
    /**
     * 遍历树结构获取所有选中项
     * @param  {Array} arr 树结构类目列表
     * @param  {Array}  a   选中类目列表
     * @return {Array}     选中类目列表
     */
    getSelected (arr, a = []) {
      arr.forEach(v => {
        if (v.checked) {
          a.push(v.id)
          if (v.children && v.children.length) {
            this.getSelected(v.children, a)
          }
        }
      })
      return a
    },
    /**
     * 获取选中的底层类目
     * @param  {Array} arr       树结构类目列表
     * @param  {Number} level     类目级别
     * @param  {Object} parentObj 类目路径对象
     * @param  {Array}  a         从选中中筛选出的底层类目列表
     * @return {Array}  a        从选中中筛选出的底层类目列表
     */
    getTabel (arr, level = 1, pathObj = {}, a = []) {
      arr.forEach(v => {
        // 给数据加上level标记及祖先对象集合
        v.level = level
        v.pathObj = Object.assign({}, pathObj)
        if (v.checked) {
          v.pathObj[`level${level}`] = v.id
          v.pathObj[`level${level}Name`] = v.name
          if (v.children && v.children.length) {
            this.getTabel(v.children, level + 1, v.pathObj, a)
          } else if (v.level === 4) {
            a.push(v)
          }
        }
      })
      return a
    },
    /**
     * 打开类目选择面板时，根据tableData显示选中状况
     */
    handleShow (tableData) {
      // console.log(tableData)
      let arr = []
      tableData.forEach(v => {
        arr.push(v.level1)
        arr.push(v.level2)
        arr.push(v.level3)
        arr.push(v.level4)
      })
      arr = this.uniq(arr)
      if (arr.length) {
        this.resetTreeData(this.lev1List, arr)
      } else {
        this.resetAll()
      }
      // todo 选中展示
      this.dialogVisible = true
    },
    /**
     * 保存时触发，把选中状态传递给父组件
     * @return {[type]} [description]
     */
    handleSave () {
      const selectedList = this.getSelected(this.lev1List)
      const selectedGroundList = this.getTabel(this.lev1List)
      this.$emit('saved', {
        selectedList: selectedList,
        selectedGroundList: selectedGroundList
      })
      this.dialogVisible = false
    },
    /**
     * 关闭弹框
     */
    handleClose () {
      this.dialogVisible = false
    },
    /**
     * 数组去重
     */
    uniq (arr) {
      return [...new Set(arr)]
    },
    /**
     * 根据选中列表设置树结构选中字段
     * @param  {Array} treeData 树结构列表
     * @param  {Array} selected 选中列表
     */
    resetTreeData (treeData, selected = []) {
      // 先全部置为不选中
      treeData.forEach(v => {
        if (selected.includes(v.id)) {
          this.$set(v, 'checked', true)
        } else {
          this.$set(v, 'checked', false)
        }
        if (v.children && v.children.length) {
          this.resetTreeData(v.children, selected)
        }
      })
    },
    /**
     * 重置所有选中（重置树结构中选中标记、选中列表、类目二三四显示列表、当前点击类目）
     */
    resetAll () {
      this.resetTreeData(this.lev1List)
      this.selected = []
      this.lev2List = []
      this.lev3List = []
      this.lev4List = []
      this.activeLevl1 = {}
      this.activeLevl2 = {}
      this.activeLevl3 = {}
      this.activeLevl4 = {}
    }
  }
}
</script>
<style lang="less">
.categoryPanel {
  .categoryWrap {
    border-radius: 2px;
    box-shadow: 0 1px 6px rgba(0,0,0,.2);
    background-color: #fff;
    width:22%;
    height: 240px;
    overflow: auto;
    padding: 5px 0;
    float: left;
    margin-right: 15px;
    font-size: 12px;
    .item {
      line-height: 25px;
      padding: 0 10px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
      &.active {
        background: rgba(255,51,51,.9)!important;
        color: #fff!important;
      }
      .name {
        margin-left: 8px;
      }
    }
  }
}
</style>
