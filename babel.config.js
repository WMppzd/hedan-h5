let plugins = ['@babel/plugin-proposal-optional-chaining'];
// 生成环境去掉console.log
if (process.env.VUE_APP_IS_DEBUG === 'false') {
    plugins.push('transform-remove-console');
}

module.exports = {
    plugins: [
        [
            'import',
            {
                libraryName: 'vant',
                libraryDirectory: 'es',
                style: true
            },
            'vant'
        ],
        ...plugins
    ],
    presets: ['@vue/app']
};
