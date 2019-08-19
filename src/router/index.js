import Vue from 'vue'
import Router from 'vue-router'
import spinRoute from '@/components/loading'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/zhx/home-page'
    },
    {
      path: '/zhx',
      name: 'zhx',
      component: () => import('@/views/layout/layout'),
      children: [
        // 首页
        {
          path: 'home-page',
          component: () => import('@/views/home-page/home-page'),
          name: 'home-page'
        },

        // ****************** 数据管理 ******************
        // 案件导入
        {
          path: 'data-case-import',
          component: resolve => {
            spinRoute.show();
            require(['@/views/data-manage/data-case-imported'], spinRoute.resolve(resolve))
          },
          name: 'data-case-import'
        },

        // 批次管理
        {
          path: 'data-batch-manage',
          component: resolve => {
            spinRoute.show();
            require(['@/views/data-manage/data-batch-manage'], spinRoute.resolve(resolve))
          },
          name: 'data-batch-manage'
        },

        // 案件管理
        {
          path: 'data-case-manage',
          component: resolve => {
            spinRoute.show();
            require(['@/views/data-manage/data-case-manage'], spinRoute.resolve(resolve))
          },
          name: 'data-case-manage'
        },

        // 调案记录
        {
          path: 'case-ajust',
          component: resolve => {
            spinRoute.show();
            require(['@/views/data-manage/case-ajust'], spinRoute.resolve(resolve))
          },
          name: 'case-ajust'
        },
        // 催记管理
        {
          path: 'data-memorize-manage',
          component: resolve => {
            spinRoute.show();
            require(['@/views/data-manage/data-memorize-manage'], spinRoute.resolve(resolve))
          },
          name: 'data-memorize-manage'
        },

        // 案人档案管理
        {
          path: 'data-file-manage',
          component: resolve => {
            spinRoute.show();
            require(['@/views/data-manage/data-file-manage'], spinRoute.resolve(resolve))
          },
          name: 'data-file-manage'
        },
        // ****************** 数据管理 ******************

        // ****************** 催收管理 ******************
        // 我的案件-我的案件
        {
          path: 'collect-my-case',
          component: resolve => {
            spinRoute.show();
            require(['@/views/collect-manage/collect-my-case'], spinRoute.resolve(resolve))
          },
          name: 'collect-my-case'
        },

        // 我的案件-催收状况统计
        {
          path: 'collect-status-statistics',
          component: resolve => {
            spinRoute.show();
            require(['@/views/collect-manage/collect-status-statistics'], spinRoute.resolve(resolve))
          },
          name: 'collect-status-statistics'
        },

        // 我的案件-我的还款统计
        {
          path: 'collect-repayment-statistics',
          component: resolve => {
            spinRoute.show();
            require(['@/views/collect-manage/collect-repayment-statistics'], spinRoute.resolve(resolve))
          },
          name: 'collect-repayment-statistics'
        },

        // 部门案件
        {
          path: 'collect-departmental-case',
          component: resolve => {
            spinRoute.show();
            require(['@/views/collect-manage/collect-departmental-case'], spinRoute.resolve(resolve))
          },
          name: 'collect-departmental-case'
        },

        // 来电查询
        {
          path: 'collect-call-inquiry',
          component: resolve => {
            spinRoute.show();
            require(['@/views/collect-manage/collect-call-inquiry'], spinRoute.resolve(resolve))
          },
          name: 'collect-call-inquiry'
        },
        //催收员提成
        {
          path: 'collect-director-odv',
          component: resolve => {
            spinRoute.show();
            require(['@/views/collect-manage/collect-director-odv'], spinRoute.resolve(resolve))
          },
          name: 'collect-director-odv'
        },
        //经理提成
        {
          path: 'collect-director-manage',
          component: resolve => {
            spinRoute.show();
            require(['@/views/collect-manage/collect-director-manage'], spinRoute.resolve(resolve))
          },
          name: 'collect-director-manage'
        },
        // 总监提成
        {
          path: 'collect-director-commission',
          component: resolve => {
            spinRoute.show();
            require(['@/views/collect-manage/collect-director-commission'], spinRoute.resolve(resolve))
          },
          name: 'collect-director-commission'
        },
        // ****************** 催收管理 ******************

        // ****************** 协催管理 ******************
        // 待处理信函
        {
          path: 'synergistic-letter-application',
          component: resolve => {
            spinRoute.show();
            require(['@/views/synergistic-manage/synergistic-letter-application'], spinRoute.resolve(resolve))
          },
          name: 'synergistic-letter-application'
        },

        // 信函记录
        {
          path: 'synergistic-letter-record',
          component: resolve => {
            spinRoute.show();
            require(['@/views/synergistic-manage/synergistic-letter-record'], spinRoute.resolve(resolve))
          },
          name: 'synergistic-letter-record'
        },

        // 待处理协催
        {
          path: 'synergistic-application',
          component: resolve => {
            spinRoute.show();
            require(['@/views/synergistic-manage/synergistic-application'], spinRoute.resolve(resolve))
          },
          name: 'synergistic-application'
        },

        // 协催记录
        {
          path: 'synergistic-record',
          component: resolve => {
            spinRoute.show();
            require(['@/views/synergistic-manage/synergistic-record'], spinRoute.resolve(resolve))
          },
          name: 'synergistic-record'
        },

        // 待银行对账
        {
          path: 'synergistic-bank-reconciliation',
          component: resolve => {
            spinRoute.show();
            require(['@/views/synergistic-manage/synergistic-bank-reconciliation'], spinRoute.resolve(resolve))
          },
          name: 'synergistic-bank-reconciliation'
        },

        // 还款记录
        {
          path: 'synergistic-repayment-record',
          component: resolve => {
            spinRoute.show();
            require(['@/views/synergistic-manage/synergistic-repayment-record'], spinRoute.resolve(resolve))
          },
          name: 'synergistic-repayment-record'
        },
        // ****************** 协催管理 ******************

        // ****************** 诉讼管理 ******************
        // 诉讼申请
        {
          path: 'litigation-apply',
          component: resolve => {
            spinRoute.show();
            require(['@/views/litigation-manage/litigation-apply'], spinRoute.resolve(resolve))
          },
          name: 'litigation-apply'
        },

        // 诉讼案件-我的诉讼案件
        {
          path: 'litigation-my',
          component: resolve => {
            spinRoute.show();
            require(['@/views/litigation-manage/litigation-my'], spinRoute.resolve(resolve))
          },
          name: 'litigation-my'
        },

        // 诉讼案件-全部诉讼案件
        {
          path: 'litigation-all',
          component: resolve => {
            spinRoute.show();
            require(['@/views/litigation-manage/litigation-all'], spinRoute.resolve(resolve))
          },
          name: 'litigation-all'
        },
        // ****************** 诉讼管理 ******************


        // ****************** 减免管理 ******************
        // 减免结果管理
        {
          path: 'relief-management',
          component: resolve => {
            spinRoute.show();
            require(['@/views/relief-manage/relief-management'], spinRoute.resolve(resolve))
          },
          name: 'relief-management'
        },
        // ****************** 减免管理 ******************

        // ****************** 统计报表 ******************
        // 电催统计-单日统计
        {
          path: 'statistics-day',
          component: resolve => {
            spinRoute.show();
            require(['@/views/statistics-manage/statistics-day'], spinRoute.resolve(resolve))
          },
          name: 'statistics-day'
        },

        // 电催统计-月度统计
        {
          path: 'statistics-month',
          component: resolve => {
            spinRoute.show();
            require(['@/views/statistics-manage/statistics-month'], spinRoute.resolve(resolve))
          },
          name: 'statistics-month'
        },

        // 电催统计-每日动作统计
        {
          path: 'statistics-day-action',
          component: resolve => {
            spinRoute.show();
            require(['@/views/statistics-manage/statistics-day-action'], spinRoute.resolve(resolve))
          },
          name: 'statistics-day-action'
        },
        // ****************** 统计报表 ******************

        // ****************** 系统设置 ******************
        // 部门设置
        {
          path: 'setting-department',
          component: resolve => {
            spinRoute.show();
            require(['@/views/settings/setting-department'], spinRoute.resolve(resolve))
          },
          name: 'setting-department'
        },

        // 角色设置
        {
          path: 'setting-role',
          component: resolve => {
            spinRoute.show();
            require(['@/views/settings/setting-role'], spinRoute.resolve(resolve))
          },
          name: 'setting-role'
        },

        // 员工管理-在职员工管理
        {
          path: 'member-in',
          component: resolve => {
            spinRoute.show();
            require(['@/views/member-manage/member-in'], spinRoute.resolve(resolve))
          },
          name: 'member-in'
        },

        // 员工管理-离职员工管理
        {
          path: 'member-off',
          component: resolve => {
            spinRoute.show();
            require(['@/views/member-manage/member-off'], spinRoute.resolve(resolve))
          },
          name: 'member-off'
        },

        // 提成设置
        {
          path: 'setting-reward',
          component: resolve => {
            spinRoute.show();
            require(['@/views/settings/setting-reward'], spinRoute.resolve(resolve))
          },
          name: 'setting-reward'
        },

        // 操作日志查询
        {
          path: 'setting-log',
          component: resolve => {
            spinRoute.show();
            require(['@/views/settings/setting-log'], spinRoute.resolve(resolve))
          },
          name: 'setting-log'
        },

        // 呼叫中心设置
        {
          path: 'setting-tel',
          component: resolve => {
            spinRoute.show();
            require(['@/views/settings/setting-tel'], spinRoute.resolve(resolve))
          },
          name: 'setting-tel'
        },

        // 枚举设置
        {
          path: 'setting-enum',
          component: resolve => {
            spinRoute.show();
            require(['@/views/settings/setting-enum'], spinRoute.resolve(resolve))
          },
          name: 'setting-enum'
        },

        // 模板设置
        {
          path: 'setting-template',
          component: resolve => {
            spinRoute.show();
            require(['@/views/settings/setting-template'], spinRoute.resolve(resolve))
          },
          name: 'setting-template'
        },
        // 提醒管理
        {
          path: 'setting-remind',
          component: resolve => {
            spinRoute.show();
            require(['@/views/settings/setting-remind'], spinRoute.resolve(resolve))
          },
          name: 'setting-remind'
        },
        // 退案管理
        {
          path: 'setting-return',
          component: resolve => {
            spinRoute.show();
            require(['@/views/settings/setting-return'], spinRoute.resolve(resolve))
          },
          name: 'setting-return'
        },
        // 身份证权限管理
        {
          path: 'setting-copy',
          component: resolve => {
            spinRoute.show();
            require(['@/views/settings/setting-copy'], spinRoute.resolve(resolve))
          },
          name: 'setting-copy'
        },
        // ****************** 系统设置 ******************

        {
          path: 'collect-co-application',
          component: resolve => {
            spinRoute.show();
            require(['@/views/collect-manage/collect-co-application'], spinRoute.resolve(resolve))
          },
          name: 'collect-co-application'
        },

        {
          path: 'collect-to-be-reminded',
          component: resolve => {
            spinRoute.show();
            require(['@/views/collect-manage/collect-to-be-reminded'], spinRoute.resolve(resolve))
          },
          name: 'collect-to-be-reminded'
        },

        {
          path: 'collect-finished',
          component: resolve => {
            spinRoute.show();
            require(['@/views/collect-manage/collect-finished'], spinRoute.resolve(resolve))
          },
          name: 'collect-finished'
        },

        {
          path: 'synergistic-to-be-sent',
          component: resolve => {
            spinRoute.show();
            require(['@/views/synergistic-manage/synergistic-to-be-sent'], spinRoute.resolve(resolve))
          },
          name: 'synergistic-to-be-sent'
        },

        {
          path: 'synergistic-to-be-precessed',
          component: resolve => {
            spinRoute.show();
            require(['@/views/synergistic-manage/synergistic-to-be-precessed'], spinRoute.resolve(resolve))
          },
          name: 'synergistic-to-be-precessed'
        },

        {
          path: 'synergistic-canceld',
          component: resolve => {
            spinRoute.show();
            require(['@/views/synergistic-manage/synergistic-canceld'], spinRoute.resolve(resolve))
          },
          name: 'synergistic-canceld'
        },

        {
          path: 'case-detail',
          component: resolve => {
            spinRoute.show();
            require(['@/views/data-manage/detail'], spinRoute.resolve(resolve))
          },
          name: 'case-detail'
        },
      ]
    },
    {
      path: '/login',
      component: () => import('@/views/login/login')
    }
  ]
})
