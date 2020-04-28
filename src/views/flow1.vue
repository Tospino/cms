<template>
  <div class="flow container contentWidth">
    <div class="step clearfix" v-for="(item, index) in steps" :key="index">
      <div class="stepAxis fl">
        <div class="stepIcon">
          <el-button circle>
            <span class="iconfont" :class="item.icon"></span>
          </el-button>
          <span class="iconfont icon-sanjiaoright"></span>
        </div>
        <div class="axisLine"></div>
        <div class="axisEnd"></div>
      </div>
      <div class="flowGroup fl">
        <div class="flowTitle">
          {{item.title}}
        </div>
        <div class="flows">
          <flowItem v-for="(item, i) in item.flows" :key="i">
            <template v-slot:title>
              <div class="itemTitle">0{{i + 1}}</div>
            </template>
            <template v-slot:summary>
              <div>{{item.summary}}</div>
            </template>
            <template v-slot:detail>
              <div>{{item.detail}}</div>
            </template>
          </flowItem>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import flowItem from '@/components/flowItem'
export default {
  components: { flowItem },
  created () {
  },
  data () {
    return {
      steps: [
        { icon: 'icon-jiahaozhankai',
          title: '入住前准备',
          flows: [
            { summary: '了解招商信息', detail: `1）品牌：京东枚举的重点招募品牌、您也可以推荐优质品牌给京东，部分类目不限定品牌招商。

              2）企业：合法登记的公司，工体工商户或个人（限拼购、优创店铺），并且能够提供京东入驻要求的所有相关文件。

              3）资质要求详见：《京东开放平台招商基础资质标准》及各类目资质标准。`
            },
            { summary: '准备资质材料', detail: `1）点击查询入驻所需资质和费用。

              2）准备的资料请加盖开店公司公章（鲜章）。

              3）如申请材料缺少，会退回给您重新提交，建议您事先准备齐全资料，一次性通过审核。`
            },
            { summary: '开通钱包', detail: `1）提前开通京东钱包可在入驻审核后的开店任务中直接使用，注册京东钱包及钱包实名认证预计需2个工作日，建议您提前准备。开通京东钱包不影响您店铺入驻资质的提交及审核。

              2）点击查看京东钱包注册入口。

              3）点击查看开通京东钱包操作指南。`
            }
          ]
        },
        { icon: 'icon-jianhaoshouqi',
          title: 'haodebababa',
          flows: [
            { summary: '了解招商信息', detail: `1）品牌：京东枚举的重点招募品牌、您也可以推荐优质品牌给京东，部分类目不限定品牌招商。

              2）企业：合法登记的公司，工体工商户或个人（限拼购、优创店铺），并且能够提供京东入驻要求的所有相关文件。

              3）资质要求详见：《京东开放平台招商基础资质标准》及各类目资质标准。`
            },
            { summary: '准备资质材料', detail: `1）点击查询入驻所需资质和费用。

              2）准备的资料请加盖开店公司公章（鲜章）。

              3）如申请材料缺少，会退回给您重新提交，建议您事先准备齐全资料，一次性通过审核。`
            },
            { summary: '开通钱包', detail: `1）提前开通京东钱包可在入驻审核后的开店任务中直接使用，注册京东钱包及钱包实名认证预计需2个工作日，建议您提前准备。开通京东钱包不影响您店铺入驻资质的提交及审核。

              2）点击查看京东钱包注册入口。

              3）点击查看开通京东钱包操作指南。`
            }
          ]
        }
      ],
      list: [
        { summary: '了解招商信息', detail: `1）品牌：京东枚举的重点招募品牌、您也可以推荐优质品牌给京东，部分类目不限定品牌招商。

          2）企业：合法登记的公司，工体工商户或个人（限拼购、优创店铺），并且能够提供京东入驻要求的所有相关文件。

          3）资质要求详见：《京东开放平台招商基础资质标准》及各类目资质标准。`
        },
        { summary: '准备资质材料', detail: `1）点击查询入驻所需资质和费用。

          2）准备的资料请加盖开店公司公章（鲜章）。

          3）如申请材料缺少，会退回给您重新提交，建议您事先准备齐全资料，一次性通过审核。`
        },
        { summary: '开通钱包', detail: `1）提前开通京东钱包可在入驻审核后的开店任务中直接使用，注册京东钱包及钱包实名认证预计需2个工作日，建议您提前准备。开通京东钱包不影响您店铺入驻资质的提交及审核。

          2）点击查看京东钱包注册入口。

          3）点击查看开通京东钱包操作指南。`
        }
      ]
    }
  },
  methods: {
  }
}
</script>
<style lang="less">
@bgc: #dd2222;
.flow {
  padding: 40px;
  .step {
    .stepAxis {
      width: 90px;
      .stepIcon {
        .el-button {
          width: 46px;
          height: 46px;
          padding: 0;
          background: #dd2222;
          color: #fff;
          border: 0 none;
          cursor: default;
        }
        .iconfont {
          font-size: 22px;
          &.icon-sanjiaoright {
            color: #dd2222;
          }
        }
      }
      .axisLine {
        height: 400px;
        width: 2px;
        background: #dd2222;;
        position: relative;
        left: 23px;
      }
    }
    &:last-child .axisEnd {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: #dd2222;
      position: relative;
      left: 13px;
    }
  }
  .flowGroup {
    .flowTitle {
      line-height: 40px;
      font-size: 22px;
      margin-bottom: 40px;
    }
    .flows {
      .flowItem {
        margin-right: 40px;
        .itemTitle {
          font-size: 36px;
          padding: 10px 20px;
          background: #fff;
        }
      }
    }
  }
}
</style>
