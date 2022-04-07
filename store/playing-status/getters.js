export default {
  GET_ARENA_UPDATE: state => state.arenaUpdate,
  GET_CURRENT_POINTS: state => state.currentPoints,
  GET_CURRENT_FIGHT: state => state.currentFight,
  GET_BETTING_INFO: state => state.bettingInfo,
  GET_BET_AMOUNT: state => state.betAmounts,
  GET_ARENA_INFO: state => state.arenaInfo,
  GET_FIGHT_RESULTS: state => state.fightResults,
  GET_WIN_STREAK: state => state.winStreak,
  GET_WIN_MODAL: state => state.showWinModal,
  GET_ACHIEVEMENT_BADGE: state => state.showAchievementBadge,
  GET_SESSION_TIMEOUT: state => state.sessionTimeout,
  GET_SESSION_MINUTE: state => state.sessionMinute,
  GET_VIDEO_TOAST: state => state.videoToast
}
