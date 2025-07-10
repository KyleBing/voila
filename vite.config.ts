import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from "vite-svg-loader"
import { resolve } from 'path'
import zipPack from "vite-plugin-zip-pack" // make dist.zip file
import dayjs from 'dayjs'

function getTimeStringNow() {
    return dayjs().format('YYYYMMDD-HHmmss')
}

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        host: '0.0.0.0',// 自定义主机名
        port: 5000,// 自定义端口
        https: false,
        proxy: {
            '/dev': {
                // target: 'http://localhost:3000',
                target: 'http://kylebing.cn:3000',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/dev/, '/'),
            },
        }
    },
    base: './',
    plugins: [
        vue(),
        svgLoader(),
        zipPack({
            inDir: 'dist',
            outDir: 'archive',
            outFileName: `voila-${getTimeStringNow()}.zip`,
            pathPrefix: ''
        })
    ],
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
            '@/view': resolve(__dirname, './src/views'),
            '@/api': resolve(__dirname, './src/api'),
        },
    },

})
