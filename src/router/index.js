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
        {
          path: 'home-page',
          component: () => import('@/views/home-page/home-page'),
          name: 'home-page'
        },{
          path: 'data-case-import',
          component: resolve => {
            spinRoute.show();
            require(['@/views/data-manage/data-case-imported'], spinRoute.resolve(resolve))
          },
          name: 'data-case-import'
        },{
          path: 'data-batch-manage',
          component: resolve => {
            spinRoute.show();
            require(['@/views/data-manage/data-batch-manage'], spinRoute.resolve(resolve))
          },
          name: 'data-batch-manage'
        },{
          path: 'data-case-manage',
          component: resolve => {
            spinRoute.show();
            require(['@/views/data-manage/data-case-manage'], spinRoute.resolve(resolve))
          },
          name: 'data-case-manage'
        },{
          path: 'data-memorize-manage',
          component: resolve => {
            spinRoute.show();
            require(['@/views/data-manage/data-memorize-manage'], spinRoute.resolve(resolve))
          },
          name: 'data-memorize-manage'
        },{
          path: 'data-file-manage',
          component: resolve => {
            spinRoute.show();
            require(['@/views/data-manage/data-file-manage'], spinRoute.resolve(resolve))
          },
          name: 'data-file-manage'
        },{
          path: 'collect-my-case',
          component: resolve => {
            spinRoute.show();
            require(['@/views/collect-manage/collect-my-case'], spinRoute.resolve(resolve))
          },
          name: 'collect-my-case'
        },{
          path: 'collect-status-statistics',
          component: resolve => {
            spinRoute.show();
            require(['@/views/collect-manage/collect-status-statistics'], spinRoute.resolve(resolve))
          },
          name: 'collect-status-statistics'
        },{
          path: 'collect-repayment-statistics',
          component: resolve => {
            spinRoute.show();
            require(['@/views/collect-manage/collect-repayment-statistics'], spinRoute.resolve(resolve))
          },
          name: 'collect-repayment-statistics'
        },{
          path: 'collect-departmental-case',
          component: resolve => {
            spinRoute.show();
            require(['@/views/collect-manage/collect-departmental-case'], spinRoute.resolve(resolve))
          },
          name: 'collect-departmental-case'
        },{
          path: 'collect-call-inquiry',
          component: resolve => {
            spinRoute.show();
            require(['@/views/collect-manage/collect-call-inquiry'], spinRoute.resolve(resolve))
          },
          name: 'collect-call-inquiry'
        },{
          path: 'collect-co-application',
          component: resolve => {
            spinRoute.show();
            require(['@/views/collect-manage/collect-co-application'], spinRoute.resolve(resolve))
          },
          name: 'collect-co-application'
        },{
          path: 'collect-to-be-reminded',
          component: resolve => {
            spinRoute.show();
            require(['@/views/collect-manage/collect-to-be-reminded'], spinRoute.resolve(resolve))
          },
          name: 'collect-to-be-reminded'
        },{
          path: 'collect-finished',
          component: resolve => {
            spinRoute.show();
            require(['@/views/collect-manage/collect-finished'], spinRoute.resolve(resolve))
          },
          name: 'collect-finished'
        },{
          path: 'synergistic-letter-application',
          component: resolve => {
            spinRoute.show();
            require(['@/views/synergistic-manage/synergistic-letter-application'], spinRoute.resolve(resolve))
          },
          name: 'synergistic-letter-application'
        },{
          path: 'synergistic-to-be-sent',
          component: resolve => {
            spinRoute.show();
            require(['@/views/synergistic-manage/synergistic-to-be-sent'], spinRoute.resolve(resolve))
          },
          name: 'synergistic-to-be-sent'
        },{
          path: 'synergistic-letter-record',
          component: resolve => {
            spinRoute.show();
            require(['@/views/synergistic-manage/synergistic-letter-record'], spinRoute.resolve(resolve))
          },
          name: 'synergistic-letter-record'
        },{
          path: 'synergistic-application',
          component: resolve => {
            spinRoute.show();
            require(['@/views/synergistic-manage/synergistic-application'], spinRoute.resolve(resolve))
          },
          name: 'synergistic-application'
        },{
          path: 'synergistic-to-be-precessed',
          component: resolve => {
            spinRoute.show();
            require(['@/views/synergistic-manage/synergistic-to-be-precessed'], spinRoute.resolve(resolve))
          },
          name: 'synergistic-to-be-precessed'
        },{
          path: 'synergistic-record',
          component: resolve => {
            spinRoute.show();
            require(['@/views/synergistic-manage/synergistic-record'], spinRoute.resolve(resolve))
          },
          name: 'synergistic-record'
        },{
          path: 'synergistic-bank-reconciliation',
          component: resolve => {
            spinRoute.show();
            require(['@/views/synergistic-manage/synergistic-bank-reconciliation'], spinRoute.resolve(resolve))
          },
          name: 'synergistic-bank-reconciliation'
        },{
          path: 'synergistic-canceld',
          component: resolve => {
            spinRoute.show();
            require(['@/views/synergistic-manage/synergistic-canceld'], spinRoute.resolve(resolve))
          },
          name: 'synergistic-canceld'
        },{
          path: 'synergistic-repayment-record',
          component: resolve => {
            spinRoute.show();
            require(['@/views/synergistic-manage/synergistic-repayment-record'], spinRoute.resolve(resolve))
          },
          name: 'synergistic-repayment-record'
        },{
          path: 'synergistic-revoked',
          component: resolve => {
            spinRoute.show();
            require(['@/views/synergistic-manage/synergistic-revoked'], spinRoute.resolve(resolve))
          },
          name: 'synergistic-revoked'
        },{
          path: 'litigation-apply',
          component: resolve => {
            spinRoute.show();
            require(['@/views/litigation-manage/litigation-apply'], spinRoute.resolve(resolve))
          },
          name: 'litigation-apply'
        },{
          path: 'litigation-my',
          component: resolve => {
            spinRoute.show();
            require(['@/views/litigation-manage/litigation-my'], spinRoute.resolve(resolve))
          },
          name: 'litigation-my'
        },{
          path: 'litigation-all',
          component: resolve => {
            spinRoute.show();
            require(['@/views/litigation-manage/litigation-all'], spinRoute.resolve(resolve))
          },
          name: 'litigation-all'
        },{
          path: 'relief-management',
          component: resolve => {
            spinRoute.show();
            require(['@/views/relief-manage/relief-management'], spinRoute.resolve(resolve))
          },
          name: 'relief-management'
        },{
          path: 'statistics-day',
          component: resolve => {
            spinRoute.show();
            require(['@/views/statistics-manage/statistics-day'], spinRoute.resolve(resolve))
          },
          name: 'statistics-day'
        },{
          path: 'statistics-month',
          component: resolve => {
            spinRoute.show();
            require(['@/views/statistics-manage/statistics-month'], spinRoute.resolve(resolve))
          },
          name: 'statistics-month'
        },{
          path: 'statistics-day-action',
          component: resolve => {
            spinRoute.show();
            require(['@/views/statistics-manage/statistics-day-action'], spinRoute.resolve(resolve))
          },
          name: 'statistics-day-action'
        },{
          path: 'member-in',
          component: resolve => {
            spinRoute.show();
            require(['@/views/member-manage/member-in'], spinRoute.resolve(resolve))
          },
          name: 'member-in'
        },{
          path: 'member-off',
          component: resolve => {
            spinRoute.show();
            require(['@/views/member-manage/member-off'], spinRoute.resolve(resolve))
          },
          name: 'member-off'
        },{
          path: 'setting-enum',
          component: resolve => {
            spinRoute.show();
            require(['@/views/settings/setting-enum'], spinRoute.resolve(resolve))
          },
          name: 'setting-enum'
        },{
          path: 'setting-template',
          component: resolve => {
            spinRoute.show();
            require(['@/views/settings/setting-template'], spinRoute.resolve(resolve))
          },
          name: 'setting-template'
        },{
          path: 'setting-log',
          component: resolve => {
            spinRoute.show();
            require(['@/views/settings/setting-log'], spinRoute.resolve(resolve))
          },
          name: 'setting-log'
        },{
          path: 'setting-department',
          component: resolve => {
            spinRoute.show();
            require(['@/views/settings/setting-department'], spinRoute.resolve(resolve))
          },
          name: 'setting-department'
        },{
          path: 'setting-role',
          component: resolve => {
            spinRoute.show();
            require(['@/views/settings/setting-role'], spinRoute.resolve(resolve))
          },
          name: 'setting-role'
        },{
          path: 'case-detail',
          component: resolve => {
            spinRoute.show();
            require(['@/views/data-manage/detail'], spinRoute.resolve(resolve))
          },
          name: 'case-detail'
        },{
          path: 'setting-reward',
          component: resolve => {
            spinRoute.show();
            require(['@/views/settings/setting-reward'], spinRoute.resolve(resolve))
          },
          name: 'setting-reward'
        },{
          path: 'setting-tel',
          component: resolve => {
            spinRoute.show();
            require(['@/views/settings/setting-tel'], spinRoute.resolve(resolve))
          },
          name: 'setting-tel'
        }
      ]
    },
    {
      path: '/login',
      component: () => import('@/views/login/login')
    }
  ]
})
