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
                    title: '档案/手稿',
                    PageType: 1,
                },
                component: () => import('@/views/PkuPeople/PkuPeople1')
            },
            {
                path: '/PkuPeople2',
                name: 'PkuPeople2',
                meta: {
                    title: '档案/手稿',
                    PageType: 1,
                },
                component: () => import('@/views/PkuPeople/PkuPeople2')
            },
            {
                path: '/PkuPeople3',
                name: 'PkuPeople3',
                meta: {
                    title: '档案/手稿',
                    PageType: 1,
                },
                component: () => import('@/views/PkuPeople/PkuPeople3')
            },
            {
                path: '/PkuPeople4',
                name: 'PkuPeople4',
                meta: {
                    title: '档案/手稿',
                    PageType: 1,
                },
                component: () => import('@/views/PkuPeople/PkuPeople4')
            },
            {
                path: '/OralHistory1',
                name: 'OralHistory1',
                meta: {
                    title: '口述/访谈',
                    PageType: 1,
                },
                component: () => import('@/views/OralHistory/OralHistory1')
            },
            {
                path: '/OralHistory2',
                name: 'OralHistory2',
                meta: {
                    title: '口述/访谈',
                    PageType: 1,
                },
                component: () => import('@/views/OralHistory/OralHistory2')
            },
            {
                path: '/OralHistory3',
                name: 'OralHistory3',
                meta: {
                    title: '口述/访谈',
                    PageType: 1,
                },
                component: () => import('@/views/OralHistory/OralHistory3')
            },
            {
                path: '/OralHistory4',
                name: 'OralHistory4',
                meta: {
                    title: '口述/访谈',
                    PageType: 1,
                },
                component: () => import('@/views/OralHistory/OralHistory4')
            },
            {
                // 古籍
                path: '/AntiqueWorks11',
                name: 'AntiqueWorks11',
                meta: {
                    title: '古籍',
                    PageType: 1,
                },
                component: () => import('@/views/AntiqueWorks/AntiqueWorks11')
            },
            {
                // 特藏
                path: '/AntiqueWorks12',
                name: 'AntiqueWorks12',
                meta: {
                    title: '特藏',
                    PageType: 1,
                },
                component: () => import('@/views/AntiqueWorks/AntiqueWorks12')
            },
            {
                // 古籍搜索页
                path: '/AntiqueWorks21',
                name: 'AntiqueWorks21',
                meta: {
                    title: '古籍',
                    PageType: 1,
                },
                component: () => import('@/views/AntiqueWorks/AntiqueWorks21')
            },
            {
                // 特藏搜索页
                path: '/AntiqueWorks22',
                name: 'AntiqueWorks22',
                meta: {
                    title: '特藏',
                    PageType: 1,
                },
                component: () => import('@/views/AntiqueWorks/AntiqueWorks22')
            },
            {
                // 古籍详情页
                path: '/AntiqueWorks31',
                name: 'AntiqueWorks31',
                meta: {
                    title: '古籍',
                    PageType: 1,
                },
                component: () => import('@/views/AntiqueWorks/AntiqueWorks31')
            },
            {
                // 特藏详情页
                path: '/AntiqueWorks32',
                name: 'AntiqueWorks32',
                meta: {
                    title: '特藏',
                    PageType: 1,
                },
                component: () => import('@/views/AntiqueWorks/AntiqueWorks32')
            },

            {
                // 印像
                path: '/Events11',
                name: 'Events11',
                meta: {
                    title: '印像',
                    PageType: 1,
                },
                component: () => import('@/views/Events/Events11')
            },
            {
                // 事纪
                path: '/Events12',
                name: 'Events12',
                meta: {
                    title: '事纪',
                    PageType: 1,
                },
                component: () => import('@/views/Events/Events12')
            },
            {
                // 印象搜索页
                path: '/Events21',
                name: 'Events21',
                meta: {
                    title: '印像',
                    PageType: 1,
                },
                component: () => import('@/views/Events/Events21')
            },
            {
                // 事纪搜索页
                path: '/Events22',
                name: 'Events22',
                meta: {
                    title: '事纪',
                    PageType: 1,
                },
                component: () => import('@/views/Events/Events22')
            },
            {
                // 印像详情页
                path: '/Events31',
                name: 'Events31',
                meta: {
                    title: '印像',
                    PageType: 1,
                },
                component: () => import('@/views/Events/Events31')
            },
            {
                // 事纪详情页
                path: '/Events32',
                name: 'Events32',
                meta: {
                    title: '事纪',
                    PageType: 1,
                },
                component: () => import('@/views/Events/Events32')
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
            {
                path: 'MainSearch',
                name: 'MainSearch',
                meta: {
                    title: '综合搜索',
                    PageType: 1,
                },
                component: () => import('@/views/Other/MainSearch')
            }
        ]
    },
]


const router = new VueRouter({
    mode: 'history',
    routes
})

export default router