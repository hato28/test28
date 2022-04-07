<!--<template>
    <b-container class="list-con" style="position:relative;">
            <b-row class="lbl-header">
                <b-col cols="2">Rank</b-col>
                <b-col cols="6" class="text-center">Player</b-col>
                <b-col cols="4">Bets Placed</b-col>
            </b-row>
            
            <b-row v-for="(item,i) in datalist.top_list" :key="i" 
                :class="`list-value ${item.rank == datalist.your_rank[0].rank ? `match-rank sticky-list ${rank_class}` : rank_class}`"
            >
                <b-col cols="2" class="rank-no">{{item.rank}}</b-col>
                <b-col cols="7">
                    <div class="d-flex" style="height:50px">
                        <div class="avatar-center"><b-avatar :src="item.avatar_location" size="30px"></b-avatar></div>
                        <div>
                            <div :class="item.streak_count == 0? 'd-flex mb-3': 'd-flex'">
                                <div v-for="(stars,index) in getStars(item.current_star_count)" :key="index">
                                    <b-avatar v-if="(item.streak_count*10) < 11" class="star-icons" src="~/assets/icons/icon-star-blue.svg" size="15px"></b-avatar>
                                    <b-avatar v-if="(item.streak_count*10) > 10 && (item.streak_count*10) < 21" class="star-icons" src="~/assets/icons/icon-star-emerald.svg" size="15px"></b-avatar>
                                    <b-avatar v-if="(item.streak_count*10) > 20 && (item.streak_count*10) < 31" class="star-icons" src="~/assets/icons/icon-star-ruby.svg" size="15px"></b-avatar>
                                    <b-avatar v-if="(item.streak_count*10) > 30 && (item.streak_count*10) < 41" class="star-icons" src="~/assets/icons/icon-star-bronze.svg" size="15px"></b-avatar>
                                    <b-avatar v-if="(item.streak_count*10) > 40" class="star-icons" src="~/assets/icons/icon-star-gold.svg" size="15px"></b-avatar>
                                </div>
                            </div>
                            <div class="font-weight-bold ml-2">{{item.codename}}</div>
                        </div>
                    </div>
                </b-col>
                <b-col cols="3" class="font-weight-bold">{{item.bet_count}}</b-col>
            </b-row>


            <b-row v-if="datalist.your_rank[0].rank > 100" class="list-value match-rank sticky-list bottom-list">
                <b-col cols="2" class="rank-no">{{datalist.your_rank[0].rank}}</b-col>
                <b-col cols="7">
                    <div class="d-flex" style="height:50px">
                        <div class="avatar-center"><b-avatar :src="datalist.your_rank[0].avatar_location" size="30px"></b-avatar></div>
                        <div>
                            <div :class="datalist.your_rank[0].streak_count == 0? 'd-flex mb-3': 'd-flex'">
                                <div v-for="(stars,index) in getStars(datalist.your_rank[0].current_star_count)" :key="index">
                                    <b-avatar v-if="datalist.your_rank[0].streak_count < 11" class="star-icons" src="~/assets/icons/icon-star-blue.svg" size="15px"></b-avatar>
                                    <b-avatar v-if="datalist.your_rank[0].streak_count > 10 && datalist.your_rank[0].streak_count < 21" class="star-icons" src="~/assets/icons/icon-star-emerald.svg" size="15px"></b-avatar>
                                    <b-avatar v-if="datalist.your_rank[0].streak_count > 20 && datalist.your_rank[0].streak_count < 31" class="star-icons" src="~/assets/icons/icon-star-ruby.svg" size="15px"></b-avatar>
                                    <b-avatar v-if="datalist.your_rank[0].streak_count > 30 && datalist.your_rank[0].streak_count < 41" class="star-icons" src="~/assets/icons/icon-star-bronze.svg" size="15px"></b-avatar>
                                    <b-avatar v-if="datalist.your_rank[0].streak_count > 40" class="star-icons" src="~/assets/icons/icon-star-gold.svg" size="15px"></b-avatar>
                                </div>
                            </div>
                            <div class="font-weight-bold">{{datalist.your_rank[0].codename}}</div>
                        </div>
                    </div>
                </b-col>
                <b-col cols="3" class="font-weight-bold">{{datalist.your_rank[0].bet_count}}</b-col>
            </b-row>
    </b-container>
</template>
<script>
export default {
    name:'TOP-BETTORS-COMPONENT',
    props:{
        datalist:{
            top_list:[],
            your_rank:[]
        },
        rank_class: ''
    },
    data() {
        return {
           
        }
    },
    watch:{
        datalist:{
            handler (val) {
                console.log(val,'props')
            },
            deep: true
        },
    },
    methods: {
        getStars(count){
            // let numStars = count % 10;
            // if(count == 0){ return count; }
            // return count == 0 || count > 5 ? 5 : count;
            return  count > 5 ? 5 : count;
        }  
    },
}
</script>
<style>

/* LIST */
.lbl-header{
    font-weight: bold;
    text-transform: uppercase;
    font-size: 12px;
    margin-top: 10px;
    margin-bottom: 15px;
}


.lbl-title{
    margin-top: 1rem;
    margin-bottom: 1rem;
    text-transform: uppercase;
    font-weight: bold;
}
.list-value{
    padding: 1.25rem 0rem;
    border-top: 1px solid #E8E9EC;
}

.rank-no{
    font-size: 23px;
    font-weight: bold;
    color: #C4C4C4;
}
.avatar-center{
    justify-content: center;
    align-items: center;
    display: flex;
    margin-right: 5px;
}
.star-icons{
    background-color: #fff0 !important;
}

.match-rank{
    background-color: #FFF9E8;
}

.sticky-list{
    position: -webkit-sticky;
    position: -moz-sticky;
    position: -o-sticky;
    position: -ms-sticky;
    position: sticky;
    z-index: 2;
}

.bottom-list{ bottom: 41px;}

.top-list{top:41px;}
</style>-->