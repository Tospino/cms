<template>
  <div class="help">
<!--     <div class="head contentWidth">
      <div class="fl">
        <span class="logoText" @click="toHome">Tospino</span>
        <span class="logoName">商家帮助中心</span>
      </div>
      <div class="fr">
        登录
      </div>
    </div> -->
    <div class="middle">
      <div class="contentWidth clearfix">
        <div class="fl">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/help' }">全部</el-breadcrumb-item>
            <el-breadcrumb-item v-if="activeLev2.id">{{activeLev2.tree_name}}</el-breadcrumb-item>
            <el-breadcrumb-item v-if="activeLev3.id">{{activeLev3.tree_name}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="fr">
          <el-input
            @keyup.enter.native="toHelpSearch"
            placeholder="请输入问题关键字"
            v-model="searchText">
            <i slot="suffix" class="el-input__icon el-icon-search cursorPointer" @click="toHelpSearch"></i>
          </el-input>
        </div>
      </div>
    </div>
    <div class="main contentWidth">
      <div class="nav fl">
        <el-menu :unique-opened="true" :default-active="toString(classifyId)" ref="menu">
          <el-submenu v-for="item in navList" :key="item.id" :index="toString(item.id)"  class="textElliptical">
            <template slot="title">
              <div class="line"></div>
              {{item.tree_name}}
            </template>
            <el-menu-item v-for="m in item.child" :key="m.id" :index="toString(m.id)" @click="handleSelect(item, m)" class="textElliptical">{{m.tree_name}}</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
      <div class="content fl">
        <div>
          <router-view/>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import Footer from '@/components/Footer.vue'
import { getHelpNavTree } from '@/api/help'

export default {
  components: { Footer },
  created () {
    this.getHelpNavTree()
    if (this.$route.name === 'helpSearch') {
      this.searchText = this.$route.query.searchText
    }
  },
  data () {
    /**
     * searchText 搜索关键字
     * tabList    tab列表
     * activeTab  当前tab
     * classifyId 当前激活导航项（会展开该导航项父级，并自动高亮当前导航项
     * navList 导航列表
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
    getHelpNavTree () {
      getHelpNavTree()
        .then(res => {
          if (res.status_code === 200) {
            this.navList = res.data.list || []
            this.setParent()
            if (this.$route.name === 'help') {
              if (this.navList.length && this.navList[0].child && this.navList[0].child.length) {
                this.classifyId = this.navList[0].child[0].id
                // todo 获取完导航列表后，遍历导航列表，查找到当前被激活路由对应的导航
                this.activeLev2 = this.navList[0]
                this.activeLev3 = this.navList[0].child[0]
                this.$router.push({ name: 'issueList', params: { classifyId: this.navList[0].child[0].id }, query: { classifyName: this.navList[0].child[0].tree_name } })
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
     * 避免每次点击导航时都需要遍历一遍导航数据去获取层级，直接将每个导航项的parent对象id和name设置到导航项上
     */
    setParent () {
      this.navList.forEach(v => {
        v.child.forEach(m => {
          m.pId = v.id
          m.pName = v.tree_name
        })
      })
    },
    /**
     * 点击导航项时触发（设置面包屑，跳转）
     */
    handleSelect (lev2, lev3) {
      this.searchText = ''
      this.activeLev2 = lev2
      this.activeLev3 = lev3
      this.$router.push({ name: 'issueList', params: { classifyId: lev3.id }, query: { classifyName: lev3.tree_name } })
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
    toHelpSearch () {
      this.$router.push({ name: 'helpSearch', query: { searchText: this.searchText } })
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
.help {
  height: 100%;
  display: flex;
  flex-direction: column;
  .head {
    height: 100px;
    box-sizing: border-box;
    padding-top: 30px;
    .fl {
      color: #f15559;
      .logoText {
        font-family: 'Segoe Script Bold', 'Segoe Script Normal', 'Segoe Script';
        font-weight: 700;
        font-style: normal;
        font-size: 38px;
        padding-right: 20px;
        border-right: 1px solid #aaa;
        cursor: pointer;
      }
      .logoName {
        padding-left: 10px;
        position: relative;
        top: -5px;
      }
    }
  }
  .middle {
    height: 100px;
    background: #4a99ed;
    .fr {
      padding-top: 30px;
      .el-input__inner {
        width: 300px;
        border-radius: 20px;
      }
      .el-input__icon {
        color: #4a99ed;
        font-size: 20px;
      }
    }
    .fl {
      padding-top: 40px;
      .el-breadcrumb {
        font-size: 16px;
        .el-breadcrumb__inner, .el-breadcrumb__separator {
          color: #fff;
        }
      }
    }
  }
  .main {
    flex: 1;
    box-sizing: border-box;
    padding: 40px 0;
    .nav {
      width: 200px;
      margin-right: 30px;
      .el-submenu__title {
        padding-left: 0!important;
        font-size: 16px;
        font-weight: 700;
        &:hover {
          background: transparent;
        }
        .line {
          display: inline-block;
          margin-right: 15px;
          width: 3px;
          height: 24px;
          background: #22dddd;
        }
      }
      .el-menu {
        border: 0 none;
        .el-submenu {
          .el-menu-item {
            height: 40px;
            line-height: 40px;
            margin-bottom: 3px;
            background: #f4f4f4;
            border-radius: 2px;
            padding: 0 10px;
            &.is-active {
              background: #4999ed;
              color: #fff;
            }
          }
        }
      }
    }
  }
  .content {
    min-height: 100%;
    width: 980px;
  }
}
</style>
