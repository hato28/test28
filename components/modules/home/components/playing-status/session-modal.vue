<template>
  <b-modal
    v-model="showSessionTimer"
    size="sm"
    centered
    hide-footer
    hide-header>
    <b-row class="text-center p-3">
      <b-col
        cols="12"
        md="12"
        sm="12">
        <div>
          <img class="logo" src="~/assets/icons/logo.png" />
          <h5>Session Timeout</h5>
          <p class="session-message">Your betting session will timeout in</p>
        </div>
      </b-col>
      <b-col
        cols="12"
        md="12"
        sm="12">
          <h1 class="timer-count">{{countDown}} secs</h1>
      </b-col>

      <div class="mb-5">
        <p class="session-message">
          Tap <span class="msg-blue">PLACE BET NOW</span> and bet on <span class="msg-dark">MERON, DRAW</span>
          or <span class="msg-dark">WALA</span> to extend your session or tap <span class="msg-blue">LOG OUT</span>
          to exit the site.
        </p>
      </div>

      <div class="session-btn w-100">
        <b-button class="mr-2" @click="logout" variant="outline-dark">LOG OUT</b-button>
        <b-button @click="closeModal" variant="primary">PLACE BET NOW</b-button>
      </div>

    </b-row>
  </b-modal>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'
export default {
  name: 'Bet-Placed',
  data () {
    return {
      showSessionTimer: false,
      modalCloseCount: 0,
      countDown: 0,
      
    }
  },

  computed: {
      ...mapGetters({
      GET_SESSION_TIMEOUT: 'playing-status/GET_SESSION_TIMEOUT',
    }),
  },
  watch: {
    GET_SESSION_TIMEOUT: {
      handler (val) {
        if (val) {
          this.countDown = val
          }
      },
      deep: true
    }
  },
  methods: {
    ...mapMutations({
      SET_SESSION_TIMEOUT: 'playing-status/SET_SESSION_TIMEOUT',
      SET_SESSION_MINUTE: 'playing-status/SET_SESSION_MINUTE',
      SET_TOKEN: 'common/SET_TOKEN'
    }),

    closeModal () {
      this.showSessionTimer = false;
      this.modalCloseCount = 1;
    },

    async getSessionTimeOut(){
      this.countDown = this.GET_SESSION_TIMEOUT
      console.log(this.countDown)
      this.countdownTimer()
    },

    resetTimer(){
      this.countDown = this.GET_SESSION_TIMEOUT
      this.modalCloseCount = 0
    },

    countdownTimer(){
      if(this.countDown > 0){
        setTimeout(()=> {
          this.countDown --;
          this.countdownTimer();
          if (this.countDown <= 0) {
            this.SET_SESSION_TIMEOUT('');
            this.SET_SESSION_MINUTE('');
            this.logout();
          }
        }, 1000)
      }if(this.countDown < 60){
          if (this.modalCloseCount < 1) {
            this.showSessionTimer = true
          }
      }
    },


    getUpdatedTime () {
      // Fetch the updated date time if betting is succesful
      this.$root.$on('set-timer', (data) => {
        this.countDown = data
        this.modalCloseCount = 0
      });
    },

    async logout () {
      try {
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
    // storeSessionTime(){
    //   this.SET_SESSION_TIMEOUT(this.get)
    // }
  },

  created () {

    // window.addEventListener('beforeunload', this.storeSessionTime)
    this.getSessionTimeOut();
    this.getUpdatedTime()
  }
}
</script>
<style scoped>
h5{
  font-weight: bold;
  color: #000;
  margin: 10px;
  font-size: 1.7rem;
}

.label {
  color: #026F4B;
}

.logo{
  width: 100%;
  height: 80%
}

.timer-count {
  color: #2E3B59;
  font-weight: 700;
  font-size: 3.2rem;
  margin: 1.6rem 0;
}

.session-message {
  font-size: 1.2rem;
  margin-bottom: 0;
  color: #000;
}

.msg-blue {
  color: #3851FF;
  font-weight: 700;
}

.msg-dark {
  font-weight: 700;
  font-style: italic;
}

.session-btn button {
  font-weight: 500;
  padding: 1rem 1.2rem;
}
</style>
