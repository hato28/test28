import { mapMutations } from 'vuex'
export const mixins = {
  methods: {
    ...mapMutations({
      RESET_CURRENT_FIGHT: 'playing-status/RESET_CURRENT_FIGHT',
      SET_FIGHT_RESULTS: 'playing-status/SET_FIGHT_RESULTS',
    }),

    async fetchLiveStream () {
      try {
        this.loading = true
        let response = await this.API_GET({ url: '/dashboard' })
        //console.log(response,'test')
        let data = response.data
        this.SET_ARENA_INFO(data.arena)
        this.SET_FIGHT_RESULTS(data.fightResults)
        this.fetchArenaInfo(data.arena.id)
        this.video_type = response.data.arena.video_type
        if (response.message === 'No open arena') {
          this.hasArena = false
          this.RESET_CURRENT_FIGHT()
          return
        }
        if (data.arena.video_type == "hls"){
        this.options.sources = [{
          withCredentials: false,
          // type: 'application/x-mpegURL',
          type: "video/mp4",
          src: response.data.arena.video_script
        }]
        }
        if(data.arena.video_type == "default"){
          this.video_script = data.arena.video_script
        }

      } catch (error) {
        this.destroyToken(error)
        this.loading = false
      }
    },

    async fetchArenaInfo (id) {
      if (!id) return
      try {
        let response = await this.API_GET({ url: `/dashboard/arenainfo/${id}` })
        let data = response.data
        this.arenaInfo = data.arena
        this.SET_CURRENT_POINST(data.currentPoints)
        this.SET_BETTING_INFO(data.currentFight)
        this.SET_CURRENT_FIGHT(data.currentFight)
        this.SET_BET_AMOUNT(data.userCurrentBets)
      } catch (error) {
        if (error.data.message) {
          if (error.data.message === 'No Current Fight') {
            this.RESET_CURRENT_FIGHT()
          }
        }
        this.destroyToken(error)
      }
    }
  }
}
