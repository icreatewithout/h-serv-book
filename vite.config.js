import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";
import dayjs from 'dayjs'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'


function _resolve(dir) {
    return path.resolve(__dirname, dir);
}

export default defineConfig({

    resolve: {
        alias: {
            '@': _resolve('src'),
            '@components': _resolve('src/components'),
            '@assets': _resolve('src/assets'),
            '@views': _resolve('src/views'),
            '@store': _resolve('src/store'),
            '@utils': _resolve('src/utils'),
        }

    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@use "src/styles/element/index.scss" as *;`,
            },
        },
    },
    plugins: [
        vue(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
    ],
    define: JSON.stringify(dayjs().format('YYYY-MM-DD HH:mm:ss')),
    base: '/',
    server: {
        open: false, // 是否自动在浏览器打开
        port: 3000, // 端口号
        host: '0.0.0.0',
        https: false,// 使用的是http协议则设置为false，https协议则设置为true
        //配置请求代理
        proxy: {
            '/api': {
                //所有的接口请求都会被代理到这个路径上
                target: 'http://0.0.0.0:8080',
                /**
                 * 重写路径，当我们在浏览器中看到请求的地址为：http://localho
                 * 实际上访问的地址是：http://121.121.67.254:8185
                 */
                rewrite: (path) => path.replace(/^\/api/, ''),
                ws: true, // 是否启用webSockets
                secure: false, // 使用的是http协议则设置为false 安全证书校验
                //是否开启跨域
                changeOrigin: true,
            }
        },
    },
    build: {
        target: 'modules',
        outDir: 'dist', // 指定输出路径
        assetsDir: 'static', // 指定生成静态资源的存放路径
        minify: 'terser', // 混淆器,esbuild
        // 移除console
        terserOptions: {
            compress: {
                drop_console: true, // 生产环境移除console
                drop_debugger: true // 生产环境移除debugger
            }
        },
    }
})
