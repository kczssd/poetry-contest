module.exports = {
    devServer: {
        proxy: {
          '/api': {
            target: 'http://47.110.77.252:8080',
            ws: true,
            changeOrigin: true,
            pathRewrite:{
                '^/api':''
            }
          }
        }
    }
}