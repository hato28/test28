<template>
  <b-row class="m-0">
    <b-col
      class="px-0"
      cols="12"
      xl="12"
      lg="12"
      md="12"
      sm="12">
      <div v-html="video_script" class="iframe-container" v-if="video_type == 'default'">
      </div>
      <video-player
        v-else
        class="vjs-custom-skin"
        ref="videoPlayer"
        :options="options" 
        :playsinline="true"/>
    </b-col>
    <b-col
      cols="12"
      md="12"
      sm="12"
      class="p-0"
      v-if="announcement">
      <div class="announcement">
        <marquee> <p>{{ announcement }}</p></marquee>
      </div>
    </b-col>
  </b-row>
</template>
<script>
import MarqueeText from 'vue-marquee-text-component'
import Echo from '@/plugins/laravel-echo'
import { mapGetters } from 'vuex'
import { mixins } from './mixins'
export default {
  name: 'Live-Stream',
  mixins: [mixins],
   components: {
    MarqueeText
  },
  data () {
    return {
      loading: false,
      announcement: '',
      video_type: '',
      video_script: '',
      options: {
        autoplay: true,
        muted: true,
        controls: true,
        techOrder: ['html5'],
        sourceOrder: true,
        html5: { hls: { withCredentials: false } },
        sources: [],
        aspectRatio: '16:9',
        poster: require('~/assets/poster.png')
      },
    }
  },

  computed: {
    ...mapGetters({
      GET_ARENA_UPDATE: 'playing-status/GET_ARENA_UPDATE'
    })
  },

  async mounted () {
    await this.arenaAnnouncement()
    this.fetchRealTimeData()
    this.fetchLiveStream()
  },

  watch: {
    'GET_CURRENT_FIGHT.isNewFight' (val) {
      if (val === 'yes') {
        this.fetchArenaInfo(this.GET_ARENA_INFO.arenaId)
      }
    },
    immediate: true
  },

  methods: {
    fetchRealTimeData () {
      Echo.channel('betting').listen('ArenaUpdate', (data) => {
        this.announcement = data.data.announcement
        if (data.data.event === 'arenaopened') this.fetchLiveStream()
        if (data.data.event === 'arenaclosed') {
          this.SET_ARENA_INFO()
          this.options.sources = []
          if(window.location.pathname === '/dashboard'){
          location.reload();
          }
        }
        console.log(data.data.event)
      })
      Echo.channel('arena-list').listen('ArenaList', (data) => {
        // console.log(data)
      })
    },

    async arenaAnnouncement(){
      let response =  await this.API_GET({ url: '/dashboard' })
      this.announcement = response.data.arena.announcement
    },

  }
}
</script>
<style scoped>
.announcement {
  background-color: red;
  color: #fff;
  height: 30px;
  padding-top: 1px;
  padding-left: 7px;
}
</style>
<style>
.video-js .vjs-tech {
  height: 100% !important;
}

.vjs-poster {
  background-position: 50% 20% !important;
  background-size: cover !important;
  height: 100% !important;
}


.vjs-fullscreen-control.vjs-control.vjs-button{
  display: none !important;
}

.vjs-duration.vjs-time-control.vjs-control{
  display: none !important;
}

.vjs-time-control.vjs-time-divider{
  display: none !important;
}

.vjs-current-time.vjs-time-control.vjs-control{
  display: none !important;
}

.vjs-play-control.vjs-control.vjs-button.vjs-playing{
  display: none !important;
}

.vjs-text-track-display {
  height: 100%
}

.iframe-container {
height: auto !important;
position: relative;
width: 100%;
padding-top: 56.25%;
}

.wpcstream-iframe {
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
border:0px #ffffff none;
}
</style>