<template>
<b-row class="mx-0">
  <b-col
    cols="12"
    md="12"
    sm="12"
    class="text-center px-0">
    <p
      v-if="GET_CURRENT_FIGHT.winner && GET_ARENA_INFO.arenaId || GET_CURRENT_FIGHT.status === 'cancelled'"
      class="blink">
      <span>{{ (GET_CURRENT_FIGHT.status === 'cancelled' || GET_CURRENT_FIGHT.winner === 'draw') ? '' : 'Winner:' }}</span>
      <span
        :style="`color:${
          GET_CURRENT_FIGHT.winner === 'meron'
            ? '#F12C2C'
            : GET_CURRENT_FIGHT.winner === 'draw'
              ? '#016F4B'
              : GET_CURRENT_FIGHT.winner === 'wala'
                ? '#3751FF'
                : GET_CURRENT_FIGHT.winner === null
                  ? '#6c757d'
                  : ''
        }`">
        {{ GET_CURRENT_FIGHT.status === 'cancelled' ? 'CANCELLED' : GET_CURRENT_FIGHT.winner.toUpperCase() }}
      </span>
    </p>
  </b-col>
  <b-col
    cols="12"
    md="12"
    sm="12"
    class="mt-n2">
    <div v-if="showBetError"
      class="alert">
      <svg t="1619684330809" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2577" width="20" height="20" xmlns:xlink="http://www.w3.org/1999/xlink">
        <path d="M512 85.333333c-235.733333 0-426.666667 190.933333-426.666667 426.666667s190.933333 426.666667 426.666667 426.666667 426.666667-190.933333 426.666667-426.666667-190.933333-426.666667-426.666667-426.666667zM554.666667 725.333333l-85.333333 0 0-256 85.333333 0 0 256zM554.666667 384l-85.333333 0 0-85.333333 85.333333 0 0 85.333333z" p-id="2578" fill="#ffffff"></path>
      </svg>
      <small>All bets are closed, please wait for the next fight.</small>
    </div>
  </b-col>
  <b-col
    cols="4"
    md="4"
    sm="4"
    v-for="(item, index) in bettingList"
    :key="index">
    <b-button
      block
      :style="`border-color:${
        item.odd === 'meron'
          ? '#F12C2C'
          : item.odd === 'draw'
            ? '#026F4B'
            : '#3851FF'
      }`"
      :class="`${variant(item)}`"
      @click="placeBet(item)">
      <span class="bet-categories">{{ item.label }}</span>
    </b-button>
    <div class="mt-3">
      <div class="total-label">
      <p
        class="draw-label"
        v-if="item.odd === 'draw'">
        Draw wins x 8. Max. DRAW bet per player: 5000/fight
      </p>
      <h6 v-else class="mt-0">{{ currencyFormat(item.total).split('.')[0] }}</h6>
    </div>
    <div :class="{'bet-row': item.odd !== 'draw'}">
      <p>Bet</p>
      <h6
        class="mt-n3">
        <span>
          {{ 
            item.odd === 'meron'
              ? currencyFormat(item.meronBet).split('.')[0]
              : item.odd === 'draw'
                ? currencyFormat(item.drawBet).split('.')[0]
                : currencyFormat(item.walaBet).split('.')[0]
          }}
        </span>
        <span
          :style="`color: ${defineColor(item.odd)}`">
          {{ showBet(item) }}
        </span>
      </h6>
    </div>
    <div
      v-if="item.odd !== 'draw'"
      class="mt-3">
      <p>Payout</p>
      <h6 class="mt-n3">{{
        item.odd === 'meron'
          ? currencyFormat(item.meronOdds)
          : item.odd === 'draw'
            ? currencyFormat(item.drawOdds)
            : currencyFormat(item.walaOdds)
        }}
      </h6>
    </div>
    </div>
  </b-col>
  <BetSlip />
</b-row>
</template>
<script>
import BetSlip from './bet-slip'
import { mapMutations } from 'vuex'
import Echo from '@/plugins/laravel-echo'
export default {
  name: 'Bet-Categories',
  components: {
    BetSlip
  },

  data () {
    return {
      bettingList: {},
      showBetError: false
    }
  },

  watch: {
    'GET_CURRENT_FIGHT.open_bet' (val) {
      if (val === 'yes') this.showBetError = false
    },
    'GET_CURRENT_FIGHT.isNewFight' (val) {
      if (val === 'yes') {
        this.RESET_BET_AMOUNT()
        this.RESET_BETTING_INFO()
        this.setBettingValues()
      }
    }
  },

  async mounted () {
    await this.loadBets()
    this.setBettingValues()
    Echo.channel('betting').listen('BettingPosted', (data) => {
      this.SET_BETTING_INFO(data)
      this.setBettingValues()
    })
  },

  methods: {
    ...mapMutations({
      RESET_BET_AMOUNT: 'playing-status/RESET_BET_AMOUNT',
      RESET_BETTING_INFO: 'playing-status/RESET_BETTING_INFO',
    }),

    showBet (item) {
      let isShowOnClose = this.GET_CURRENT_FIGHT.open_bet === 'no' && this.GET_CURRENT_FIGHT.status === 'on-going' || this.GET_CURRENT_FIGHT.status === 'finished' || this.GET_CURRENT_FIGHT.status === 'cancelled'
      let meronOdds = item.meronOdds
      let walaOdds = item.walaOdds
      let meronBet = item.meronBet
      let drawBet = item.drawBet
      let walaBet = item.walaBet
      return item.odd === 'meron' && meronBet && isShowOnClose
        ? '=' + this.currencyFormat((meronOdds / 100) * meronBet)
        : item.odd === 'draw' && drawBet && isShowOnClose
          ? '=' + this.currencyFormat(drawBet * 8)
          : item.odd === 'wala' && walaBet && isShowOnClose
            ? '=' + this.currencyFormat((walaOdds / 100) * walaBet)
            : ''
    },

    defineColor (odd) {
      return odd === 'meron'
        ? '#F12C2C'
        : odd === 'wala'
          ? '#3851FF'
          : '#026F4B'
    },

    placeBet (item) {
      if (this.GET_CURRENT_FIGHT.open_bet === 'no') {
        this.showBetError = true
        setTimeout(() => {
          this.showBetError = false
        }, 2500)
        return false
      }
      this.$root.$emit('showPlaySlip', item)
    },

    async loadBets() {
      let response =  await this.API_GET({ url: '/dashboard' })
      try{
      let arena =  await this.API_GET({ url: '/dashboard/arenainfo/' + response.data.arena.id })
      let data = arena.data
      this.SET_BET_AMOUNT(arena.data.userCurrentBets)
      this.SET_ONLOAD_BETTING_INFO(arena.data.currentFight)
      }
      catch(error){
        console.log(error)
        this.RESET_BET_AMOUNT()
        this.RESET_BETTING_INFO()
      }
    },

    setBettingValues() {
      this.bettingList = {
        meron: {
          odd: 'meron',
          label: 'Meron',
          total: this.GET_BETTING_INFO.meron_bets,
          meronOdds: this.GET_BETTING_INFO.meron_odds,
          meronBet: this.GET_BET_AMOUNT.userMeronBets || 0
        },
        draw: {
          odd: 'draw',
          label: 'Draw',
          total: this.GET_BETTING_INFO.draw_bets,
          drawOdds: 0,
          drawBet: this.GET_BET_AMOUNT.userDrawBets || 0
        },
        wala: {
          odd: 'wala',
          label: 'Wala',
          total: this.GET_BETTING_INFO.wala_bets,
          walaOdds: this.GET_BETTING_INFO.wala_odds,
          walaBet: this.GET_BET_AMOUNT.userWalaBets || 0
        }
      }
    },

    variant (item) {
      if (this.GET_CURRENT_FIGHT.open_bet === 'no') return 'disable-color'
      switch (item.odd) {
        case 'meron':
          return 'meron'
        case 'wala':
          return 'wala'
        case 'draw':
        default:
          return 'draw'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.disable-color {
  background-color: #bcc4ca !important;
}
.winner {
  color: #3851FF !important;
  text-transform: uppercase;
}
.blink{
  margin-bottom: 20px;
  animation: blink 900ms linear infinite;
  margin-top: -5px;
  font-weight: bold;
}
@keyframes blink{
  30%{opacity: 0;}
  100%{opacity: 1;}
}
.alert {
  background-color: #3851FF;
  height: 40px;
  padding-top: 6px;
  padding-left: 4px;
  color: #fff;
  margin-bottom: 11px;
  border-radius: 3px;
  height: auto
}
h6{
  color: #2E3B59;
}
p{
  color: #2E3B59;
}
.draw-label {
  font-size: .8em;
  color: #026f4b;
}
.draw {
  background-color: #026F4B;
  color: #fff;
}
.meron {
  background-color: #F12C2C;
  border: 1px solid #F12C2C;
}
.wala {
  background-color: #3851FF;
  border: 1px solid #3851FF;
}
.bet-categories {
  text-transform: uppercase;
  font-weight: bold;
  font-size: .8em;
}
.bet-row {
  margin-top: 35px;
  
}
/* Small to Medium Tablet */
@media only screen and (max-width: 960px) and (min-width: 600px) {
  .bet-row {
    margin-top: 50px !important;
  }
  .draw-label {
    font-size: .6em !important;
  }
}
/* Small to Large Phones */
@media only screen and (max-width: 600px) and (min-width: 320px) {
  .draw-label {
    font-size: .7em !important;
  }
  .bet-row {
    margin-top: 0 !important;
  }
  .btn{
    padding: 0.375rem
  }
  .total-label{
    height: 5.2rem;
  }
}
</style>