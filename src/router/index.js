import Vue from 'vue'
import Router from 'vue-router'
import matchManage from '@/components/matchManage'
import matchOperation from '@/components/matchOperation'
import material from '@/components/material'
import me from '@/components/me'
import addMaterial from '@/components/addMaterial'
import changepwd from '@/components/changepwd'
import matchDetail from '@/components/matchDetail'
import matchReview from '@/components/matchReview'
import materialDetail from '@/components/materialDetail'

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
      name: 'me',
      component: me
    },
    {
      path: '/addMaterial/:id',
      name: 'addMaterial',
      component: addMaterial
    },
    {
      path: '/changepwd',
      name: 'changepwd',
      component: changepwd
    },
    {
      path: '/matchDetail',
      name: 'matchDetail',
      component: matchDetail
    },
    {
      path: '/matchReview',
      name: 'matchReview',
      component: matchReview
    },
    {
      path: '/materialDetail/:id',
      name: 'materialDetail',
      component: materialDetail
    }
  ]
})
