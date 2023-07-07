import {createRouter, createWebHistory} from 'vue-router'
import {getToken, removeStatus, removeUser} from "@utils/token.js";

const routes = [
    {
        path: '/404',
        name: 'NotFound',
        meta: {title: "404-每日读书-海量书籍小说免费读"},
        component: () => import('@views/404/NotFound.vue'),
    },
    {
        path: '/download/app',
        name: 'App',
        meta: {title: "下载-每日读书-海量书籍小说免费读"},
        component: () => import('@views/app/App.vue'),
    },
    {
        path: '/privacy',
        name: 'Privacy',
        meta: {title: "隐私政策-每日读书-海量书籍小说免费读"},
        component: () => import('@views/privacy/Privacy.vue'),
    },
    {
        path: '/',
        name: 'Index',
        meta: {title: "每日读书-海量书籍小说免费读"},
        component: () => import('@views/Index.vue'),
    },
    {
        path: '/category/:id',
        name: 'Category',
        component: () => import('@views/category/Category.vue'),
    },
    {
        path: '/detail/:id',
        name: 'Detail',
        component: () => import('@views/detail/Detail.vue'),
    },
    {
        path: '/content/:id',
        name: 'Content',
        component: () => import('@views/content/Content.vue'),
    },
    {
        path: '/author/:name',
        name: 'Author',
        component: () => import('@views/author/Author.vue'),
    },
    {
        path: '/shelf',
        name: 'Shelf',
        component: () => import('@views/shelf/Shelf.vue'),
    },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach(async (to, from, next) => {

    const token = getToken()

    if (to.matched.length < 1) {
        return next({path: '/404'})
    }

    let title = to.meta.title
    if (title !== undefined) {
        window.document.title = title
    }
    next()

})

router.afterEach((to, from) => {

})




