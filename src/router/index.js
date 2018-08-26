import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: resolve => require(['@/components/index'], resolve)//首页
    },
    {
      path: '/text/detail/:id',
      component: resolve => require(['@/pages/text/detail'], resolve)//文本详情页
    },
    {
      path: '/textEdit',
      name:"textEdit",
      component: resolve => require(['@/pages/text/edit'], resolve)//文本编辑页
    },
    {
      path: '/login',
      component: resolve => require(['@/pages/login/login'], resolve)//登录页面
    },
    {
      path: '/imgEdit',
      name:"imgEdit",
      component: resolve => require(['@/pages/imgEdit/imgEdit'], resolve)//上传图片页面
    },
     {
       path: '/all/text',
       component: resolve => require(['@/pages/more/text'], resolve) //全部文字笔记
     },

      {
        path: '/all/pic',
        component: resolve => require(['@/pages/more/pic'], resolve) //全部图文笔记
      },
      {
        path: '/user/recycle',
        component: resolve => require(['@/pages/user/recycle'], resolve) //回收站
      },
      {//推荐
        path: '/Tj/pic',
        component: resolve => require(['@/pages/Tj/pic'], resolve) //推荐 图片
      },
      {//推荐
        path: '/Tj/text',
        name:"text",
        component: resolve => require(['@/pages/Tj/text'], resolve) //推荐 文本

      },
  ]
})
