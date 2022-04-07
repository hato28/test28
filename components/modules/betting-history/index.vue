<template>
<Cards class="m-2">
  <div class="bet-history-con">
    <!-- <p class="back-home" @click="goTo('/dashboard')"><img class="mr-2 mb-1 back-img" src="~/assets/icons/back-btn.svg"/>BACK TO HOME</p> -->
    <NuxtLink class="back-home" to="/Dashboard">HOME</NuxtLink><span class="mx-2 gray-txt">/</span><span class="gray-txt">EVENTS</span>
    <p class="pt-3 select-event-txt mb-0">SELECT EVENT</p>
    <p class="mb-4 warning-txt text-secondary">The logs will reset every Thursday.</p>
    <b-container class="bv-example-row">

  <b-row class="pb-2">
    <b-col cols="8" class="pl-0 pr-1">
      <span class="event-txt mb-2">EVENT</span>
    </b-col>
    <b-col class="pr-0">
      <span class="event-txt text-right mb-2 view-text" > VIEW </span>
    </b-col>
  </b-row>
  <b-row
    class="event-item"
    v-for="(item, index) in bettingHistory"
    :key="index">
    <b-col cols="8" class="pl-0 pr-1">
      <p class="event-txt mb-0">{{ item.arena.title }}</p>
      <p class="event-date mt-0">{{ $moment(item.arena.created_at).format('LLL') }}</p>
      </b-col>
    <b-col class="pr-0 text-right">
      <NuxtLink :to="{ path: '/arena-logs?id=' + item.id}">
        <b-button variant="primary" size="sm">View Logs</b-button>
      </NuxtLink>
    </b-col>
  </b-row>
</b-container>
  </div>
  </Cards>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'Betting-history',
  data () {
    return {
      test: false,
      //domain: 'https://api.wpc2039.live',
      betHistoryApi: 'api/',
      itemsPerPage: 10,
      pages: 3,
      bettingHistory: [],
    }
  },

  computed: {
    ...mapGetters({
      GET_BET_HISTORY: 'bettingHistory/GET_BET_HISTORY'
    })
  },

  mounted() {
    this.fetchHistory();
  },

  methods: {
    async fetchHistory() {
      try {
        let response = await this.API_GET({
          // url: `${this.domain}/${this.betHistoryApi}
          // ?items_per_page=${this.itemsPerPage}&page=${this.pages}`
          url: '/dashboard/betting-history-event',
          params: {
            items_per_page: this.itemsPerPage,
            pages: this.pages
          }
        })

        //console.log("fetchHistory response?? ", response)
        let data = response.data.history.data;

        this.bettingHistory = data;



      } catch (e) {
        console.log("error: ", e)
      } finally {
        //console.log("finally")
      }

    },

    goToHome(){
      this.$router.push({
          path: '/',
        });
    },
  }
}
</script>
<style scoped>
.stat-txt{
  font-size:11px;
  color: #000000;
}
.event-txt{
  color:#2E3B59;
  font-size:13px;
  font-weight: 500;
}
.event-date{
  color:#2E3B59;
  font-size:10px;
}
.back-img{
  height: 15px;
  width: 15px;
}
.back-home{
  color:#3851FF;
  font-size:13px;
  font-weight: bold;
}
.gray-txt{
  color:#707070;
  font-size:13px;
  font-weight: bold;
}
.select-event-txt{
  color:#2E3B59;
  font-size:13px;
  font-weight: bold;
}
.bet-history-con{
  background-color: white;
}
.upperCase{
  text-transform: uppercase;
}
.action-txt{
  color: #FFFFFF;
  font-size:13px;
  float: right;
  background-color: #3851FF;
  border-radius: 7px;
  padding: 6px 13px 6px 13px;
  border: none;
}
.view-text {
  float: right;
}
.event-item {
  border-bottom: 0.5px solid #EFF3F9;
  padding: 0.7rem 0 0;
}
@media screen and (max-width: 600px) {
  .action-txt{
    font-size:11px;
  }
  .back-home{
    font-size:11px;
  }
  .select-event-txt{
    font-size:11px;
  }
  .date-txt{
    font-size: 9px;
  }
  .event-txt{
    font-size:11px;
  }
  .event-date{
    font-size:9px;
  }
  .warning-txt {
    font-size: 9px;
  }
}
</style>
