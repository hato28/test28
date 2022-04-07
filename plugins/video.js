import Vue from 'vue'
import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
// import 'videojs-contrib-hls/dist/videojs-contrib-hls'
import 'videojs-contrib-hls.js/src/videojs.hlsjs'
import pkg from '../package.json'
Vue.use(VueVideoPlayer)
console.log(`${pkg.name} v${pkg.version} is running`)