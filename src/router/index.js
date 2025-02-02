import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'el-icon-s-home' }
    },
    {
      path:'dashboard/:id',
      name:'dashboardID',
      component: () => import('@/views/dashboard/announcement'),
      hidden:true
    }
  ]
  },


  {
    path: '/work',
    component: Layout,
    redirect: '/work/information',
    name: 'Work',
    meta: { title: '工作台', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'information',
        name: 'matchInformation',
        component: () => import('@/views/work/information/index'),
        meta: { title: '赛事信息', icon: 'table' }
      },
      {
        path:'information/:id',
        name:'matchID',
        component: () => import('@/views/work/information/matchMessage'),
        hidden:true
      },

      {
        path: 'grade',
        name: 'matchGrade',
        component: () => import('@/views/work/grade/index'),
        meta: { title: '赛事评分', icon: 'el-icon-c-scale-to-original' }
      },
      
      {
        path:"grade/index",
        name:"trygrade",
        component: () => import('@/views/work/grade/grade'),
        hidden:true
      }
    ]
  },
// 个人中心
  {
    path: '/user',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'UserIndex',
        component: () => import('@/views/user/index'),
        meta: { title: '个人中心', icon: 'user' }
      },
      {
        path: 'change',
        name: 'UserChange',
        component: () => import('@/views/user/change'),
        hidden:true
      }

    ]
  },



  {
    path: 'external-link',
    component: Layout,
    children: [
      // {
      //   path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
      //   meta: { title: 'External Link', icon: 'link' }
      // }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
