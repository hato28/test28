export default {
  SET_ADD_BET (state, payload) {
    const { amount, odd } = payload
    state.bets[odd].history.push({
      amount,
      date: new Date()
    })
    state.points -= amount
    state.bets[odd].total += amount
    state.odds[odd].addedPoints += amount
    state.odds[odd].total += amount
  },

  SET_TOKEN (state, token) {
    state.token = token
  },

  SET_PAGE_LOADING (state, bool) {
    state.pageLoading = bool
  }
}
