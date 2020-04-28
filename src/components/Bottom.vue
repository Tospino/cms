<template>
  <div class="Bottom">
    <div class="bottomWidth clearfix">
      <div class="bottom-left fl">
        <span class="bottom-logo">TOSPINO</span>
        <span class="bottom-url">
          <span class="text">广阔市场</span><br>www.tospino.com
        </span>
      </div>
      <div class="bottom-right fr">
        <div class="meritList">
          <div v-for="(item, i) in meritList" :key="i" class="meritItem">
            <div class="meritIcon">
              <el-button type="info" circle>{{item.merit}}</el-button>
            </div>
            <div class="meritDesc">
              <div class="meritName">{{item.name}}</div>
              <div>{{item.decs}}</div>
            </div>
          </div>
        </div>
        <div class="other clearfix">
          <div class="item">
            <span>关于我们</span>
          </div>
          <div class="item">
            <span>新手指南</span><br>
            <span class="tip cursorPointer" @click="$router.push({name: 'help'})">商家帮助中心</span>
          </div>
          <div class="item">
            <span>交易安全</span><br>
            <span class="tip cursorPointer" @click="$router.push({name: 'rules'})">卜鸣集购规则</span>
          </div>
          <div class="item">
            <span>联系我们</span><br>
            <span class="tip">0755-29890666</span>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import Footer from '@/components/Footer.vue'

const meritList = [
  { merit: '多', name: '海量货源', decs: '汇集全球好货' },
  { merit: '优', name: '优质选品', decs: '甄选性价好货' },
  { merit: '好', name: '品质保障', decs: '严格的质量把关流程' },
  { merit: '快', name: '极速物流', decs: '极致的Tospino物流体验' }
]
export default {
  components: { Footer },
  data () {
    return {
      meritList
    }
  }
}
</script>
<style lang="less">
.Bottom {
  background: #333;
  color: #fff;
  .el-button {
    cursor: default;
  }
  .bottomWidth {
    width: 1300px;
    margin: 0 auto;
  }
  .bottom-left {
    margin-top: 60px;
    .bottom-logo {
      display: inline-block;
      padding: 10px;
      border-right: 2px solid #fff;
      font-size: 28px;
      font-weight: 700;
    }
    .bottom-url {
      display: inline-block;
      padding: 10px;
      .text {
        font-size: 20px;
        line-height: 40px;
      }
    }
  }
  .bottom-right {
    padding: 10px 0;
    .meritList {
      border-bottom: 1px solid #eee;
      .meritItem {
        display: inline-block;
        padding: 20px 30px;
        .meritIcon {
          display: inline-block;
          margin-right: 10px;
          .el-button {
            font-size: 30px;
          }
        }
        .meritName {
          font-size: 18px;
          margin-bottom: 10px;
        }
        .meritDesc {
          display: inline-block;
          font-size: 14px;
          position: relative;
          top: 10px;
        }
      }
    }
    .other {
      padding: 20px 0 20px 100px;
      .item {
        float: left;
        width: 200px;
        .tip {
          display: inline-block;
          font-size: 12px;
          padding-top: 10px;
        }
      }
    }
  }
}
</style>
