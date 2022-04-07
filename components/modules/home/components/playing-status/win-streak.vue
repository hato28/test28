<!--<template>
    <b-row class="mx-0">
        <b-col cols="12">
        <div class="streak-container">
            <div class="d-flex justify-content-center">
                <div class="streak-icon-container d-flex" v-for="(item,index) in 10" :key="index">
                    <img v-if="index < GET_WIN_STREAK.streak" class="streak-icon" src="~/assets/icons/icon-star-active.svg" />
                    <img v-else class="streak-icon" src="~/assets/icons/icon-star-inactive.svg" />
                    <div class="icon-number" style="position: absolute">{{index + 1}}</div>
                </div>
            </div>
        </div>
        </b-col>
    </b-row>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
    name: 'Win-Streak',
    data() {
    return{
        winStreakObject: [],
        }
    },
    computed: {
    ...mapGetters({
      GET_WIN_STREAK: 'playing-status/GET_WIN_STREAK',
        }),
    },
    watch: {
    GET_WIN_STREAK: {
      handler (val) {
        if (val) console.log(val)
      },
      deep: true
    }
    },
}

</script>
<style>
.streak-container{
    background: #F3F5F8;
    border-radius: 20px;
}
.streak-icon-container{
    margin: 5px;
    place-content: center;
    align-items: center;
}
.streak-icon{
    width: 100%;
    height: 100%;
}
.icon-number{
    font-size: 0.5em;
    color: #fff;
}
</style>-->