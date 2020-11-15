'use strict';
const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir);
}
const staticDomain = '//bm.zhugexuetang.com/marketing/';
module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? staticDomain : '/',
    outputDir: 'dist',
    assetsDir: 'static',
    lintOnSave: false,
    productionSourceMap: false,
    css: {
        loaderOptions: {
            scss: {
                prependData: `@import "~@/styles/index.scss";`
            }
        }
    },
    devServer: {
        port: process.env.port || process.env.npm_config_port || 6789,
        open: true,
        overlay: {
            warnings: false,
            errors: true
        },
        proxy: {
            '/api': {
                target: 'http://ip-29-hedan-app.coralcodes.com',   // 请求服务器根路径
                changeOrigin: true,    // 是否跨域
                source:false,
                // ws: true,   // websocket
                pathRewrite: {    // 重写路径: 当检测到请求地址里包含 /v1 时,将此路径进行跨域代理操作
                    '^/api': ''
                }
            }
        }
    },
    chainWebpack: config => {
        if (process.env.npm_config_report) {
            config.plugin('webpack-bundle-analyzer').use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin);
        }
    },
    configureWebpack: {
        name: '盒蛋',
        resolve: {
            alias: {
                '@': resolve('src')
            }
        },
        performance: {
            maxEntrypointSize: 500000, //入口文件最大bytes（500k）
            maxAssetSize: 500000 //任何单文件最大bytes（500k）
        }
    }
};
