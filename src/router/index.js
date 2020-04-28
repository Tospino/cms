import Vue from 'vue'
import VueRouter from 'vue-router'
import Common from '../layout/common.vue'

Vue.use(VueRouter)

const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

const routes = [
  {
    path: '/',
    name: 'index',
    component: Common,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import(/* webpackChunkName: "about" */ '../views/home/index.vue')
      },
      {
        path: '/flow',
        name: 'flow',
        component: () => import(/* webpackChunkName: "about" */ '../views/flow.vue')
      },
      {
        path: '/cost',
        name: 'cost',
        component: () => import(/* webpackChunkName: "about" */ '../views/cost.vue')
      },
      {
        path: '/news',
        name: 'news',
        redirect: '/news/newsList',
        component: () => import(/* webpackChunkName: "about" */ '../views/news/index.vue'),
        children: [
          {
            path: 'newsList/:typeId?',
            name: 'newsList',
            component: () => import(/* webpackChunkName: "about" */ '../views/news/newsList.vue')
          },
          {
            path: 'newsDetail/:newsId',
            name: 'newsDetail',
            component: () => import(/* webpackChunkName: "about" */ '../views/news/newsDetail.vue')
          }
        ]
      },
      {
        path: '/rules',
        name: 'rules',
        // redirect: '/rules/default',
        component: () => import(/* webpackChunkName: "about" */ '../views/rules/index.vue'),
        children: [
          // {
          //   path: 'default',
          //   name: 'rules',
          //   component: () => import(/* webpackChunkName: "about" */ '../views/rules/default.vue')
          // },
          {
            path: 'ruleList/:classifyId',
            name: 'ruleList',
            component: () => import(/* webpackChunkName: "about" */ '../views/rules/ruleList.vue')
          },
          {
            path: 'ruleDetail/:detailId',
            name: 'ruleDetail',
            component: () => import(/* webpackChunkName: "about" */ '../views/rules/ruleDetail.vue')
          },
          {
            path: 'search',
            name: 'ruleSearch',
            component: () => import(/* webpackChunkName: "about" */ '../views/rules/search.vue')
          }
        ]
      },
      {
        path: '/help',
        name: 'help',
        // redirect: '/help/default',
        component: () => import(/* webpackChunkName: "about" */ '../views/help/index.vue'),
        children: [
          // {
          //   path: 'default',
          //   name: 'help',
          //   component: () => import(/* webpackChunkName: "about" */ '../views/help/default.vue')
          // },
          {
            path: 'issueList/:classifyId',
            name: 'issueList',
            component: () => import(/* webpackChunkName: "about" */ '../views/help/issueList.vue')
          },
          {
            path: 'issueDetail/:detailId',
            name: 'issueDetail',
            component: () => import(/* webpackChunkName: "about" */ '../views/help/issueDetail.vue')
          },
          {
            path: 'search',
            name: 'helpSearch',
            component: () => import(/* webpackChunkName: "about" */ '../views/help/search.vue')
          }
        ]
      }
    ]
  },
  {
    path: '*',
    name: '404',
    component: () => import(/* webpackChunkName: "about" */ '../views/404.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (to.name !== from.name) return { x: 0, y: 0 }
    }
  }
})

export default router
