<!--<template>
    <b-card v-if="GET_WIN_MODAL" body-class="win-modal-background">
        <b-col class="text-center" cols="12">
        <div style="position: absolute; right: 0;">
            <img src="~/assets/icons/icon-close.svg" @click="closeWinModal">
        </div>
        <div class="win-modal-desc p-1">CONGRATULATIONS! YOU HAVE</div> 
        <div class="win-modal-count">
            <span>+{{winCount}} WINS</span>
            <span style="color: #000">IN A ROW</span>
        </div>
        <div class="win-modal-img mt-2">
            <img class="fire-icon" src="~/assets/icons/icon-fire.png">
            <div class="halfclip">
            </div>
        </div>

        </b-col>
    </b-card>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'
export default {
    name: 'Win-Modal',
    data() {
      return {}
    },
    props: {
      winCount: {
        type: Number,
        default: 0
      },
    },
    computed:{
      ...mapGetters({
        GET_WIN_MODAL: 'playing-status/GET_WIN_MODAL',
        }),
    },
    methods:{
      ...mapMutations({
        RESET_WIN_MODAL: 'playing-status/RESET_WIN_MODAL',
        }),

      closeWinModal(){
          this.RESET_WIN_MODAL()
      }
    }
}
</script>

<style>
.halfclip{
  content:'asdasd';
  width:120px;
  height:120px;
  border: 6px solid transparent;
  border-bottom-color:#FE4F60;
  border-left-color: #FE4F60;
  transform:rotate(-145deg);
  border-radius:50%;
  animation:rotate 2s infinite linear;
}

@keyframes rotate{
  0%{
    transform:rotate(-45deg)
  }
  100%{
    transform:rotate(315deg)
  }
}

.win-modal-desc{
  font-size:12px;
  font-weight: bold;
}

.win-modal-count{
  font-size:12px;
  font-weight: bold;
  color: #FE4F60;
}
.win-modal-background {
  background-image: url(~/assets/icons/win-modal-bg.svg)
}
.win-modal-img{
    justify-content: center;
    place-items: center;
    display: flex;
}
.fire-icon{
    position: absolute;
    width: 80px;
}
</style>-->