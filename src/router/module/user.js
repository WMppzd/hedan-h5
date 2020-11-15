export default [{
        path: '/',
        redirect: '/welcome'
    },
    {
        path: '/selectBusiness',
        name: 'selectBusiness',
        meta: {
            title: '选择展商'
        },
        component: () => import('@/views/home/selectBusiness.vue')
    },
    {
        path: '/welcome',
        name: 'welcome',
        meta: {
            title: '欢迎页'
        },
        component: () => import('@/views/home/welcome.vue')
    }, {
        path: '/login',
        name: 'login',
        meta: {
            title: '登录页面'
        },
        component: () => import('@/views/home/login.vue')
    }, {
        path: '/test',
        name: 'welcome',
        meta: {
            title: '欢迎页'
        },
        component: () => import('@/views/home/test.vue')
    },
];
