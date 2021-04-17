import dotenv from 'dotenv'
const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}
dotenv.config()

export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: '及乐1997',
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'keywords', name: 'keywords', content: '音乐,视频,话题,电影,学习交流vuejs nuxtjs nestjs nextjs nodejs......' },
            { hid: 'description', name: 'description', content: '及乐1997是一个集娱乐和学习为一体的网站' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        'normalize.css',
        'ant-design-vue/dist/antd.css'
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        '@/plugins/antd-ui',
        '@/plugins/axios',
        '@/plugins/svgicon',
        { src: '@/plugins/wangeditor', ssr: false },
        { src: "@/plugins/markdown.js", ssr: false },
        { src: "@/plugins/emoji.js", ssr: false }
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        '@nuxtjs/dotenv',
        'cookie-universal-nuxt',
        '@nuxtjs/dayjs'
    ],
    dayjs: {
        locales: ['zh-cn'],
        defaultLocale: 'zh-cn',
        plugins: [
            'relativeTime'
        ]
    },

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
        prefix: process.env.BASE_URL,
        proxy: true
    },
    proxy: {
        [process.env.BASE_URL]: {
            target: process.env.SERVER_URL,
            changeOrigin: true,
            pathRewrite: {
                ["^" + process.env.BASE_URL]: ""
            }
        }
    },
    router: {
        extendRoutes(routes, resolve) {
            routes.push({
                path: '/talk',
                component: resolve(__dirname, 'pages/talk.vue'),
                name: "addtalk",
                children: [{
                    path: ':label/:children/:id',
                    component: resolve(__dirname, 'view/talk.vue'),
                    name: "addtalkid"
                }]
            }, {
                path: '/video',
                component: resolve(__dirname, 'pages/talk.vue'),
                name: "addvideo",
                children: [{
                    path: ':label/:children/:id',
                    component: resolve(__dirname, 'view/video.vue'),
                    name: "addvideoid"
                }]
            })
        },
        middleware: ["auth"]
    },
    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        extractCSS: true,
        extend(config, ctx) {
            // 排除 nuxt 原配置的影响,Nuxt 默认有vue-loader,会处理svg,img等
            // 找到匹配.svg的规则,然后将存放svg文件的目录排除
            const svgRule = config.module.rules.find(rule => rule.test.test('.svg'))
            svgRule.exclude = [resolve('assets/icons/svg')]
                //添加loader规则
            config.module.rules.push({
                test: /\.svg$/, //匹配.svg
                include: [resolve('assets/icons/svg')], //将存放svg的目录加入到loader处理目录
                use: [{ loader: 'svg-sprite-loader', options: { symbolId: 'icon-[name]' } }]
            })
        }
    }
}