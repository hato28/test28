<template>
<div>
  <div class="water-mark">
    <aside>{{unique_username}}</aside>
  </div>
  <Cards class="m-2 pt-0 px-2">
    <NuxtLink class="back-btn" to="/Dashboard">HOME</NuxtLink><span class="mx-2 gray-txt" >/</span><NuxtLink class="back-btn" to="/betting-history">EVENTS</NuxtLink><span class="mx-2 gray-txt">/</span><span class="gray-txt">EVENT DETAILS</span>
    <p class="mb-4 pt-3 select-event-txt">EVENT DETAILS</p>
    <!-- <p class="event-txt mb-2">EVENT</p> -->
    <b-row>
      <b-col cols="8" class=" pr-1">
        <p class="event-txt mb-0">{{bettingHistory.title}}</p>
        <p class="event-date mt-0">{{$moment(bettingHistory.date_opened).format('LLL')}}</p>
      </b-col>
  </b-row>
  </Cards>

    <Cards class="m-2 pt-0 px-2">
    <p class="event-txt mb-2">STATISTICS</p>
    <b-row>
    <b-col class=" ">
      <p class="event-txt text-right mb-2">AMOUNT</p>
    </b-col>
    <b-row class="p-0 m-0"
        cols="12"
        sm="12"
        md="3">
          <b-col class="stat-txt pt-2 pb-2">INITIAL POINT</b-col>
          <b-col class="text-right init-point pt-1 pb-1 mr-2">{{formatPrice(initialPoint)}}</b-col>
        <div class="line-border mx-3"></div>
          <b-col class="stat-txt pt-2 pb-2">TOTAL WIN</b-col>
          <b-col class="text-right tot-win pt-1 pb-1 mr-2">{{formatPrice(totalWin)}}</b-col>
        <div class="line-border mx-3"></div>
          <b-col  class="stat-txt pt-2 pb-2">TOTAL LOSE</b-col>
          <b-col class="text-right tot-lost pt-1 pb-1 mr-2">{{formatPrice(totalLost)}}</b-col>
        <div class="line-border mx-3"></div>
          <b-col  class="stat-txt pt-2 pb-2">ENDING OVERALL TOTAL</b-col>
          <b-col class="text-right end-overall-tot pt-1 pb-1 mr-2">{{formatPrice(overallTotal)}}</b-col>
        <div class="line-border mx-3"></div>
          <b-col  class="stat-txt pt-2 pb-2">DIFFERENCE(WIN-LOSE)</b-col>
          <b-col class="text-right diff-winlost pt-1 pb-1 mr-2">{{formatPrice(totalWin - totalLost)}}</b-col>
        <div class="line-border mx-3"></div>
    </b-row>
  </b-row>
  </Cards>

  <Cards class="m-2 pt-0 px-2">
    <p class="event-txt mb-4">BET LOGS</p>
    <b-pagination
      v-model="page"
      :total-rows="rows"
      :per-page="1"
      @input="fetchStatistic(page)"
      aria-controls="my-table"
    ></b-pagination>
    <b-row>
        <b-col cols="5" class="event-txt pt-2 pb-2">BET</b-col>
        <b-col class="event-txt pt-2 pb-2">STATUS</b-col>
        <b-col class="text-right event-txt pt-2 pb-2">AMOUNT</b-col>
    </b-row>
    <b-row
      v-for="(item, index) in betLogs"
      :key="index">
      <b-col cols="5" class="stat-txt pt-2 pb-2">
        <p class="m-0"><span class="t-fight-no">#{{item.fight.fight_number}} = </span>
        <span :class="item.fight.winner + '-txt'">{{item.fight.winner != null ? item.fight.winner : 'CANCELLED'}}</span>
        <p class="date-txt">{{$moment(item.fight.created_at).format('LLL')}}</p>
      </b-col>
      <b-col class="text-left pt-1 pb-1">
        <p class="m-0 upperCase status-txt">{{item.status}}</p>
        <p class="bet-txt">BET:
            <span>{{ formatPrice(item.amount)}}</span>
            ON <span class="upperCase"> {{item.side}}</span></p>
      </b-col>
      <b-col class=" text-right pt-1 pb-1">
        <!-- <div v-if="item.status = 'lost'" class="tot-lost"> -->
        <div v-if="item.payout <= 0 && item.status == 'lost'"
                   class="tot-lost">
          <span> {{formatPrice(item.payout - item.amount)}}</span>
        </div>
        <!-- <div v-else-if="item.status = 'win'" class="tot-win"> -->
        <div v-if="item.payout > 0" class="tot-win">
            <span> +{{formatPrice(item.payout - item.amount)}}</span>
        </div>
         <div v-else-if="item.status == 'cancelled' ||
            item.status == 'unmatched' || item.status == 'draw'" class="canc-txt">
            <img style="padding-bottom: 4px" src="~/assets/icons/cancelsign.svg">
            <span> {{formatPrice(item.amount)}}</span>
        </div>

      </b-col>
      <div class="line-border mx-3"></div>
    </b-row>
    <!-- <b-row>
        <BettingLogs />
  </b-row> -->
  </Cards>
  </div>
</template>
<script>
import BettingLogs from '~/components/modules/betting-logs'
import Vue from 'vue'
export default {
  name: 'Betting-History',
  props: {
    betlogs: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      //domain: 'https://api.wpc2039.live',
      itemsPerPage: 30,
      page: 1,
      rows: 1,
      bettingStats: [],
      bettingHistory: [],
      betLogs: [],
      initialPoint: 0,
      totalWin: 0,
      totalLost: 0,
      overallTotal: 0,
      unique_username:''
    }
  },
  middleware: 'routerGuard',
  components: {
    BettingLogs
  },
  mounted() {
    this.getUniqueUsername()
    //console.log("????", this.$route.params.id)
    
    this.fetchStatistic();
  },
  methods: {
    async fetchStatistic(page=1) {
      try {
        let response = await this.API_GET({
          url: '/dashboard/betting-history-event/' + this.$route.query.id + '?page=' + page
        })
        this.rows = response.data.betlogs.last_page
        this.bettingStats = response.data;
        this.bettingHistory = response.data.arena

        this.initialPoint = this.bettingStats.history.current_points;
        this.totalWin  = this.bettingStats.stats.totalWin != null ? this.bettingStats.stats.totalWin : 0;
        this.totalLost = this.bettingStats.stats.totalLost != null ? this.bettingStats.stats.totalLost : 0;

        let totalDeposit = this.bettingStats.loadingStats.totalDeposit != null ? this.bettingStats.loadingStats.totalDeposit : 0;
        let totalWithdrawal = this.bettingStats.loadingStats.totalWithdrawal != null ? this.bettingStats.loadingStats.totalWithdrawal : 0;
        this.overallTotal = this.bettingStats.history.current_points + this.totalWin + totalDeposit - this.totalLost - totalWithdrawal;
        // bet logs
        this.betLogs = response.data.betlogs.data;
        //console.log("bet logs " , this.betLogs)
      } catch (e) {
        console.log("error: ", e)
      } finally {
        //console.log("finally")
      }

    },
    formatPrice(value) {
        let val = (value/1).toFixed(2).replace(',', '.')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    },
    async getUniqueUsername(){
        let response = await this.API_GET({
          url: Vue.$cookies.get('gcash_server') + '/get-unique-username'
        })
        
        this.unique_username = response.data?.unique_username
     
    }
  }
}
</script>
<style scoped>
/* @media (max-width: 575.98px) {
  *{
    font-size: 11px !important;
  }
} */

.back-btn {
  color:#3851FF;
  font-size:13px;
  font-weight: bold;
}
.gray-txt{
  color:#707070;
  font-size:13px;
  font-weight: bold;
}

.card-body {
  padding: .70rem;
}
.select-event-txt{
  color:#2E3B59;
  font-size:11px;
  font-weight: bold;
}
.event-txt{
  color:#2E3B59;
  font-size:11px;
  font-weight: bold;
}
.event-date{
  color:#2E3B59;
  font-size:9px;
  font-weight: 600;
}
.stat-txt{
  font-size:11px;
  color: #000000;
  font-weight: 600;
}
.t-fight-no{
  color:#000000;
  font-size:13px;
  font-weight: 600;
}
.init-point{
  color: #898989;
  font-size:11px;
  font-weight: 600;
}
.tot-win{
  color: #026F4B;
  font-size:11px;
  font-weight: 600;
}
.canc-txt{
  color: #000000;
  font-size:11px;
  font-weight: bold;
}
.upperCase{
  text-transform: uppercase;
}
.tot-lost{
  color: #C30501;
  font-size:11px;
  font-weight: 600;
}
.end-overall-tot{
  color: #3851FF;
  font-size:11px;
  font-weight: 600;
}
.diff-winlost{
  color: #3851FF;
  font-size:11px;
  font-weight: 600;
}
.wala-txt{
  color:#3851FF;
  font-weight:bold;
  text-transform: uppercase;
  font-size:13px;
}
.meron-txt{
  color: #C30501;
  font-weight:bold;
  text-transform: uppercase;
  font-size:13px;
}
.draw-txt{
  color: #026F4B;
  font-weight:bold;
  text-transform: uppercase;
  font-size:13px;
}
.cancelled-txt{
  color: #000000;
  font-weight:bold;
  text-transform: uppercase;
  font-size:13px;
}

.null-txt{
  color: #000000;
  font-weight:bold;
  text-transform: uppercase;
  font-size:13px;
}

.status-txt{
  color:#2E3B59;
  font-size:13px;
  font-weight:500;
}
.win-txt{
  color: #026F4B;
  font-size:13px;
  font-weight: bold;
}
.lost-txt{
  color: #C30501;
  font-size:13px;
  font-weight: bold;
}
.bet-txt{
color: #026F4B;
font-size:12px;
font-weight:600;
}
.line-border{
border-bottom:1px #EDF3FB solid;
width:90%;
}

.water-mark{
  position: fixed;
  z-index: 2;
  width: 30px;
  transform: rotate(45deg);
  right: 67%;
  bottom: 60%;
  font-size: 43px;
  font-weight: bold;
  color: #C0C0C03D;
}
</style>
