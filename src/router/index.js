import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

let OriginPush = VueRouter.prototype.push;
let OriginReplace = VueRouter.prototype.replace;
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        OriginPush.call(this, location, resolve, reject);
    }
    else {
        OriginPush.call(this, location, () => { }, () => { });
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        OriginReplace.call(this, location, resolve, reject);
    }
    else {
        OriginReplace.call(this, location, () => { }, () => { });
    }
}

const routes = [
    {
        path: '/',
        name: 'Main',
        component: () => import('../views/Main.vue'),
        redirect: '/Home',
        // PageType 为了控制组件的显示隐藏，0为主页，1为其他页面
        children: [
            {
                path: '/Home',
                name: 'Home',
                meta: {
                    title: '主页',
                    PageType: 0,
                },
                component: () => import('@/views/Home')
            },
            {
                path: '/PkuPeople1',
                name: 'PkuPeople1',
                meta: {
                    title: '北大外语人',
                    PageType: 1,
                },
                component: () => import('@/views/PkuPeople/PkuPeople1')
            },
            {
                path: '/PkuPeople2',
                name: 'PkuPeople2',
                meta: {
                    title: '北大外语人',
                    PageType: 1,
                },
                component: () => import('@/views/PkuPeople/PkuPeople2')
            },
            {
                path: '/PkuPeople3',
                name: 'PkuPeople3',
                meta: {
                    title: '北大外语人',
                    PageType: 1,
                },
                component: () => import('@/views/PkuPeople/PkuPeople3')
            },
            {
                path: '/PkuPeople4',
                name: 'PkuPeople4',
                meta: {
                    title: '北大外语人',
                    PageType: 1,
                },
                component: () => import('@/views/PkuPeople/PkuPeople4')
            },
            {
                path: '/OralHistory1',
                name: 'OralHistory1',
                meta: {
                    title: '口述史',
                    PageType: 1,
                },
                component: () => import('@/views/OralHistory/OralHistory1')
            },
            {
                path: '/OralHistory2',
                name: 'OralHistory2',
                meta: {
                    title: '口述史',
                    PageType: 1,
                },
                component: () => import('@/views/OralHistory/OralHistory2')
            },
            {
                path: '/OralHistory3',
                name: 'OralHistory3',
                meta: {
                    title: '口述史',
                    PageType: 1,
                },
                component: () => import('@/views/OralHistory/OralHistory3')
            },
            {
                // 古籍
                path: '/AntiqueWorks11',
                name: 'AntiqueWorks11',
                meta: {
                    title: '古籍特藏',
                    PageType: 1,
                },
                component: () => import('@/views/AntiqueWorks/AntiqueWorks11')
            },
            {
                // 特藏
                path: '/AntiqueWorks12',
                name: 'AntiqueWorks12',
                meta: {
                    title: '古籍特藏',
                    PageType: 1,
                },
                component: () => import('@/views/AntiqueWorks/AntiqueWorks12')
            },
            {
                // 古籍搜索页
                path: '/AntiqueWorks21',
                name: 'AntiqueWorks21',
                meta: {
                    title: '古籍特藏',
                    PageType: 1,
                },
                component: () => import('@/views/AntiqueWorks/AntiqueWorks21')
            },
            {
                // 特藏搜索页
                path: '/AntiqueWorks22',
                name: 'AntiqueWorks22',
                meta: {
                    title: '古籍特藏',
                    PageType: 1,
                },
                component: () => import('@/views/AntiqueWorks/AntiqueWorks22')
            },
            {
                // 古籍详情页
                path: '/AntiqueWorks31',
                name: 'AntiqueWorks31',
                meta: {
                    title: '古籍特藏',
                    PageType: 1,
                },
                component: () => import('@/views/AntiqueWorks/AntiqueWorks31')
            },
            {
                // 特藏详情页
                path: '/AntiqueWorks32',
                name: 'AntiqueWorks32',
                meta: {
                    title: '古籍特藏',
                    PageType: 1,
                },
                component: () => import('@/views/AntiqueWorks/AntiqueWorks32')
            },

            {
                path: '/ContactUs',
                name: 'ContactUs',
                meta: {
                    title: '联系我们',
                    PageType: 1,
                },
                component: () => import('@/views/Other/ContactUs')
            },
            {
                path: '/Copyright',
                name: 'Copyright',
                meta: {
                    title: '版权说明',
                    PageType: 1,
                },
                component: () => import('@/views/Other/Copyright')
            },
            {
                path: '/Privacy',
                name: 'Privacy',
                meta: {
                    title: '隐私声明',
                    PageType: 1,
                },
                component: () => import('@/views/Other/Privacy')
            },
            {
                path: '/Login',
                name: 'Login',
                meta: {
                    title: '登录',
                    PageType: 1,
                },
                component: () => import('@/views/Other/Login')
            },
        ]
    },
]


const router = new VueRouter({
    mode: 'history',
    routes
})

export default router