export default [
    {
        path: '/login',
        name: 'login',
        meta: { title: '登陆页面' },
        component: () => import('@/views/home/index.vue')
    }
];


