const FileManagerPlugin = require('filemanager-webpack-plugin')

module.exports = {
    publicPath: './',
    productionSourceMap: false, // 不产出 .map 文件

    // outputDir: '../voila',


    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            let plugins = []
            plugins.push(
                new FileManagerPlugin({
                    events: {
                        onEnd: {
                            mkdir: ['./archive'], // 新建 ./archive 目录
                            archive: [
                                // 打包 压缩包中不带 dist 外壳
                                {
                                    source: './dist/',
                                    destination: './archive/voila.zip',
                                    options: {}
                                },
                            ]
                        }
                    }
                })
            )
            config.plugins = config.plugins.concat(plugins) // 将新建的 plugin 添加到原 config 中的 plugin 中
        }
    }
}
