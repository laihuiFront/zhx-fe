<template>
  <div id="case-detail">
    <el-collapse v-model="activeNames">
      <el-collapse-item title="个案序列号:20171218-0157" name="1">
        <div class="items-wrap">
          <el-form
            :model="caseDetail.detail"
            ref="ruleForm"
            label-width="100px"
            class="rule-form"
          >
            <el-form-item label="姓名">
              <el-input v-model="caseDetail.detail.name"></el-input>
            </el-form-item>
            <el-form-item label="委托方">
              <el-input v-model="caseDetail.detail.wtf"></el-input>
            </el-form-item>
            <el-form-item label="批次号">
              <el-input v-model="caseDetail.detail.pch"></el-input>
            </el-form-item>
            <el-form-item label="委案日期">
              <el-date-picker v-model="caseDetail.detail.warq" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
            <el-form-item label="证件号">
              <el-input v-model="caseDetail.detail.zjh"></el-input>
            </el-form-item>
            <el-form-item label="卡号">
              <el-input v-model="caseDetail.detail.kh"></el-input>
            </el-form-item>
            <el-form-item label="催收状态">
              <el-input v-model="caseDetail.detail.cszt"></el-input>
            </el-form-item>
            <el-form-item label="预计退案日">
              <el-date-picker v-model="caseDetail.detail.yjtar" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
            <el-form-item label="委案金额">
              <el-input v-model="caseDetail.detail.warq"></el-input>
            </el-form-item>
            <el-form-item label="人民币">
              <el-input v-model="caseDetail.detail.rmb"></el-input>
            </el-form-item>
            <el-form-item label="港币">
              <el-input v-model="caseDetail.detail.gb"></el-input>
            </el-form-item>
            <el-form-item label="外币">
              <el-input v-model="caseDetail.detail.wb"></el-input>
            </el-form-item>
            <el-form-item label="已还款">
              <el-input v-model="caseDetail.detail.yhk"></el-input>
            </el-form-item>
            <el-form-item label="逾期账龄">
              <el-input v-model="caseDetail.detail.yqzl"></el-input>
            </el-form-item>
            <el-form-item label="逾期天数">
              <el-input v-model="caseDetail.detail.yqts"></el-input>
            </el-form-item>
            <el-form-item label="币种">
              <el-input v-model="caseDetail.detail.bz"></el-input>
            </el-form-item>
            <el-form-item label="最新欠款" class="half">
              <el-input v-model="caseDetail.detail.zxqk"></el-input>
            </el-form-item>
            <el-form-item label="地区">
              <el-input v-model="caseDetail.detail.dq"></el-input>
            </el-form-item>
            <el-form-item label="催收手别">
              <el-input v-model="caseDetail.detail.cssb"></el-input>
            </el-form-item>
            <el-form-item label="本金">
              <el-input v-model="caseDetail.detail.bj"></el-input>
            </el-form-item>
            <el-form-item label="剩余本金">
              <el-input v-model="caseDetail.detail.sybj"></el-input>
            </el-form-item>
            <el-form-item label="贷款日期">
              <el-date-picker v-model="caseDetail.detail.dkrq" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
            <el-form-item label="逾期期数">
              <el-input v-model="caseDetail.detail.yqqs"></el-input>
            </el-form-item>
            <el-form-item label="贷款利率">
              <el-input v-model="caseDetail.detail.dkll"></el-input>
            </el-form-item>
            <el-form-item label="每月还款">
              <el-input v-model="caseDetail.detail.myhk"></el-input>
            </el-form-item>
            <el-form-item label="逾期金额">
              <el-input v-model="caseDetail.detail.yqje"></el-input>
            </el-form-item>
            <el-form-item label="预期本金">
              <el-input v-model="caseDetail.detail.yqbj"></el-input>
            </el-form-item>
            <el-form-item label="逾期利息">
              <el-input v-model="caseDetail.detail.yqlx"></el-input>
            </el-form-item>
            <el-form-item label="逾期罚息">
              <el-input v-model="caseDetail.detail.yqfx"></el-input>
            </el-form-item>
            <el-form-item label="违约金">
              <el-input v-model="caseDetail.detail.wyj"></el-input>
            </el-form-item>
            <el-form-item label="滞纳金">
              <el-input v-model="caseDetail.detail.znj"></el-input>
            </el-form-item>
            <el-form-item label="手机">
              <el-input v-model="caseDetail.detail.sj"></el-input>
            </el-form-item>
            <el-form-item label="家庭号码">
              <el-input v-model="caseDetail.detail.jthm"></el-input>
            </el-form-item>
            <el-form-item label="单位号码">
              <el-input v-model="caseDetail.detail.dwhm"></el-input>
            </el-form-item>
            <el-form-item label="家庭地址" class="whole">
              <el-input v-model="caseDetail.detail.jtdz"></el-input>
            </el-form-item>
            <el-form-item label="单位名称" class="whole">
              <el-input v-model="caseDetail.detail.dwmc"></el-input>
            </el-form-item>
            <el-form-item label="单位地址" class="whole">
              <el-input v-model="caseDetail.detail.dwdz"></el-input>
            </el-form-item>
            <el-form-item label="户籍地址" class="whole">
              <el-input v-model="caseDetail.detail.hjdz"></el-input>
            </el-form-item>
            <el-form-item label="对账单地址" class="whole">
              <el-input v-model="caseDetail.detail.dzddz"></el-input>
            </el-form-item>
            <el-form-item label="PTP金额">
              <el-input v-model="caseDetail.detail.ptp"></el-input>
            </el-form-item>
            <el-form-item label="CP金额">
              <el-input v-model="caseDetail.detail.cp"></el-input>
            </el-form-item>
            <el-form-item label="委案期数">
              <el-input v-model="caseDetail.detail.waqs"></el-input>
            </el-form-item>
            <el-form-item label="最低还款额">
              <el-input v-model="caseDetail.detail.zdhke"></el-input>
            </el-form-item>
            <el-form-item label="下次跟进日期" class="half">
              <el-input v-model="caseDetail.detail.xcgjrq"></el-input>
            </el-form-item>
            <el-form-item label="委托日期">
              <el-date-picker v-model="caseDetail.detail.wtrq" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
            <el-form-item label="跟进次数">
              <el-input v-model="caseDetail.detail.gjcs"></el-input>
            </el-form-item>
            <el-form-item label="催收区域">
              <el-input v-model="caseDetail.detail.csqy"></el-input>
            </el-form-item>
            <el-form-item label="催收员">
              <el-input v-model="caseDetail.detail.csy"></el-input>
            </el-form-item>
            <el-form-item label="最近催记时间">
              <el-date-picker v-model="caseDetail.detail.zjcjsj" type="datetime" placeholder="选择日期时间"></el-date-picker>
            </el-form-item>
            <el-form-item label="最后外访">
              <el-input v-model="caseDetail.detail.zhwf"></el-input>
            </el-form-item>
            <el-form-item label="自动收回时间">
              <el-date-picker v-model="caseDetail.detail.zdshsj" type="datetime" placeholder="选择日期时间"></el-date-picker>
            </el-form-item>
            <el-form-item label="催收小结" class="width-75">
              <el-input v-model="caseDetail.detail.csxj"></el-input>
            </el-form-item>
            <el-form-item label="最新评语" class="whole">
              <div class="content-wrap">
                 <el-button size="small" type="text" icon="el-icon-plus" title="添加"></el-button>
                 <ul class="comments-wrap">
                   <li v-for="(item) in caseDetail.detail.zxpy" :key="item.id" class="item">
                     {{item.time}} {{item.user}} : {{item.text}}
                   </li>
                 </ul>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </el-collapse-item>
      <el-collapse-item title="反馈 Feedback" name="2">
        <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
        <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
      </el-collapse-item>
      <el-collapse-item title="效率 Efficiency" name="3">
        <div>简化流程：设计简洁直观的操作流程；</div>
        <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
        <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
      </el-collapse-item>
      <el-collapse-item title="可控 Controllability" name="4">
        <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
        <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  name:'caseDetail',
  data() {
    return {
      activeNames: ['1'],
      caseDetail:{
        detail:{
          name: '唐纯近',
          wtf:'中国银行',
          pch:'中国银行20171228',
          warq:'2017-12-18',
          zjh:'512921197003068671',
          kh:'5201088014573845',
          cszt:'暂停催收',
          yjtar:'2018-03-24',
          waje:25574.91,
          rmb:25574.91,
          gb:0,
          wb:0,
          yhk:0,
          yqzl:'3手',
          zxqk:25574.91,
          dq:'广东省东莞市',
          cssb:'四档',
          bj:16251.84,
          sybj:15251.84,
          yqlx:4221,
          sj:'13926850212',
          dwhm:'0769-88871817',
          jtdz:'广东省东莞市',
          dwmc:'东莞长鸿五金制品有限公司办公室',
          dwdz:'广东省东莞市',
          hjdz:'四川省南充市',
          dzddz:'广东省东莞市',
          ptp:0,
          cp:0,
          zdhke:20482.84,
          gjcs:'电话 164 信函 0 外访 0',
          csy:'张磊',
          zjcjsj:'2018-03-02 16:29',
          zxpy:[{
            id: 1,
            time:'2017-12-22 18:27',
            user:'陈重',
            text:'111111'
          },{
            id: 2,
            time:'2017-12-22 18:31',
            user:'杨英',
            text:'222222'
          }]
        }
      }
    }
  }
}
</script>

<style lang="scss">
#case-detail{
  .items-wrap{
    padding: 24px 24px 24px 0;
    background: #fafafa;
    .rule-form{
      display: flex;
      flex-wrap: wrap;
      .el-form-item {
        margin-bottom: 8px;
        display: flex;
        width: 25%;
        &.half{
          width: 50%;
        }
        &.whole{
          width: 100%;
        }
        &.width-75{
          width: 75%;
        }
        .el-form-item__content {
          flex: 1;
          margin-left: 0 !important;
          .el-date-editor{
            width: 100%;
          }
          .el-select {
            width: 100%;
          }
        }
        .content-wrap{
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;
          .comments-wrap{
            margin-left: 12px;
            flex:1;
            border: 1px solid #dcdfe6;
            background: #fff;
            border-radius: 5px;
            padding: 8px;
            .item{
              margin-bottom: 4px;
              line-height: 1;
              color: #409eff;
              &:last-child{
                margin-bottom: 0;
              }
            }
          }
        }
      }
    }
  }
}
</style>

