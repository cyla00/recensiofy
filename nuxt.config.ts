// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    routeRules: {
        // Static page generated on-demand, revalidates in background
        // '/blog/**': { swr: true },

        // Static page generated on-demand once
        // '/articles/**': { static: true },

        // Set custom headers matching paths
        '/_nuxt/**': { headers: { 'cache-control': 's-maxage=0' } },
        // Render these routes with SPA
        '/app/**': { ssr: false },
        '/evaluate/**': { ssr: false },

        // Add cors headers
        '/api/**': { cors: true },

        // Add redirect headers
        // '/old-page': { redirect: '/new-page' },
        // '/old-page2': { redirect: { to: '/new-page', statusCode: 302 } }
    },
    app: {
        head: {
          charset: 'utf-8',
          viewport: 'width=device-width, initial-scale=1',
          link: [
            {
                rel: 'icon', type: 'image/x-icon', href: '/logo-light.png'
            },
            {
                rel: 'stylesheet',
                href: 'https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css'
            },
            {
                rel: 'preconnect',
                href: 'https://fonts.googleapis.com'
            },
            {
                rel: 'preconnect',
                href: 'https://fonts.gstatic.com'
            },
            {
                rel: 'stylesheet',
                href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
            },
          ],
          title: 'RecensioFy',
          meta: [
            { name: 'description', content: 'The web API for your reviews' }
          ],
        },
        pageTransition: { name: 'page', mode: 'out-in' },
    },
    modules: [
        '@nuxtjs/tailwindcss',
    ],
    runtimeConfig: {
        STATUS: process.env.STATUS,
        KEY: process.env.KEY,
        DB_USER: process.env.DB_USER,
        DB_PASS: process.env.DB_PASS,
        DB_NAME: process.env.DB_NAME,
        DB_PORT: process.env.DB_PORT,
        DB_HOST: process.env.DB_HOST,
        ADMIN_USR: process.env.ADMIN_USR,
        ADMIN_PWD: process.env.ADMIN_PWD,
        EMAIL_CLIENT_HOST: process.env.EMAIL_CLIENT_HOST,
        EMAIL_CLIENT_USER: process.env.EMAIL_CLIENT_USER,
        EMAIL_CLIENT_PASS: process.env.EMAIL_CLIENT_PASS,
        STRIPE_KEY: process.env.STRIPE_KEY,
        STRIPE_PRODUCT_SUB_ID: process.env.STRIPE_PRODUCT_SUB_ID,

        public: {
            DISCORD_SUPPORT_SERVER: process.env.DISCORD_SUPPORT_SERVER
        },
    },
    nitro: {
        plugins: [
            '~/server/plugins/dbconnection.ts',
        ]
    }
})