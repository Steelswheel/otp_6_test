import { createRouter, createWebHistory } from 'vue-router'
import ProductsView from '@/views/ProductsView'
import EmptyView from '@/views/EmptyView'

const routes = [
  {
    path: '/',
    name: 'Проведение ТО и мелкий ремонт',
    component: ProductsView
  },
  {
    path: '/logistic',
    name: 'Логистика',
    component: EmptyView
  },
  {
    path: '/transport',
    name: 'Перевозчики',
    component: EmptyView
  },
  {
    path: '/tasks',
    name: 'Задачи',
    component: EmptyView
  },
  {
    path: '/analytics/',
    name: 'Аналитика',
    children: [
      {
        path: 'directory',
        name: 'Справочник',
        component: EmptyView
      },
      {
        path: 'base',
        name: 'База',
        component: EmptyView
      },
      {
        path: 'vase',
        name: 'Ваза',
        component: EmptyView
      },
    ],
    component: EmptyView
  },
  {
    path: '/address',
    name: 'Адреса',
    component: EmptyView
  },
  {
    path: '/info',
    name: 'Информация для скалада',
    component: EmptyView
  },
  {
    path: '/personal',
    name: 'Личные настройки',
    component: EmptyView,
    meta: {
      hidden: true
    }
  },
  {
    path: '/logout',
    name: 'Выйти',
    component: EmptyView,
    meta: {
      hidden: true
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
