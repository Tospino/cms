<template>
  <div class="rules">
<!--     <div class="head contentWidth">
      <div class="fl">
        <span class="logoText" @click="toHome">Tospino</span>
        <span class="logoName">平台规则</span>
      </div>
      <div class="fr">
        登录
      </div>
    </div> -->
    <div class="middle">
      <div class="contentWidth">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/help' }">全部</el-breadcrumb-item>
          <el-breadcrumb-item v-if="activeLev2.id">{{activeLev2.tree_name}}</el-breadcrumb-item>
          <el-breadcrumb-item v-if="activeLev3.id">{{activeLev3.tree_name}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="main">
      <div class="contentWidth clearfix" style="height: 100%;">
        <div class="nav fl">
          <el-menu :unique-opened="true" :default-active="toString(classifyId)" ref="menu">
            <el-submenu v-for="item in navList" :key="item.id" :index="toString(item.id)" class="textElliptical">
              <template slot="title">
                <span class="iconfont icon-jianhaoshouqi"></span>
                <span class="iconfont icon-jiahaozhankai"></span>
                {{item.tree_name}}
              </template>
              <el-menu-item v-for="m in item.child" :key="m.id" :index="toString(m.id)" class="textElliptical" @click="handleSelect(item, m)">
                {{m.tree_name}}
                <span class="iconfont icon-cs-dw-xy-1"></span>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </div>
        <div class="content fl">
          <div class="searchPanel">
            <el-input placeholder="请输入问题关键字" v-model="searchText" @keyup.enter.native="toSearch"></el-input>
            <el-button @click="toSearch">搜索</el-button>
          </div>
          <router-view/>
        </div>
      </div>
    </div>
    <Footer style="background: #eee;"></Footer>
  </div>
</template>
<script>
import Footer from '@/components/Footer.vue'
import { getRuleNavTree } from '@/api/rules'

export default {
  components: { Footer },
  created () {
    this.getRuleNavTree()
    if (this.$route.name === 'ruleSearch') {
      this.searchText = this.$route.query.searchText
    }
  },
  data () {
    /**
     * searchText 搜索关键字
     */
    return {
      searchText: '',
      classifyId: '',
      navList: [],
      activeLev2: {},
      activeLev3: {}
    }
  },
  methods: {
    /**
     * 获取导航数据
     */
    getRuleNavTree () {
      getRuleNavTree()
        .then(res => {
          if (res.status_code === 200) {
            this.navList = res.data.list || []
            if (this.$route.name === 'rules') {
              if (this.navList.length && this.navList[0].child && this.navList[0].child.length) {
                this.classifyId = this.navList[0].child[0].id
                // todo 获取完导航列表后，遍历导航列表，查找到当前被激活路由对应的导航
                this.activeLev2 = this.navList[0]
                this.activeLev3 = this.navList[0].child[0]
                this.$router.push({ name: 'ruleList', params: { classifyId: this.navList[0].child[0].id }, query: { classifyName: this.navList[0].child[0].tree_name } })
              }
            } else {
              this.classifyId = Number(this.$route.params.classifyId) || undefined
              // todo 获取完导航列表后，遍历导航列表，查找到当前被激活路由对应的导航
              this.activeLev2 = this.findPath(this.classifyId).lev2
              this.activeLev3 = this.findPath(this.classifyId).lev3
            }
          }
        })
    },
    /**
     * 点击导航项时触发（设置面包屑，跳转）
     */
    handleSelect (lev2, lev3) {
      this.searchText = ''
      this.activeLev2 = lev2
      this.activeLev3 = lev3
      this.$router.push({ name: 'ruleList', params: { classifyId: lev3.id }, query: { classifyName: lev3.tree_name } })
    },
    /**
     * 根据当前路由的导航id查找当前导航路径
     */
    findPath (id) {
      if (!id) {
        return {
          lev2: {},
          lev3: {}
        }
      }
      const lev2 = this.navList.find(v => {
        return v.child.find(m => {
          return m.id === id
        })
      })
      // 如果不存在，直接返回
      if (!lev2) {
        return {
          lev2: {},
          lev3: {}
        }
      } else {
        lev2.child = lev2.child || []
      }
      const lev3 = lev2.child.find(v => {
        return v.id === id
      })
      return {
        lev2: lev2,
        lev3: lev3
      }
    },
    toSearch () {
      this.$router.push({ name: 'ruleSearch', query: { searchText: this.searchText } })
    },
    toHome () {
      this.$router.push({ name: 'home' })
    },
    toString (num) {
      return String(num)
    }
  }
}
</script>
<style lang="less">
.rules {
  height: 100%;
  display: flex;
  flex-direction: column;
  .head {
    height: 100px;
    box-sizing: border-box;
    padding-top: 30px;
    .fl {
      .logoText {
        color: #f15559;
        font-family: 'Segoe Script Bold', 'Segoe Script Normal', 'Segoe Script';
        font-weight: 700;
        font-style: normal;
        font-size: 38px;
        padding-right: 20px;
        cursor: pointer;
      }
      .logoName {
        font-size: 20px;
        padding-left: 10px;
        position: relative;
        top: -5px;
      }
    }
  }
  .middle {
    height: 100px;
    background: #ff6900;
    .el-breadcrumb {
      margin-top: 40px;
      font-size: 16px;
      .el-breadcrumb__inner, .el-breadcrumb__separator {
        color: #fff;
      }
    }
  }
  .main {
    flex: 1;
    box-sizing: border-box;
    background: #eee;
    padding: 30px 0;
    .nav {
      min-height: 100%;
      box-sizing: border-box;
      padding: 20px 0;
      width: 250px;
      background: #fff;
      margin-right: 30px;
      .el-menu {
        border: 0 none;
        .el-submenu {
          & .icon-jiahaozhankai {
            display: inline-block;
          }
          & .icon-jianhaoshouqi {
            display: none;
          }
          &.is-opened .icon-jianhaoshouqi {
            display: inline-block;
          }
          &.is-opened .icon-jiahaozhankai {
            display: none;
          }
        }
      }
      .el-submenu__title {
        height: 40px;
        line-height: 40px;
        .iconfont {
          margin-right: 10px;
        }
        .el-submenu__icon-arrow {
          display: none;
        }
      }
      .el-menu-item {
        height: 40px;
        line-height: 40px;
        padding-left: 50px!important;
        padding-right: 10px;
        color: #999;
        .icon-cs-dw-xy-1 {
          margin-left: 5px;
          font-size: 10px;
          color: #444;
          display: none;
        }
        &.is-active {
          color: #333;
          .icon-cs-dw-xy-1 {
            display: inline-block;
          }
        }
      }
    }
    .content {
      min-height: 100%;
      width: calc(~'100% - 280px');
      background: #fff;
      height: 100%;
      padding: 30px;
      box-sizing: border-box;
      .searchPanel {
        text-align: center;
        padding: 20px 0 30px 0;
        border-bottom: 1px solid #E2E2E2;
        .el-input {
          width: 350px;
          margin-right: 15px;
          .el-input__inner {
            border-radius: 0px;
          }
        }
        .el-button {
          border-radius: 0px;
          width: 80px;
          background: #dd2222;
          color: #fff;
          border: 0 none;
        }
      }
    }
  }
}
</style>
