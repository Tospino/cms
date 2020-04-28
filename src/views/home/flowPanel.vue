<template>
  <div class="flowPanel">
    <div class="title">入驻步骤</div>
    <div>
      <flowItem :w="styleObj.w"  :h="styleObj.h">
        <template v-slot:title>
          <div class="itemTitle">
            <img src="@/assets/img/flow/u36.png" alt="">
          </div>
        </template>
        <template v-slot:summary>
          <div>了解标准</div>
        </template>
        <template v-slot:detail>
          <div class="textItem">1)了解招商标准</div>
          <div class="textItem">2)了解资费标准</div>
        </template>
      </flowItem>
      <flowItem :w="styleObj.w"  :h="styleObj.h">
        <template v-slot:title>
          <div class="itemTitle">
            <img src="@/assets/img/flow/u57.png" alt="">
          </div>
        </template>
        <template v-slot:summary>
          <div>签订商家入驻协议</div>
        </template>
        <template v-slot:detail>
          <div class="textItem">1)选择经营类目</div>
          <div class="textItem">2)签订入驻协议</div>
          <div class="textItem">3)缴纳平台技术服务费和保证金</div>
        </template>
      </flowItem>
      <flowItem :w="styleObj.w"  :h="styleObj.h">
        <template v-slot:title>
          <div class="itemTitle">
            <img src="@/assets/img/flow/u46.png" alt="">
          </div>
        </template>
        <template v-slot:summary>
          <div>开通商家系统账号</div>
        </template>
        <template v-slot:detail>
          <div class="textItem">1)提交公司/个人信息，提交资质</div>
          <div class="textItem">2)提供收款账户</div>
        </template>
      </flowItem>
      <flowItem :w="styleObj.w"  :h="styleObj.h">
        <template v-slot:title>
          <div class="itemTitle">
            <img src="@/assets/img/flow/u47.png" alt="">
          </div>
        </template>
        <template v-slot:summary>
          <div>等待审核</div>
        </template>
        <template v-slot:detail>
          <div class="textItem">1)客服在3个工作日内给到审核结果</div>
          <div class="textItem">2)审核通过后客服将相应的账号信息给到入驻商家</div>
        </template>
      </flowItem>
    </div>
    <div class="more" @click="$router.push({name: 'flow'})">
      查看详细入驻流程 >
    </div>
  </div>
</template>
<script>
import flowItem from '@/components/flowItem'
export default {
  components: { flowItem },
  data () {
    return {
      styleObj: {
        w: 180,
        h: 220
      }
    }
  }
}
</script>
<style lang="less">
.flowPanel {
  float: right;
  height: 340px;
  position: relative;
  .title {
    height: 30px;
    line-height: 30px;
    margin-bottom: 25px;
  }
  .itemTitle {
    width: 70px;
    text-align: center;
    img {
      width: 56px;
    }
  }
  .textItem {
    margin-bottom: 5px;
  }
  .more {
    cursor: pointer;
    position: absolute;
    right: 0;
    bottom: 15px;
    padding: 5px 10px;
    font-size: 12px;
    border: 1px solid #dd2222;
    color: #dd2222;
  }
}
</style>
