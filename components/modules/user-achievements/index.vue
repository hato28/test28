<template>
  <div class="achievements-container">
    <div class="achievements-content">
      <NuxtLink class="back-home" to="/Dashboard">HOME</NuxtLink><span class="mx-2 gray-txt">/</span><span class="gray-txt">ACHIEVEMENTS</span>
      <div class="achievements-data">
        <p class="pt-3 title-txt mb-0">{{total_achieved}} OF {{total_achievement}} ACHIEVEMENTS UNLOCKED</p>
        <div v-for="(item, index) in userAchievements" :key="index">
          <div class="card-container">
            <div v-for="(category, secondindex) in item" :key="secondindex">
            <b-card no-body>
              <div v-for="(achievement, thirdindex) in category" :key="thirdindex">
              <div id="achievement_item">
                <div class="achievement-item-logo">
                  <div style="margin-top: 50%; padding-right:20px">
                    <b-icon icon="star-fill" font-scale="1"></b-icon>
                  </div>
                </div>
                <div id="achievement-item-contents">
                  <div class="achievement-title">{{achievement.achievement_name}}</div>
                  <div v-if="achievement.achievement_users[0].current_value != achievement.achievement_users[0].target_value" class="achievement-progress">{{achievement.achievement_users[0].current_value}}/{{achievement.achievement_users[0].target_value}}</div>
                  <div v-if="achievement.achievement_users[0].current_value == achievement.achievement_users[0].target_value" class="achievement-progress">
                    <b-icon icon="check-circle-fill" variant="success" font-scale="1"></b-icon>
                  </div>
                 <div class="achievement-description">{{achievement.description}}</div>
                </div>
                <div class="achievement-progressbar">
                  <b-progress :value="achievement.achievement_users[0].current_value" :max="achievement.achievement_users[0].target_value" variant="warning"></b-progress>
                </div>
              </div>
              </div>
            </b-card>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapMutations} from 'vuex'
export default {
  name: 'User-Achievements',
  data () {
    return {
      total_achievement: 0,
      total_achieved: 0,
      processed_achievements: [],
      userAchievements: []
    }
  },
  mounted () {
    this.getUserAchievements()
  },
  methods: {
    ...mapMutations({
      RESET_ACHIEVEMENT_BADGE:'playing-status/RESET_ACHIEVEMENT_BADGE'
      }),
    async getUserAchievements() {
      console.log("get user achievements")
      try {
        let response =  await this.API_GET ({
          url: '/achievement-service/my-achievements'
        })
        console.log("get user achievements")
        this.userAchievements = response.data.original.data
        this.RESET_ACHIEVEMENT_BADGE()
        // loop through achievements to sum up total count of achievements
        for (var values of response.data.original.data){
          for (var key in values){
            for (var prop in values){
              this.total_achievement +=values[prop].length
              this.processed_achievements.push(values[prop])
            }
          }
        }
        // loop trhrough the newly created array and sums up all achieved achievements by user
        for (var values of this.processed_achievements){
          for(var key in values){
            this.total_achieved += values[key].achievement_users[0].is_achieved
          }
        }
      }catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
<style scoped>
.achievements-container {
  background-color:white;
}
.achievements-content{
  margin-left: 10px;
  margin-right: 10px;
}
.back-home{
  color:#3851FF;
  font-size:13px;
  font-weight: bold;
}
.card-icon{
  margin-top:-10px
}
.card-container{
  padding-bottom: 10px;
}
#achievement_item {
    position: relative;
    margin-top: 10px;
    background-color: #F5F5F5;
    margin-top: -3px;
}
.achievement-item-logo{
    float: left;
    height: 60px;
    margin-left: 15px;
    padding-top: 2px;
}
.achievement-item-contents {
    position: relative;
}
.achievement-progress{
    float: right;
    
}
.achievement-progressbar{
    /* clear: both;
    vertical-align: bottom;
    width: 8%; */
    margin-right: 10px;
    margin-left: 0px;
    padding-bottom: 10px;
}

.achievement-description{
  padding-bottom: 5px;
}

.achievement-title{
  font-weight: bold;
  padding-top:5px;
  padding-left: 35px;
}

.achievement-progress{
  font-weight: bold;
  margin-right: 10px;
  font-size: 15px;
}

.title-txt{
  color:#2E3B59;
  font-size:13px;
  font-weight: bold;
  padding-bottom: 10px;
}
</style>