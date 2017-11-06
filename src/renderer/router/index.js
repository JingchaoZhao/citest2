import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import Login from '@/components/pages/Login.vue'
import Register from '@/components/pages/register.vue'
import Overview from '@/components/pages/overview.vue'

import Home from '@/components/Home.vue'
import FinanceDetails from '@/components/apartmentManagement/FinanceDetails.vue'
import ReserveRoom from '@/components/apartmentManagement/ReserveRoom.vue'
import Bill from '@/components/apartmentManagement/Bill.vue'
import WaterElectricityFees from '@/components/apartmentManagement/WaterElectricityFees.vue'
import RentalContract from '@/components/apartmentManagement/RentalContract.vue'
import RootStateMag from '@/components/apartmentManagement/roomStateMag.vue'

import apartmentAssert from '@/components/assertManagement/apartmentAssert.vue'
import financeAssert from '@/components/assertManagement/financeAssert.vue'
import approveAssert from '@/components/assertManagement/approveAssert.vue'
import test from '@/components/assertManagement/test.vue'

import UserManagement from '@/components/setting/userManagement.vue'
import GroupManagement from '@/components/setting/groupManagement.vue'
import AuthManagement from '@/components/setting/authManagement.vue'
import OrganizationManagement from '@/components/setting/organizationManagement.vue'



const routes = [
  {
    path: '/',
    component: Login,
    hidden: true
  },
  {
    path: '/login',
    component: Login,
    hidden: true
  },
  {
    path: '*',
    component: Login,
    hidden: true
  },
  {
    path: '/register',
    component: Register,
    hidden: true
  },
  {
    path: '/',
    component: Home,
    name: '',
    iconCls: 'bf_icon_normal',
    leaf: true,
    children: [
      { path: '/overview', component: Overview, name: '概况' }
    ]
  },
  {
    path: '/',
    component: Home,
    name: '公寓管理',
    iconCls: 'bf_icon_apartMag',//图标样式class
    children: [
      { path: '/rootStateMag', component: RootStateMag, name: '房态管理' },
      { path: '/rentalContract', component: RentalContract, name: '租房合同' },
      { path: '/bill', component: Bill, name: '租客账单' },
      { path: '/financeDetails', component: FinanceDetails, name: '财务流水' },
      { path: '/WaterElectricityFees', component: WaterElectricityFees, name: '水电信息'},
      { path: '/reserveRoom', component: ReserveRoom, name: '房间预定'}
    ]
  },
  {
    path: '/',
    component: Home,
    name: '资产管理',
    iconCls: 'bf_icon_zcgl',
    children: [
      { path: '/apartmentAssert', component: apartmentAssert, name: '公寓信息' },
      { path: '/financeAssert', component: financeAssert, name: '财务信息' },
      { path: '/approveAssert', component: approveAssert, name: '申请信息' },
      { path: '/test', component: test, name: 'cheshi' }
    ]
  },
  {
    path: '/',
    component: Home,
    name: '设置',
    iconCls: 'bf_icon_setting',
    children: [
      { path: '/userManagement', component: UserManagement, name: '用户管理' },
      { path: '/groupManagement', component: GroupManagement, name: '群组管理' },
      { path: '/authManagement', component: AuthManagement, name: '权限管理' },
      { path: '/organizationManagement', component: OrganizationManagement, name: '组织架构管理' }
    ]
  },
  {
    path: '*',
    redirect: '/',
    hidden: true
  }
];

export default new Router({
  routes: routes
})

 // routes: [
 //    {
 //      path: '/',
 //      name: 'landing-page',
 //      component: require('@/components/LandingPage').default
 //    },
 //    {
 //      path: '*',
 //      redirect: '/'
 //    }
 //  ]
