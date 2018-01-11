import Vue from 'vue'
import Router from 'vue-router'
import matchManage from '@/components/matchManage'
import matchOperation from '@/components/matchOperation'
import material from '@/components/material'
import me from '@/components/me'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/matchOperation',
      name: 'matchOperation',
      component: matchOperation
    },
    {
      path: '/material',
      name: 'material',
      component: material
    },
    {
      path: '/matchManage',
      name: 'matchManage',
      component: matchManage
    },
    {
      path: '/me',
      name: '/me',
      component: me
    }
  ]
})
