<template>
<div style="width:100%;">
    <b-col class=" ">
    <b-row>
        <b-col class="event-txt pt-2 pb-2">BET</b-col>
        <b-col class="event-txt pt-2 pb-2">STATUS</b-col>
        <b-col class="text-right event-txt pt-2 pb-2">AMOUNT</b-col>
    </b-row>
    </b-col>
    <b-row class="p-0 m-0"  v-for="(item, index) in GET_BET_HISTORY"
    :key="index">
        <b-col class="stat-txt pt-2 pb-2">
             <p class="m-0"><span class="t-fight-no">#{{item.fightNo}} = </span>
          <span class="meron-txt" v-if="item.betName == 'Meron'">{{item.betName}}</span>
          <span class="wala-txt" v-if="item.betName == 'Wala'">{{item.betName}}</span>
        <span class="cancelled-txt" v-if="item.betName == 'Cancelled'">{{item.betName}}</span></p>
           <p class="date-txt">{{item.date}}</p>
        </b-col>
        <b-col class="text-left pt-1 pb-1">
            <p class="m-0">
            <span class="status-txt" v-if="item.betName == 'Cancelled'">{{'CANCELLED'}}</span>
            <span class="status-txt" v-if="item.isWin == true && item.betName != 'Cancelled'">{{'WON'}}</span>
            <span class="status-txt" v-if="item.isWin == false && item.betName != 'Cancelled'">{{'LOST'}}</span>
            </p>
          <p class="bet-txt">BET:{{item.betTotal}} ON <span class="upperCase">{{item.betName}} </span></p>
        </b-col>
        <b-col class=" text-right pt-1 pb-1">
            <span v-if="item.betName == 'Cancelled'" class="cancelled-txt"><img src="~/assets/icons/cancel.svg">{{item.amount}}</span>
            <span v-if="item.isWin == true && item.betName != 'Cancelled'" class="win-txt">+{{item.amount}}</span>
            <span v-if="item.isWin == false && item.betName != 'Cancelled'" class="lost-txt">-{{item.amount}}</span>
        </b-col>
        <div class="line-border mx-3"></div>
    </b-row>
</div>
<!-- <div>
    <h1>{{ GET_TEST }}</h1>
    <b-btn @click="changeValue">Change Value</b-btn>
    <b-btn @click="testMe('Test')">test</b-btn>
  </div> > -->
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'Betting-history',
  data () {
    return {
      test: false
    }
  },

  computed: {
    ...mapGetters({
      GET_BET_HISTORY: 'bettingHistory/GET_BET_HISTORY'
    })
  },

   methods: {
      goToHome(){
      this.$router.push({
          path: '/',
        });
    },
  //   ...mapMutations({
  //     GET_BET_HISTORY: 'bettingHistory/GET_BET_HISTORY',
  //   }),
  // }

  //   // changeValue () {
  //   //   this.test = !this.test
  //   //   this.SET_TEST(this.test)
  //   // }
   }
}
</script>
<style scoped>
.event-txt{
  color:#2E3B59;
  font-size:13px;
  font-weight: 500;
}
.event-date{
  color:#2E3B59;
  font-size:10px;
}
.select-event-txt{
  color:#2E3B59;
  font-size:13px;
  font-weight: bold;
}
.upperCase{
  text-transform: uppercase;
}
.t-fight-no{
  color:#000000;
  font-size:13px;
  font-weight: 600;
}
.meron-txt{
  color:#3851FF;
  font-weight:bold;
  text-transform: uppercase;
  font-size:13px;
}
.wala-txt{
  color: #C30501;
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
.date-txt{
  font-weight: 600;
  font-size: 12px;
}
@media screen and (max-width: 600px) {

.win-txt{
  font-size:11px;
}
.lost-txt{
  font-size:11px;
}

.t-fight-no{
  font-size:11px;
  
}
.meron-txt{
  font-size:11px;
}
.wala-txt{
  font-size:11px;
}
.cancelled-txt{
  font-size:11px;
}
.status-txt{
  font-size:11px;
}
.select-event-txt{
  font-size:11px;
}
.date-txt{
  font-size: 9px;
}
.bet-txt{
font-size:9px;
font-weight:600;
}
.event-txt{
  font-size:11px;
}
.event-date{
  font-size:9px;
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
}
.stat-txt{
  font-size:11px;
  color: #000000;
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
.line-border{
border-bottom:1px #EDF3FB solid;
width:90%;
}
}
</style>
