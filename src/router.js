import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'connector',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Connector.vue')
    },
    {
      path: '/about.:ext',
      name: 'connector',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Connector.vue')
    },
    {
      path: '/job',
      name: 'jobs',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Job/Jobs.vue')
    },
    {
      path: '/dataasset/',
      name: 'dataassets',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/DataAsset/DisplayDataAssets.vue')
    },
    {
      path: '/dataasset/create/:type',
      name: 'createdataasset',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/DataAsset/CreateDataAsset.vue'),
      props: true
    },
    {
      path: '/datasource/select',
      name: 'selectdatasource',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/DataAsset/SelectDataSource.vue')
    },
    {
      path: '/datasource/create',
      name: 'createdatasource',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/DataAsset/CreateDataSource.vue')
    },
    {
      path: '/datasource/create/:type',
      name: 'createdatasource',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/DataAsset/CreateDataSource.vue'),
      props: true
    }
  ]
})
