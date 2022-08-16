module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/JDGJ/' : '/',
    // publicPath: '/', // production 正式
    devServer: {
        port: 7700,
        // proxy: {
        //     "/api": {
        //         target: "http://192.168.110.88:8010",
        //         changeOrigin: true
        //     }
        // }
    },
    configureWebpack: {

        // 开启分离 js
        optimization: {
            runtimeChunk: 'single',
            splitChunks: {
                chunks: 'all',
                maxInitialRequests: Infinity,
                minSize: 20000,
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name(module) {
                            // get the name. E.g. node_modules/packageName/not/this/part.js
                            // or node_modules/packageName
                            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
                            // npm package names are URL-safe, but some servers don't like @ symbols
                            return `npm.${packageName.replace('@', '')}`
                        }
                    }
                }
            }
        }
    }
}