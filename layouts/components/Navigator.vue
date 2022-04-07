<template>
 <header :class="`theme theme${GET_MODE ? '--dark' : '--default'}`">
  <b-navbar toggleable type="light" variant="light">
    <b-navbar-brand
        href="#"
        class="wpit-nav-brand"
        :class="`theme theme${GET_MODE ? '--dark' : '--default'}`">
        <b-row style="align-items: center">
          <!-- <b-navbar-toggle v-on:click="navCollapse = !navCollapse" target="nav-collapse"></b-navbar-toggle> -->
          <b-navbar-toggle  
           target="nav-text-collapse"
           @click="navCollapse = !navCollapse">
          </b-navbar-toggle>
          <img class="logo" src="~/assets/icons/pitmasterslogo.png" />
<!--
          <div class="points-container">
            <div class="points">
              <div class="current-points">
              <b>{{ currencyFormat(GET_CURRENT_POINTS) }}</b>
              <div class="points-label">Current Points</div>
               </div>
              <img src="~/assets/icons/money-gold.svg" />
              <div class="icon-container">
              <img class="icon-topup" src="~/assets/icons/gcash-logo.png" @click="goToGcashApp" /> 
               </div>
            </div>
          </div>-->
        <div id="profile-item">
          <div id="profile-details" class="mx-2">
            <!--<div class="profile-name">{{username}}</div>-->
            <!-- <img src="../../../assets/icons/money-gold.svg" /> -->
            <div class="profile-points">
            
              <img style="margin-bottom: 3px" src="~/assets/icons/ico-plus.svg" @click="goToGcashApp" /> 
              {{ currencyFormat(GET_CURRENT_POINTS) }} 
              <img style="margin-bottom: 3px; width: 10px" src="~/assets/icons/ico-coin.png" />
            </div>
          </div>
          <!--
          <NuxtLink to="/profile-settings">
          <div class="profile-avatar">
            <b-avatar class="profile-picture" :src="`${avatar}`"></b-avatar>
          </div>
          </NuxtLink>-->
        </div>
        </b-row>
      </b-navbar-brand>

    <b-collapse
      id="nav-collapse"
      v-model="navCollapse"
      :class="`theme theme${GET_MODE ? '--dark' : '--default'}`">
      <b-navbar-nav>
        
        <b-nav-item
            v-for="item in navItems"
            :key="item.name"
            :to="item.route"
            class="wpit-nav-item"
            @click="navCollapse = false"  >
          {{ item.name }}
        </b-nav-item>
        <!--
        <b-nav-item
            class="wpit-nav-item">
            <b-nav-item-dropdown text="Leaderboards" right>
              <div class="sub-item" @click="goTo('/topbettors')">Top Bettors</div>
            </b-nav-item-dropdown>
        </b-nav-item>

        <b-nav-item
            class="wpit-nav-item">
              <div class="user-achievement-nav">
                <div @click="goTo('/user-achievements')" id="user-achievement-nav-name">Achievements</div>
              </div>
              <div v-if="GET_ACHIEVEMENT_BADGE" style="margin: -5px 0px 0px 90px;"><b-icon icon="circle-fill" variant="danger" font-scale="0.5"></b-icon></div>
        </b-nav-item>-->
         <!-- <LoginModal /> -->
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
  </header>
</template>
<script>
import { mapGetters } from 'vuex'
import LoginModal from '~/components/modules/login/index.vue'
export default {
  name: 'Navigation',
  components: {
    LoginModal
  },
  data () {
    return {
      navCollapse: false,
      showTooltip:true,
      username: '',
      avatar:'',
      navItems: [
        { name: 'Home', route: '/dashboard' },
        { name: 'Betting History', route: '/betting-history' },
        //{name: 'Profile Settings', route: '/profile-settings'},
      ],
    }
  },

  async created(){
   // await this.getProfile()
  },

  computed: {
    checked: {
      get () {
        return this.GET_MODE
      },
      set () {
        this.$store.commit('toggleDarkMode')
      }
    },
    ...mapGetters({
      GET_MODE: 'common/GET_MODE',
      GET_CURRENT_POINTS: 'playing-status/GET_CURRENT_POINTS',
      //GET_ACHIEVEMENT_BADGE: 'playing-status/GET_ACHIEVEMENT_BADGE'
    }),
  },
  methods: {
    goToGcashApp(){
      window.location.href = "https://miniprogram.gcash.com/s01/iQE1Rc";
    },
    /*
    async getProfile(){
      try{
        let response =  await this.API_GET ({ 
          url:'/avatar/get-details'
        })
        this.avatar = response.data.avatar_location
        this.username = response.data.username
        //console.log(response)
      }catch (error){
        console.log(error)
      }
    },*/
    goTo(link){
      this.navCollapse =false
      this.$router.push(link)
    }
  },
}
</script>

<style lang="scss" scope>
nav {
  background-color: #ffff;
  // height: 70px;
  box-shadow: 3px -2px 6px 0px #7777;
}

.logo {
  height: 38px;
  margin-top: 1px;
  margin-left: 5px;
}
.points-container {
  position: absolute;
  right: 10px;
  text-align: right;
}
.points {
  font-size: 18px;
  color: #98710B;
  margin: auto;
  position: relative;
  display: flex
}
.points-label {
  text-align: right;
  font-size: 11px;
  text-transform: uppercase;
  color: #2E3B59;
  margin-left: auto; 
  margin-right: 0;
}
.nav-link{
  font-size: 11px;
  color: #2E3B59!important;
  text-transform: uppercase;
  font-weight: bold
}
.navbar-toggler{
  margin-left: 15px;
  padding: 8px 4px;
  
}

.navbar-toggler-icon{
  width: 20px;
  height: 20px;
}


// tooltip topup
.icon-topup{
  margin-left: 4px;
  margin-top: 2px;
  padding: 4px;
  height: 35px;
  width: 35px;
}
.tooltip-topup{
  position: absolute;
  width: 150px;
  height: 100px;
  color: #fff;
  text-align: center;
  border-radius: 5px;
  border-width:16px 14px 10px;

  right: 15px;
  top: 25px;
  z-index: 1;
}
.tooltip-topup{
  content: ' ';
	bottom: -20px;
	border: 12px solid;
  border-bottom:0px !important;
  border-left:transparent;
	border-color: #ffffff #3851ff transparent transparent;
}
.tooltip-container{
  background-color: #3851FF;
  width: 160px;
  height: 100%;
  padding: 10px 9px 0 9px;
  border-radius: 5px;
  white-space: normal;
}
.tooltip-text{
  text-align: left;
  font-size: 12px;
  color:white;
  white-space: normal;
  word-spacing: 2px;
}
.tooltip-btn-gotIt{
  // position: absolute;
  // width: 100%;
  bottom: 5px;
  text-align: right;
  text-decoration: underline;
}
.icon-container{
  align-self: center;
}
.current-points{
  text-align: right;
  line-height: normal;
}
.callout {
  position: relative;
  right: -7px;
  top: -8px;
}

.bubble {
  top: -8px;
  right:1px;
  z-index: 100;
  width: 160px;
  border-radius: 5px;
  padding: .5em;
  margin: 2em auto;
  white-space: normal;
  box-sizing: border-box;
  position: absolute;
  background: #3851FF;
  text-align: center;
  font-size: 12px;
}

.triUp {
  width: 0;
  height: 0;
  border-top: 15px solid transparent;
  border-right: 11px solid transparent;
  border-bottom: 15px solid #3851FF;
  border-left: 11px solid transparent;
  top: -6px;
  position:absolute;
}
.profile-avatar{
   font-size: 18px;
  color: #98710B;
  margin: auto;
  position: relative;
  display: flex
}

#profile-item{
  display: flex;
  position: absolute;
  right: 10px;
  text-align: right;
}
#profile-details {
  position: relative;
  align-self: center;
}
.profile-name {
  font-size: 11px;
  color: #2E3B59!important;
  text-transform: uppercase;
  font-weight: bold
}
.profile-points {
  font-size: 12px;
  color: #98710B;
  text-align: right;
}
.profile-picture{
  width: 30px;
  height: 30px;
}

// SPRINT
#nav-collapse{
  width: 100%;
}
.sub-item {
  font-size: 11px;
  width: 100%;
  padding-left: 20px;
}

.dropdown-menu.dropdown-menu-right{
  border: none;
  background: #fff0;
}

.notification-badge{
  margin-top: -45px; 
  margin-left: -5px
}
#achievement-badge {
 margin-bottom: -13px;
 padding-top: 0px;
 margin-left: 6%
}
.user-achievement-nav {
  position: relative;
}
#user-achievement-nav-name {
  float: left;
}
// .user-achievement-badge-container {
//   position: relative;
// }
// #user-achievement-badge {
//   margin-t
// }
</style>
