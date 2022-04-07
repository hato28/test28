<!--<template>
    <div class="main-container">
        <b-container>
            <NuxtLink class="back-home" to="/Dashboard">HOME</NuxtLink>
            <span class="mx-2 gray-txt">/</span><span class="gray-txt">TOP BETTORS</span>
            
            <div class="lbl-title">Top Bettors</div>
            <b-tabs v-model="tabIndex" pills card>
                <b-tab title="ALL TIME" class="active-tab">
                    <topBettor :datalist="allDatalist" :rank_class="rank_class"/>
                </b-tab>
                <b-tab title="DAILY">
                    <topBettor :datalist="dailyDatalist" :rank_class="rank_class"/>
                </b-tab>
                <b-tab title="WEEKLY">
                    <topBettor :datalist="weeklyDatalist" :rank_class="rank_class"/>
                </b-tab>
                <b-tab title="MONTHLY">
                    <topBettor :datalist="monthlyDatalist" :rank_class="rank_class"/>
                </b-tab>
            </b-tabs>


        </b-container>
    </div>
</template>
<script>
import topBettor from '../components/modules/top-bettors/topbettorsComponent.vue'
export default {
    name:'top-bettors',
    middleware: 'routerGuard',
    components:{
        topBettor:topBettor
    },
    data() {
        return {
            tabIndex:0,
            allDatalist:{
                top_list:[],
                your_rank:[
                    {
                        rank:0,
                        avatar_location:'',
                        bet_count:0,
                        codename:'',
                        streak_count:0
                    }
                ]
            },
            dailyDatalist:{
                top_list:[],
                your_rank:[
                    {
                        rank:0,
                        avatar_location:'',
                        bet_count:0,
                        codename:'',
                        streak_count:0
                    }
                ]
            },
            weeklyDatalist:{
                top_list:[],
                your_rank:[
                    {
                        rank:0,
                        avatar_location:'',
                        bet_count:0,
                        codename:'',
                        streak_count:0
                    }
                ]
            },
            monthlyDatalist:{
                top_list:[],
                your_rank:[
                    {
                        rank:0,
                        avatar_location:'',
                        bet_count:0,
                        codename:'',
                        streak_count:0
                    }
                ]
            },
            curr_rank : 0,
            rank_class: 'bottom-list'
        }
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
        this.getBettorList()
       
    },
     destroyed () {
        window.removeEventListener('scroll', this.handleScroll);
    },
    watch:{
        tabIndex: function(data){
            switch(data){
                case 0:
                    this.curr_rank = this.allDatalist.your_rank[0].rank
                break;
                case 1:
                    this.curr_rank = this.dailyDatalist.your_rank[0].rank
                break;
                case 2:
                    this.curr_rank = this.weeklyDatalist.your_rank[0].rank
                break;
                case 3:
                    this.curr_rank = this.monthlyDatalist.your_rank[0].rank
                break;
            }
            this.rank_class = 'bottom-list'
            window.scrollTo(0,0)
            window.removeEventListener('scroll', this.handleScroll);
            window.addEventListener('scroll', this.handleScroll);
        }
    },
    methods: {
       handleScroll (event) {
            let element = document.querySelector(".list-con");
            let height = element.offsetHeight;

            
            var y = window.scrollY;

            let curr_rank = this.curr_rank * (height/115)

            let rank_class = 'bottom-list'

            if(y > (curr_rank + 50)){
                rank_class = 'top-list'
            }
           
            this.rank_class = rank_class
        },
        async getBettorList(){
            /*
                api/leaderboard/top-bettors/daily
                /daily
                /weekly
                /monthly
                /all-time
            */
            let alltimeData = await this.API_GET({
                url: '/leaderboard-service/top-bettors/all-time'
            }).catch(e =>{})

            let dailyData = await this.API_GET({
                url: '/leaderboard-service/top-bettors/daily'
            }).catch(e =>{})

            let weeklyData = await this.API_GET({
                url: '/leaderboard-service/top-bettors/weekly'
            }).catch(e =>{})

            let monthlyData = await this.API_GET({
                url: '/leaderboard-service/top-bettors/monthly'
            }).catch(e =>{      })


            this.curr_rank = alltimeData.data.your_rank[0].rank ? alltimeData.data.your_rank[0].rank : 0
            
            if(alltimeData.data.your_rank.length == 0){
                alltimeData.data.your_rank=[
                    {  rank:0, avatar_location:'',  bet_count:0,  codename:'',  streak_count:0}
                ]
            }
            if(dailyData.data.your_rank.length == 0){
                dailyData.data.your_rank=[
                    {  rank:0, avatar_location:'',  bet_count:0,  codename:'',  streak_count:0}
                ]
            }
            if(weeklyData.data.your_rank.length == 0){
                weeklyData.data.your_rank=[
                    {  rank:0, avatar_location:'',  bet_count:0,  codename:'',  streak_count:0}
                ]
            }
            if(monthlyData.data.your_rank.length == 0){
                monthlyData.data.your_rank=[
                    {  rank:0, avatar_location:'',  bet_count:0,  codename:'',  streak_count:0}
                ]
            }
            
            this.allDatalist = alltimeData.data
            this.dailyDatalist = dailyData.data
            this.weeklyDatalist = weeklyData.data
            this.monthlyDatalist = monthlyData.data
        },
    },
}
</script>
<style>
.nav-pills .nav-link.active{
    color: #fff !important;
    border-radius: 25px;
}
.tab-pane{
    padding-left: 0px !important;
    padding-right: 0px !important;
}

</style>
<style scoped>
.main-container{
    background-color: #fff;
    padding-bottom: 10%;
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

.title-txt{
  color:#2E3B59;
  font-size:13px;
  font-weight: bold;
}

</style>-->