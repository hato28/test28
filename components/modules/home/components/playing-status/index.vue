<template>
<b-col
  class="d-flex play-status-container p-0"
  cols="12"
  lg="12"
  md="12"
  sm="12">
  <div class="play-status-flex sticky-container">
    <div class="sticky-container">
    <b-toast id="video-toast" body-class="video-toast-body" header-class="video-toast-header" no-close-button solid static >
    <img class="video-toast-icon" src="~/assets/icons/icon-video-warning.svg">
    <div>
    Press the play button immediately or refresh the page to avoid video stream delays.
    </div>
     <img @class="video-toast-icon" src="~/assets/icons/icon-toast-close.svg" @click="$bvToast.hide('video-toast')">
    </b-toast>
    <LiveStream />
    <b-row v-if="GET_ARENA_INFO.arenaId" class="m-0">
    <b-col cols="12" class="blackscreen-container py-2 px-1">
      <div class="d-flex">
        <div class="lbl-unique-username">{{unique_username}}</div>
        <div class="lbl-blackscreen">
          <div class="blackscreen-con" @click="displayModal=!displayModal">
            <div><img class="icon-question" src="~/assets/icons/icon-question.svg" alt=""></div>
            <div class="lbl-link">Having problems watching the video?</div> 
          </div>
        </div>
      </div>
    </b-col>
    </b-row>
    </div>

  <NoArena />
   </div>
   
  <div class="play-status-flex">   
  <!--
  <Cards v-if="singleStreak > 2 || totalStreak > 0">
    <WinStreak />
  </Cards>

  <div class="px-3 py-3" style="background:#fff;">
    <b-row>
      <b-col cols="6">
        <div class="lbl-sub">Streak Combo: {{totalStreak}} </div>
      </b-col>
      <b-col cols="6">
        <div class="d-flex">
          <div class="mr-2 lbl-sub">Win Streak Badge:</div>
          <div v-for="index in showNumStars" :key="index">
              <div v-if="totalStreak == 0 && singleStreak > 2">
                <img class="star-badge" src="~/assets/icons/icon-star-blue.svg" />
              </div>
              <div v-if="totalStreak == 1">
                <div v-if="singleStreak == 10">
                <img class="star-badge" src="~/assets/icons/icon-star-blue.svg" />
                </div>
                <div v-else>
                <img class="star-badge" src="~/assets/icons/icon-star-emerald.svg" />
                </div>
              </div>
              <div v-if="totalStreak == 2">
                <div v-if="singleStreak == 10">
                <img class="star-badge" src="~/assets/icons/icon-star-emerald.svg" />
                </div>
                <div v-else>
                <img class="star-badge" src="~/assets/icons/icon-star-ruby.svg" />
                </div>
              </div>
              <div v-if="totalStreak == 3">
                <div v-if="singleStreak == 10">
                <img class="star-badge" src="~/assets/icons/icon-star-ruby.svg" />
                </div>
                <div v-else>
                <img class="star-badge" src="~/assets/icons/icon-star-bronze.svg" />
                </div>
              </div>
              <div v-if="totalStreak > 3">
                <div v-if="singleStreak == 10">
                <img class="star-badge" src="~/assets/icons/icon-star-bronze.svg" />
                </div>
                <div v-else>
                <img class="star-badge" src="~/assets/icons/icon-star-gold.svg" />
                </div>
              </div>
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
  <WinModal :winCount="winCount"/>-->
  <b-row v-if="GET_ARENA_INFO.arenaId" class="m-0">
    <b-col
      cols="12"
      md="12"
      sm="12"
      class="px-0">
      <Cards class="transparent-bg">
        <b-row class="mt-n2 mx-0 play-status">
          <b-col
            cols="12"
            sm="12"
            md="12"
            class="pb-2"
            style="white-space: normal; border-bottom: 1px solid rgba(0, 0, 0, 0.125)">
            <div class="arena-title mb-2">{{GET_ARENA_INFO.title}}</div>
            <div class="arena-datetime">{{ GET_ARENA_INFO.dateTime }}</div>
            </b-col>
          <b-col
            cols="6"
            sm="6"
            md="6"
            class="py-2">
            <span class="fight-number">Fight #{{ GET_CURRENT_FIGHT.fight_number }}</span>
          </b-col>
          <b-col
            cols="6"
            sm="6"
            md="6"
            class="text-right py-2">
            <span class="betting-label">Betting: </span>
            <span class="betting-status" :style="`${GET_CURRENT_FIGHT.open_bet === 'yes' ? 'color: green' : 'color: red' }`">{{ GET_CURRENT_FIGHT.open_bet === 'yes' ? 'Open' : 'Closed' }}</span>
          </b-col>
          
        </b-row>
        <b-row class="mx-0">
          <b-col
            cols="12"
            sm="12"
            md="12"
            class="mt-3 px-0">
            <BetCategories />
          </b-col>
        </b-row>
      </Cards>
    </b-col>
    <b-col
      cols="12"
      sm="12"
      md="12"
      class="mt-2 px-0">
      <Cards class="no-border px-0">
        <FightTrends />
      </Cards>
    </b-col>
    <b-col
      cols="12"
      sm="12"
      md="12"
      class="mb-2 px-0">
      <b-card no-body class="no-border px-0 pb-3">
       <FightHistory/>
      </b-card>
    </b-col>
    <b-col
      cols="12"
      sm="12"
      md="12"
      class="mb-2 px-0">
    <FightSchedule v-if="GET_ARENA_INFO.arenaId"/>
    </b-col>
  </b-row>
  <SessionModal v-if="loadSession" />
  <VideoError :displayModal="displayModal"/>
  </div>
</b-col>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'
import BetCategories from './bet-categories'
import LiveStream from './live-stream'
import FightTrends from './fight-trends'
import FightHistory from './fight-history'
import SessionModal from './session-modal'
import VideoError from './video-error'
import NoArena from './no-arena'
//import WinStreak from './win-streak'
//import WinModal from './win-modal'
import Echo from '@/plugins/laravel-echo'
import FightSchedule from '../fight-schedule'
import Pusher from 'pusher-js'
import Vue from 'vue'
export default {
  name: 'Playing-status',
  components: {
    BetCategories,
    LiveStream,
    FightTrends,
    FightHistory,
    SessionModal,
    VideoError,
    //WinStreak,
    //WinModal,
    NoArena,
    FightSchedule
  },
  data () {
    return {
      betNames: ['meron', 'wala', 'draw', 'cancelled'],
      loadSession: false,
      displayModal:false,
      unique_username:'',
      winCount:0,
      totalWins:0,
      showNumStars:0,
      singleStreak:0,
      totalStreak: 0,
      channel_name: '',
      channelBind: '',
      sessionClear: false
    }
  },
  created() {
    //console.log('before create')
      this.RESET_FIGHT_RESULT()
      addEventListener('beforeunload', this.resetTimeOut)
      Echo.disconnect()
      //this.RESET_WIN_MODAL()
  },
  mounted () {
    if(this.GET_VIDEO_TOAST){
    this.$bvToast.show('video-toast')
    }
    this.SET_VIDEO_TOAST(false)
    window.dataLayer = [];
    this.$gtm.init('GTM-KK27D5R')
    this.$gtm.push({ event: 'ssr'})
    
    //console.log(this.$gtm,'gtm mounted')
    Echo.connector.options.host = Vue.$cookies.get('echo-host')
    Echo.options.host = Vue.$cookies.get('echo-host')
    Echo.connect()
    //this.getWinstreak()
    //console.log(Echo)
    //console.log('onLoad')
    this.userPoints()
    this.currentFight()
    this.getUniqueUsername()
    Echo.channel('betting').listen('FightUpdate', (data) => {
      this.userPoints()
      this.SET_CURRENT_FIGHT(data)
      this.SET_PUSH_FIGHT_RESULTS(data)
      //this.getWinstreak()
      //this.newAchievement()

      //console.log(data, 'fight data')
    })
  },
  /*
  computed: {
    ...mapGetters({
      GET_WIN_STREAK: 'playing-status/GET_WIN_STREAK'
      //GET_ACHIEVEMENT_BADGE: 'playing-status/GET_ACHIEVEMENT_BADGE'
    })
  },
  watch:{
    GET_WIN_STREAK: {
      handler (val) {
        if (val)
      },
      deep: true
    }
  },*/

  computed: {
    ...mapGetters({
      GET_SESSION_TIMEOUT: 'playing-status/GET_SESSION_TIMEOUT',
      GET_TOKEN: 'common/GET_TOKEN',
      GET_VIDEO_TOAST: 'playing-status/GET_VIDEO_TOAST'
    })
  },
  methods: {
    ...mapMutations({
      SET_PUSH_FIGHT_RESULTS: 'playing-status/SET_PUSH_FIGHT_RESULTS',
      //SET_WIN_STREAK: 'playing-status/SET_WIN_STREAK',
      //SET_WIN_MODAL: 'playing-status/SET_WIN_MODAL',
      //GET_WIN_STREAK: 'playing-status/GET_WIN_STREAK',
      //RESET_WIN_MODAL: 'playing-status/RESET_WIN_MODAL',
      RESET_CURRENT_FIGHT: 'playing-status/RESET_CURRENT_FIGHT',
      RESET_FIGHT_RESULT: 'playing-status/RESET_FIGHT_RESULT',
      SET_SESSION_TIMEOUT: 'playing-status/SET_SESSION_TIMEOUT',
      SET_SESSION_MINUTE: 'playing-status/SET_SESSION_MINUTE',
      SET_TOKEN: 'common/SET_TOKEN',
      SET_VIDEO_TOAST: 'playing-status/SET_VIDEO_TOAST'
      //SET_ACHIEVEMENT_BADGE: 'playing-status/SET_ACHIEVEMENT_BADGE',
    }),

    resetTimeOut(){
      this.SET_SESSION_TIMEOUT('')
    },
    async userPoints() {
    let response =  await this.API_GET({ url: '/user-data' })

    if (response.message == 'Success') {
      let data = response.data.current_points
      this.SET_CURRENT_POINST(data)
      try{
      this.channel_name = response.data.channel_name.clear_session.name
      this.channelBind = response.data.channel_name.clear_session.event
      }
      catch(e){}
      // this.loadSession = true;
      if(response.data.session_expiry == null){
        this.SET_SESSION_TIMEOUT("N/A")
        this.SET_SESSION_MINUTE("N/A")
      }
      else{
          var start_time = this.$moment().format('YYYY-MM-DD HH:mm:ss')
          var end_time = this.$moment(response.data.session_expiry)
          var remaining_time = this.$moment.duration(end_time.diff(start_time)).asSeconds()
          // localStorage.setItem('defaultTimeCount', time)
          // console.log(response)
          this.SET_SESSION_TIMEOUT(remaining_time)
          this.SET_SESSION_MINUTE(response.data.session_timeout)
      }
      this.loadSession = true;
      this.subscribe()
     }
    },
    subscribe (){
      console.log(this.GET_TOKEN)
      console.log(this.channelBind)
      console.log(this.channel_name)
      let pusher = new Pusher('caef908e7c2f81bc9282', {
        authEndpoint: Vue.$cookies.get('domain-address') + '/broadcasting/auth',
        auth: {
          headers: {
            'Authorization': `Bearer ${this.GET_TOKEN}`,
            'mini-app-version': process.env.miniAppVersion
          }
        },
        cluster: 'ap1'
      })
      var channel = pusher.subscribe(this.channel_name)
      channel.bind(this.channelBind,(data) =>{
        console.log(data, 'CleaSession result')
        this.clearSession = data.force_logout
        this.logout();
        // console.log(this.clearSession)

      });
      console.log(pusher, 'pusher')
      Pusher.log = function(message) {
        window.console.log(message)
      };
    },

    async currentFight(){
      let response =  await this.API_GET({ url: '/dashboard' })
      try{
      let arena =  await this.API_GET({ url: '/dashboard/arenainfo/' + response.data.arena.id })
      let data = arena.data
      this.SET_ONLOAD_FIGHT(arena.data.currentFight)
      }
      catch(error){
        console.log(error)
        if (error.data.message === 'No Current Fight') {
          this.RESET_CURRENT_FIGHT()
        }
        this.RESET_CURRENT_FIGHT()
      }
    },
    async getWinstreak(){
      let response =  await this.API_GET({ url: '/winstreak-service/getStreakCount' })
      // let response = {
      //   streak: 3,
      //   totalStreak: 1
      // }
      this.winCount = response.data.totalStreak * 10
      this.SET_WIN_STREAK(response.data)

      let streak = response.data.totalStreak * 10
      let total_streak = response.data.streak + streak;
      this.totalWins = total_streak
      this.singleStreak=response.data.streak
      this.totalStreak= response.data.totalStreak
      // this.showNumStars = Math.round(response.data.streak/2)
      this.showNumStars = response.data.streak > 5 ? 5 : response.data.streak
      if(total_streak % 10 == 0 && streak != 0 && response.data.streak != 0){
        this.SET_WIN_MODAL()
      }
      else{
        this.RESET_WIN_MODAL()
      }

      // console.log(response.data, 'this is winstreak')
      // console.log(this.GET_WIN_MODAL, 'getters of win streak')
    },
    async getUniqueUsername(){
        let response = await this.API_GET({
          url: Vue.$cookies.get('gcash_server') + '/get-unique-username'
        })
        this.unique_username = response.data?.unique_username
    },
    async newAchievement(){
      let response = await this.API_GET({
        url:'/achievement-service/new-achievements'
      })
      if (response.data.original.data.count > 0) {
        this.SET_ACHIEVEMENT_BADGE()
      }
    },
    async logout () {
      try {
        console.log("logging out")
        let response = await this.API_POST ({
          url: `/logout`,
        });

        // If response code is equal to 401/200 reload page
        if (response.code === 401 || response.code === 200) {
          // localStorage.removeItem('defaultTimeCount');
          Echo.disconnect()
          this.SET_SESSION_TIMEOUT('')
          this.SET_SESSION_MINUTE('')
          this.SET_TOKEN('')
          this.goTo('/404')
          // window.location.reload();
        }
      } catch (e) {
        if(e.data.code === 401){
          this.destroyToken(e)
        }
        console.log("error: ", e)
      }
    },
  }


}
</script>
<style scoped>
.no-border{
  border:none;
}
.fight-opened {
  font-weight: 500;
  font-size: 14px;
  margin: 0;
}
b{
  color: #2E3B59;
  font-weight: bold;
  font-size: .9em;
}
.current-points {
  border-top: 1px solid #cac9c9;
  border-bottom: 1px solid #cac9c9;
  padding: 10px 0px;
  text-align: center;
  margin-top: 10px;
}
.status-label {
  font-size: 11px;
}
.play-status {
  border-bottom: 1px solid #e1e0e0;
  font-weight: bold;
  white-space: nowrap;
}
.blackscreen-container{
  background-image: url("~/assets/icons/watermark-bg.png");
  border: solid 1px rgba(0, 0, 0, 0.125);
  border-bottom: none;
  border-radius: 3px;
}
.lbl-blackscreen{
  font-size: 12px;
  text-align: right;
  margin-left: auto;
}
.lbl-link{
  color: #3851FF;
  cursor: pointer;
  text-decoration: underline;
}
.icon-question{
  width: 15px;
  height: 15px;
  margin-right: 5px;
}
.blackscreen-con{
  display: flex;
  float: right;
}

.sticky-container {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 150;
  }
.play-status-flex{
  flex: 0 0 100%;
  max-width: 100%;
  
}
.fight-number{
  font-size: 14px;
}

.arena-datetime{
  font-size:14px;
  font-weight: 500;
  color: #5C6B77;
}

.arena-title{
  font-size: 14px;
  color: #5C6B77;
  font-weight: 500;
  text-transform: uppercase;
}
.betting-label{
  font-size:14px;
}
.betting-status{
  font-size: 14px;
}
.play-status-container{
  background-image: url("~/assets/icons/watermark-bg.png");
}

.transparent-bg{
  background: transparent;
}
@media (orientation: landscape){
  .play-status-flex{
    flex: 0 0 50%;
    max-width: 50%;
  }
}

@media (orientation: portrait){
  .play-status-container{
    margin: auto;
    flex-direction: column;
    align-content: stretch;
  }
}
@media (max-width: 575.98px) {
  .b-avatar {
    height: 1.5rem !important;
    width: 1.5rem !important;
    font-size: 0.675rem;
  }

  .b-avatar-text {
    font-size: 0.8rem;
  }

  .history-label {
    font-size: 10px;
  }
}

.lbl-unique-username{
  font-size: 12px;
  text-transform: uppercase;
  font-weight: bold;
}
.star-badge{
  width: 10px;
  position: relative;
  bottom: 7px;
}
.lbl-sub{
  font-size: 10px;
}
@media only screen and (min-width: 992px) {
  .play-status-flex{
    padding: 0px 10px;
  }
}

</style>
<style>
#video-toast{
  background-color: #D4AF37 !important;
  color: #fff;
  border-radius: 20px;
  font-size: 12px;
  top: 5%;
}
.video-toast-body{
  display: flex !important;
  padding: 10px;
}
.video-toast-icon{
  margin-right: 5px;
}
#video-toast > div {
    min-width: 320px !important;
}
</style>
