<template>
<div>
  <b-modal
    v-model="showPlaySlip"
    modal-class="playslip"
    @hidden="hidden"
    hide-footer
    hide-header>
    <h1>
      <span>
        Current Points:
        <b>{{ currencyFormat(GET_CURRENT_POINTS || 0)}}</b>
      </span>
    </h1>
    <h1>
      <span>
        Points After Bet:
        <b
          v-if="projectedPoints > 0"
          :class="{'negative-value': projectedPoints < 0}">
          {{ currencyFormat(projectedPoints) }}
        </b>
      </span>
    </h1>
    <b-input-group class="playslip-amount mt-3">
      <b-form-input
        v-model="formattedValue"
        :class="(!allowBet || (Number(betAmount) > 0 && Number(betAmount) < 100) ) ? 'form-control-err' : ''"
        min="0"
        step="1"
        maxLength="6"
        placeholder="Enter amount"
        :formatter="formatter"
        oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" />
      <b-input-group-append>
        <b-button
          variant="dark"
          @click="betAmount = null, formattedValue = null">
          Clear
        </b-button>
      </b-input-group-append>
    </b-input-group>
    <!-- ------------------------------ SPIELS ------------------------------ -->
     <b-row>
      <div
        v-if="!allowBet"
        :loading="true"
        class="text-min-spiels"
        @click="getMorePoints">
        Insufficient points. Go back to your Pitmasters mini app to top-up points.
      </div>

      <div v-if="Number(betAmount) > 0 && Number(betAmount) < 100" class="text-min-spiels">Minimum bet is 100</div>
    </b-row>
    <!-- ------------------------------ PREDIFINED AMOUNTS (BUTTON) ------------------------------ -->
    <div class="playslip-instabets" v-if="!isBetLimit">
      <b-button
        v-for="(ibet, i) in instaBets"
        :key="`instaBet_${i}`"
        :class="`playslip__instabet instabet-${placingOn.label} ${ibet === Number(betAmount) || placingOn.label === 'Draw' && instaBets <= 5000? 'playslip__instabet--selected '+placingOn.label : ''}`"
        :disabled="(ibet > GET_CURRENT_POINTS)"
        :style="(placingOn.label == 'Draw' && ibet > 5000)?'opacity:0.5':''"
        @click="(placingOn.label == 'Draw' && ibet > 5000)? betAmount = '':betAmount = ibet, formattedValue = instaBetformatter(ibet)">
       {{ $formatNumber(ibet) }}
      </b-button>
    </div>
    <div class="playslip-instabets" v-else>
      <b-button
        v-for="(ibet, i) in instaBets"
        :key="`instaBet_${i}`"
        :class="`playslip__instabet`"
        :disabled="true"
        style="opacity:0.5;">
       {{ $formatNumber(ibet) }}
      </b-button>
    </div>
    <!-- --------------------------------------  SUBMIT BTN -------------------------------------- -->
    <b-button
      v-if="!isBetLimit"
      block
      :class="placingOn.label"
      :disabled="!allowBet || betAmount < 100 || loading || this.placingOn.label == 'Draw' && betAmount > 5000"
      @click="placeBet">
      <span
        v-if="allowBet || parseFloat(betAmount >= 100) || GET_CURRENT_POINTS >= 100">
        <b-spinner
          v-if="loading"
          variant="light" />
        <span
          v-else
          class="label-bet">
          <!-- {{ betLabel }} -->
          Place bet on {{placingOn.label}}
        </span>
      </span>
    </b-button>

    <b-button
      v-else
      block
      :style='`background-color: #6c757d`'
      :disabled="true">
        <span
          class="label-bet">
          <!-- {{ betLabel }} -->
          Place bet on {{placingOn.label}}
        </span>
    </b-button>
    <!-- -------------------------------------- LABELS / SPIELS -------------------------------------- -->
    <!-- <b-button
      v-if="!allowBet"
      block
      variant="link"
      :loading="true"
      @click="getMorePoints">
      Go back to your Pitmasters mini app to top-up points.
    </b-button> -->
     <!-- <b-row v-if="Number(betAmount) > 0 && Number(betAmount) < 100">
      <div class="text-primary text-min-bet">Minimum bet is 100</div>
    </b-row> -->

    <!-- <b-row v-if="this.placingOn.label == 'Draw'">
      <div class="text-primary text-min-bet">Maximum bet is 5,000</div>
    </b-row> -->
     <b-row v-if="!isBetError">
      <div v-if="placingOn.label == 'Meron'" class="text-primary text-min-bet">Maximum bet for {{placingOn.label}} is 20,000</div>
      <div v-if="placingOn.label == 'Wala'" class="text-primary text-min-bet">Maximum bet for {{placingOn.label}} is 20,000</div>
      <div v-if="placingOn.label == 'Draw'" class="text-primary text-min-bet">Maximum bet for {{placingOn.label}} is 5,000</div>
    </b-row>
    <b-row v-if="isBetError">
        <div class="text-danger text-min-bet">{{betErrorMsg}}</div>
    </b-row>
  </b-modal>
  <BetPlaced
    v-if="showBetPlaced"
    @close="showBetPlaced = false"/>
</div>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'
import BetPlaced from './bet-placed'
export default {
  name: 'Bet-Slip',
  components: {
    BetPlaced
  },
  data () {
    return {
      loading: false,
      showPlaySlip: false,
      showBetPlaced: false,
      placingOn: {},
      betAmount: '',
      instaBets: [ 100, 200, 500, 700, 1000, 1500, 3000, 5000, 7000, 12000, 20000 ],
      isBetLimit:false,
      isBetError:false,
      betErrorMsg:'',
      formattedValue: '',
    }
  },

  computed: {
    ...mapGetters({
      GET_CURRENT_POINTS: 'playing-status/GET_CURRENT_POINTS',
      GET_SESSION_MINUTE: 'playing-status/GET_SESSION_MINUTE'
    }),

    variant () {
      return !this.allowBet
        ? '#6c757d'
        : this.betAmount < 100  || (this.placingOn.label === 'Draw' && this.betAmount > 5000)
          ? '#6c757d'
          : '#026F4B'
    },

    betLabel () {
       return this.GET_CURRENT_POINTS < 100
        ? 'Insufficient points'
        : this.betAmount > this.GET_CURRENT_POINTS
          ? 'Insufficient points'
          : this.betAmount < 100 && this.betAmount
            ? 'Insufficient bet'
            : ''

            // `Place bet on ${this.placingOn.label}`
    },

    allowBet () {
      return this.betAmount <= this.GET_CURRENT_POINTS
    },
    projectedPoints () {
      let GET_CURRENT_POINTS = 0
      if (this.betAmount) GET_CURRENT_POINTS = parseFloat(this.GET_CURRENT_POINTS - this.betAmount)
      return GET_CURRENT_POINTS
    }
  },

  watch:{
    betAmount: function(val){
      this.isBetError = false;
     if(parseInt(val) > 20000){
      this.betAmount = "20000"
     }
     //console.log(this.betAmount)
    }
  },
  created () {
    this.$root.$on('showPlaySlip', (data) => {
      this.showPlaySlip = true
      this.placingOn = data
      //console.log('data', data)
      /*
        check for limit bets
      */ 
      let isBetLimit = false;
      if(data.hasOwnProperty('meronBet') && data.meronBet == 20000){ isBetLimit = true;}
      else if(data.hasOwnProperty('walaBet') && data.walaBet == 20000){isBetLimit = true;}
      else if(data.hasOwnProperty('drawBet')  && data.drawBet == 5000){isBetLimit = true;}
      
      this.isBetLimit = isBetLimit;
      this.isBetError = false;

      // set Predefined Amounts
      if(data.label != 'Draw'){
        this.instaBets = [ 100, 200, 500, 700, 1000, 1500, 3000, 5000, 7000, 12000, 20000 ]
      }else{
        this.instaBets = [ 100, 200, 500, 700, 1000, 1500, 3000, 5000 ]
      }
    })
  },

  methods: {
    ...mapMutations({
      SET_ADD_BET: 'common/SET_ADD_BET',
      SET_SESSION_TIMEOUT: 'playing-status/SET_SESSION_TIMEOUT',
    }),
    isNumber(evt){
      const keysAllowed = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
      const keyPressed = evt.key;
      if (!keysAllowed.includes(keyPressed)) {
          evt.preventDefault()
      }
      return evt.charCode >= 48 && evt.charCode <= 57
    },
    hidden () {
      this.showPlaySlip = false
      this.placingOn = {}
      this.betAmount = null
      this.formattedValue = null
    },

    getMorePoints () {
      this.$root.$emit('showSignIn')
      this.hidden()
    },
    formatter(value) {
      this.betAmount = parseInt(value.replace(/\,/g, ''))
      return value.replace(/\D/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    },
    instaBetformatter(value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    async placeBet () {
      try {
        this.loading = true
        let response = await this.API_POST({
          url: '/dashboard/postbet',
          data: {
            side: this.placingOn.label.toLowerCase(),
            amount: this.betAmount,
            fightid: this.GET_CURRENT_FIGHT.id,
          }
        })
        let data = response.data
        //console.log(data,'data place bet')
        this.hidden()
        this.SET_BET_AMOUNT(data.userCurrentBets)
        this.SET_CURRENT_POINST(data.currentPoints)

        //Emit current date if betting successful (Session Timeout)
        if (response.message == 'Success') {
          setTimeout(() => {
            this.showBetPlaced = true;
          }, 2000);
        }
        try{
        if(this.GET_SESSION_MINUTE != 'N/A' || this.GET_SESSION_MINUTE != null || this.GET_SESSION_MINUTE != ''){
        let session_time = this.GET_SESSION_MINUTE * 60
        this.$root.$emit('set-timer', session_time);
          }
        }
        catch(e){}
      } catch (error) {
        // this.$swal({
        //   icon: 'error',
        //   title: 'Error',
        //   text: error.data.data.msg,
        // })
        this.isBetError = true
        this.destroyToken(error)
        this.betErrorMsg = error.data.data.msg
      } finally { this.loading = false }
    }
  }
}
</script>
<style lang="scss" scoped>
.label-bet {
  text-transform: uppercase;
}
.negative-value {
  color: red !important;
}
.text-min-bet{
  width: 100%;
  text-align: center;
  margin-top: 10px;
}
.text-min-spiels{
  position: relative;
  width: 90%;
  font-size: 12px;
  color: #D83818;
  top: -10px;
  left: 15px;
}
.form-control-err{
  color: #D83818;
  border-color: #D83818;
}
.playslip {
  & h1 {
    font-size: 1.25rem;
    margin: 2px;
    text-align: left;
    text-transform: uppercase;
    color: $blue-dark;
    & > span {
      & > b {
        color: #026F4B;
      }

      & > small {
        color: $grey;
      }
    }
  }
  &-amount {
    margin-bottom: 0.75rem;
  }
  &-instabets {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
  }
  &__instabet {
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
    border: 1px solid #026F4B;
    color: #026F4B;
    background: transparent;
    margin-left: 2px;
    margin-right: 2px;
    padding: 6px;
    width: 75px;
    height: 35px;

    &.disabled,
    &:disabled {
      opacity: 0.3;
    }

    &--selected {
      &,
      &:focus {
        box-shadow: none;
        outline: none;
        background-color: #026F4B;
        color: $white;
      }
    }
  }
  &__cta {
    background: $green;
    color: $white;
    text-transform: uppercase;
    border: 2px solid $green-fade;
    padding: 0.75rem;
    font-weight: 700;
    border-radius: 0.5rem;

    &:disabled {
      background: grey;
      border: none;
      opacity: 0.3;
    }
  }
  .Meron{
    background-color: #F12C2C;
    border: 1px solid #F12C2C !important;
    color: #FFF !important;
  }
  .Draw{
    background-color: #016F4B;
    border: 1px solid #026f4b !important;
    color: #FFF !important;
  }
  .Wala{
    background-color: #3751FF;
    border: 1px solid #3851FF !important;
    color: #FFF !important;
  }
  .instabet-Meron{
    color: #2B3345 ;
    border: 1px solid #2B3345 ;
  }
  .instabet-Draw{
    color: #2B3345 ;
    border: 1px solid #2B3345 ;
  }
  .instabet-Wala{
    color: #2B3345 ;
    border: 1px solid #2B3345 ;
  }

}
</style>
