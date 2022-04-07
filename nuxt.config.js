export default {
  ssr: false,
  target: 'static',
  env:{
    miniAppVersion: process.env.MINI_APP_VERSION
  },
  gtm: {
    // id: 'GTM-KK27D5R',
    enabled: true,  // Used as fallback if no runtime config is provided
    //debug: true,
  },
  publicRuntimeConfig: {
    gtm: {
      // id: 'GTM-KK27D5R',
      // id:'GTM-NCG88PP',
      // respectDoNotTrack: true,
    }
  },
  head: {
    title: 'Pitmasters',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: './favicon.ico' },
      { rel: 'icon', type: 'image/png', href: './favicon-32x32.png' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;800&family=Mulish:wght@400;600;700&display=swap' }
    ],
    // script: [
    //   {
    //     src: "https://cdn.jsdelivr.net/npm/hls.js@latest"
    //   }
    // ]
  },
  css: [
    '@/assets/designsystem.scss'
  ],
  styleResources: {
    scss: [
      '@/assets/*.scss'
    ]
  },
  plugins: [
    '@/plugins/utils.js',
    '@/plugins/animated-numbers.js',
    '@components/reusable',
    '@/plugins/vuex-persist',
    '@mixins',
    '@/plugins/video',
    '@plugins/clipboard',
    '@/plugins/vue-cookies',
    '@/plugins/gtm'
  ],
  components: true,
  buildModules: [
    //'@nuxtjs/google-analytics'
  ],
  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
    'vue-sweetalert2/nuxt',
    'nuxt-socket-io',
    'nuxt-moment',
    'sha1',
    '@nuxtjs/gtm'
  ],
  bootstrapVue: {
    icons: true
  },
  axios: {
    baseURL: ''
    //baseURL: process.env.NODE_ENV !== 'production' ? 'https://staging-wpit-api.dsg.technology/api' : 'https://staging-wpit-api.dsg.technology/api'
    //baseURL: process.env.NODE_ENV !== 'production' ? 'https://api-dashboard.wpc2039.live/api' : 'https://api-dashboard.wpc2039.live/api'
    //baseURL: process.env.NODE_ENV !== 'production' ? 'https://api-pitmasters.dsg.technology/api' : 'https://api-pitmasters.dsg.technology/api'
  },
  pwa: {
    manifest: {
      lang: 'en'
    }
  },
  build: {
    filenames: {
      img: 'img/[name].[ext]'
    },
    extend(config, context) {
      // relative links, please.
      console.log('CONFIG, CONTEXT', config, context)
      if (!context.isDev) {
        config.output.publicPath = './_nuxt/'
      }
      return config
    }
  }
}
