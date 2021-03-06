'use strict';
const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir);
}
module.exports = {
    publicPath:  '/',
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
    pwa: {
        iconPaths: {
            favicon32: 'favicon.ico',
            favicon16: 'favicon.ico',
            appleTouchIcon: 'favicon.ico',
            maskIcon: 'favicon.ico',
            msTileImage: 'favicon.ico'
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
                ws: true,   // websocket
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
        name: '我的专属展会地图',
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
