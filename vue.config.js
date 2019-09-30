module.exports = {
    // build: {
    //     env: require('./prod.env'),
    //     index: path.resolve(__dirname, '../dist/index.html'),
    //     assetsRoot: path.resolve(__dirname, '../dist'),
    //     assetsSubDirectory: 'static',
    //     assetsPublicPath: '/',
    // },
    publicPath: './',




    // baseUrl: process.env.NODE_ENV === 'production' ? '/static/' : './',

    // outputDir: process.env.outputDir, // 打包生成目录
    // // assetDir: 'static',
    // lintOnSave: false,
    // runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
    // productionSourceMap: false, // 生产环境的 source map


    devServer: {


        https: false, // https:{type:Boolean}
        open: true, //配置自动启动浏览器
        // proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理
        proxy: {
            '/compare': { //http://test-api.exingtech.com/   http://exing.leanapp.cn/
                target: 'http://test-api.exingtech.com/', // 需要请求的地址
                changeOrigin: true, // 是否跨域
                pathRewrite: {
                    '^/compare': '' // 替换target中的请求地址，也就是说，在请求的时候，url用'/proxy'代替'http://ip.taobao.com'
                }
            },

            '/echart': { //http://test-api.exingtech.com/
                target: 'http://test.exingtech.com', // 需要请求的地址
                changeOrigin: true, // 是否跨域
                pathRewrite: {
                    '^/echart': '' // 替换target中的请求地址，也就是说，在请求的时候，url用'/proxy'代替'http://ip.taobao.com'
                }
            }

        }, // 配置多个代理

    }
};