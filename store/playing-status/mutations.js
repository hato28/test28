import state from "./state"

export default {
  SET_ARENA_INFO (state, data) {
    let hasData = Object.prototype.toString.call(data) === '[object Object]'
    state.arenaInfo = {
      arenaId: hasData ? data.id : '',
      title: hasData ? data.title.toUpperCase() : 'PREPARING NEXT EVENT.',
      dateTime: hasData ? this.$moment(data.date_opened).format('LL') : 'STANDBY FOR OUR NEXT EVENT!'
    }
  },

  SET_CURRENT_POINST (state, points) {
    state.currentPoints = points
  },

  SET_SESSION_TIMEOUT (state, timeout) {
    state.sessionTimeout = timeout
  },

  SET_SESSION_MINUTE (state, data) {
    state.sessionMinute = data
  },
  SET_PUSH_FIGHT_RESULTS (state, data) {
    if (data.data.status === 'finished' || data.data.status === 'cancelled') {
      var verifyForRedeclaration = state.fightResults.filter(num => num.fight_number == data.data.fight_number)
      if(verifyForRedeclaration.length > 0){
        // if redeclared
       let getIndex = state.fightResults.indexOf(verifyForRedeclaration[0])
       state.fightResults.splice(getIndex,1)
      }
      state.fightResults.push({
        fight_number: data.data.fight_number,
        status: data.data.status,
        waiting_decision: "no",
        winner: data.data.winner
      })
    }
  },

  SET_FIGHT_RESULTS (state, data) {
    state.fightResults = data
  },

  SET_CURRENT_FIGHT (state, data) {
    let fightData = data.data
    state.currentFight = {
      id: fightData.id,
      fight_number: fightData.fight_number,
      open_bet: fightData.open_bet,
      winner: fightData.winner,
      isNewFight: fightData.newFight,
      status: fightData.status,
    }
  },

  SET_ONLOAD_FIGHT (state, data) {
    let fightData = data
    state.currentFight = {
      id: fightData.id,
      fight_number: fightData.fight_number,
      open_bet: fightData.open_bet,
      winner: fightData.winner,
      isNewFight: fightData.newFight,
      status: fightData.status,
    }
  },

  SET_BETTING_INFO(state, data) {
    state.bettingInfo = {
      meron_odds: data.numerical.meron_odds || 0,
      meron_bets: data.numerical.meron_bets || 0,
      draw_bets: data.numerical.draw_bets || 0,
      wala_odds: data.numerical.wala_odds || 0,
      wala_bets: data.numerical.wala_bets || 0
    }
  },

  SET_ONLOAD_BETTING_INFO(state, data) {
    state.bettingInfo = {
      meron_odds: data.meron_odds || 0,
      meron_bets: data.meron_bets || 0,
      draw_bets: data.draw_bets || 0,
      wala_odds: data.wala_odds || 0,
      wala_bets: data.wala_bets || 0
    }
  },

  SET_BET_AMOUNT (state, data) {
    state.betAmounts = data
  },

  SET_WIN_STREAK(state, data){
    state.winStreak = data
  },

  SET_WIN_MODAL(state){
    state.showWinModal = true
  },

  SET_ACHIEVEMENT_BADGE(state){
    state.showAchievementBadge = true
  },

  SET_VIDEO_TOAST(state, data){
    state.videoToast = data
  },

  RESET_BET_AMOUNT (state) {
    state.betAmounts.userDrawBets = 0
    state.betAmounts.userMeronBets = 0
    state.betAmounts.userWalaBets = 0
  },

  RESET_BETTING_INFO(state) {
    state.bettingInfo.meron_odds = 0
    state.bettingInfo.meron_bets = 0
    state.bettingInfo.draw_bets = 0
    state.bettingInfo.wala_odds = 0
    state.bettingInfo.wala_bets = 0
  },

  RESET_CURRENT_FIGHT (state) {
    state.currentFight = {
      id: '',
      fight_number: '',
      open_bet: 'no',
      winner: '',
      isNewFight: '',
    }
  },
  RESET_FIGHT_RESULT(state,data){
    console.log('resetting fight list')
    state.fightResults = []
  },

  RESET_WIN_MODAL(state){
    state.showWinModal = false
  },
  RESET_ACHIEVEMENT_BADGE(state){
    state.showAchievementBadge = false
  },
}
