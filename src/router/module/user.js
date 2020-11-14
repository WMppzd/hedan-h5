export default [
    {
        path: '/',
        redirect: '/welcome'
    },
    {
        path: '/selectBusiness',
        name: 'selectBusiness',
        meta: { title: '选择展商' },
        component: () => import('@/views/home/selectBusiness.vue')
    },
    {
        path: '/welcome',
        name: 'welcome',
        meta: { title: '欢迎页' },
        component: () => import('@/views/home/welcome.vue')
    },
];


