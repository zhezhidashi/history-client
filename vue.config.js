const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,
    devServer: {
        proxy: {
            '/api': {
                target: 'http://xks.pku.edu.cn/api-service',
                pathRewrite: {'^/api': ''},
                ws: true,
                changeOrigin: true
            },
        },
    },
})
