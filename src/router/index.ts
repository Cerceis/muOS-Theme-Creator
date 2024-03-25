import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'login',
        component: () => import('@/views/TopPage.vue'), // switch to login
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        meta: { title: 'Page not found 404' },
        redirect: "/"
    },
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes
})

