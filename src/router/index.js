import Vue from 'vue'
import Router from 'vue-router'
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
          component: () => import('@/views/data-manage/data-case-imported'),
          name: 'data-case-import'
        },{
          path: 'data-batch-manage',
          component: () => import('@/views/data-manage/data-batch-manage'),
          name: 'data-batch-manage'
        },{
          path: 'data-case-manage',
          component: () => import('@/views/data-manage/data-case-manage'),
          name: 'data-case-manage'
        },{
          path: 'data-memorize-manage',
          component: () => import('@/views/data-manage/data-memorize-manage'),
          name: 'data-memorize-manage'
        },{
          path: 'data-file-manage',
          component: () => import('@/views/data-manage/data-file-manage'),
          name: 'data-file-manage'
        },{
          path: 'collect-my-case',
          component: () => import('@/views/collect-manage/collect-my-case'),
          name: 'collect-my-case'
        },{
          path: 'collect-status-statistics',
          component: () => import('@/views/collect-manage/collect-status-statistics'),
          name: 'collect-status-statistics'
        },{
          path: 'collect-repayment-statistics',
          component: () => import('@/views/collect-manage/collect-repayment-statistics'),
          name: 'collect-repayment-statistics'
        },{
          path: 'collect-departmental-case',
          component: () => import('@/views/collect-manage/collect-departmental-case'),
          name: 'collect-departmental-case'
        },{
          path: 'collect-call-inquiry',
          component: () => import('@/views/collect-manage/collect-call-inquiry'),
          name: 'collect-call-inquiry'
        },{
          path: 'collect-co-application',
          component: () => import('@/views/collect-manage/collect-co-application'),
          name: 'collect-co-application'
        },{
          path: 'collect-to-be-reminded',
          component: () => import('@/views/collect-manage/collect-to-be-reminded'),
          name: 'collect-to-be-reminded'
        },{
          path: 'collect-finished',
          component: () => import('@/views/collect-manage/collect-finished'),
          name: 'collect-finished'
        },{
          path: 'synergistic-letter-application',
          component: () => import('@/views/synergistic-manage/synergistic-letter-application'),
          name: 'synergistic-letter-application'
        },{
          path: 'synergistic-to-be-sent',
          component: () => import('@/views/synergistic-manage/synergistic-to-be-sent'),
          name: 'synergistic-to-be-sent'
        },{
          path: 'synergistic-letter-record',
          component: () => import('@/views/synergistic-manage/synergistic-letter-record'),
          name: 'synergistic-letter-record'
        },{
          path: 'synergistic-application',
          component: () => import('@/views/synergistic-manage/synergistic-application'),
          name: 'synergistic-application'
        },{
          path: 'synergistic-to-be-precessed',
          component: () => import('@/views/synergistic-manage/synergistic-to-be-precessed'),
          name: 'synergistic-to-be-precessed'
        },{
          path: 'synergistic-record',
          component: () => import('@/views/synergistic-manage/synergistic-record'),
          name: 'synergistic-record'
        },{
          path: 'synergistic-bank-reconciliation',
          component: () => import('@/views/synergistic-manage/synergistic-bank-reconciliation'),
          name: 'synergistic-bank-reconciliation'
        },{
          path: 'synergistic-canceld',
          component: () => import('@/views/synergistic-manage/synergistic-canceld'),
          name: 'synergistic-canceld'
        },{
          path: 'synergistic-repayment-record',
          component: () => import('@/views/synergistic-manage/synergistic-repayment-record'),
          name: 'synergistic-repayment-record'
        },{
          path: 'synergistic-revoked',
          component: () => import('@/views/synergistic-manage/synergistic-revoked'),
          name: 'synergistic-revoked'
        },{
          path: 'litigation-apply',
          component: () => import('@/views/litigation-manage/litigation-apply'),
          name: 'litigation-apply'
        },{
          path: 'litigation-my',
          component: () => import('@/views/litigation-manage/litigation-my'),
          name: 'litigation-my'
        },{
          path: 'litigation-all',
          component: () => import('@/views/litigation-manage/litigation-all'),
          name: 'litigation-all'
        },{
          path: 'relief-management',
          component: () => import('@/views/relief-manage/relief-management'),
          name: 'relief-management'
        },{
          path: 'statistics-day',
          component: () => import('@/views/statistics-manage/statistics-day'),
          name: 'statistics-day'
        },{
          path: 'statistics-month',
          component: () => import('@/views/statistics-manage/statistics-month'),
          name: 'statistics-month'
        },{
          path: 'statistics-day-action',
          component: () => import('@/views/statistics-manage/statistics-day-action'),
          name: 'statistics-day-action'
        },{
          path: 'member-in',
          component: () => import('@/views/member-manage/member-in'),
          name: 'member-in'
        },{
          path: 'member-off',
          component: () => import('@/views/member-manage/member-off'),
          name: 'member-off'
        },{
          path: 'setting-enum',
          component: () => import('@/views/settings/setting-enum'),
          name: 'setting-enum'
        },{
          path: 'setting-template',
          component: () => import('@/views/settings/setting-template'),
          name: 'setting-template'
        },{
          path: 'setting-log',
          component: () => import('@/views/settings/setting-log'),
          name: 'setting-log'
        },{
          path: 'setting-department',
          component: () => import('@/views/settings/setting-department'),
          name: 'setting-department'
        },{
          path: 'setting-role',
          component: () => import('@/views/settings/setting-role'),
          name: 'setting-role'
        },{
          path: 'case-detail',
          component: () => import('@/views/data-manage/detail'),
          name: 'case-detail'
        },{
          path: 'setting-reward',
          component: () => import('@/views/settings/setting-reward'),
          name: 'setting-reward'
        }
      ]
    },
    {
      path: '/login',
      component: () => import('@/views/login/login')
    }
  ]
})
