<template>
  <div class="odd-item">
    <b-button block class="odd-item__marker" :class="`${colorCode}`" @click="placeBet">{{ data.label }}</b-button>
    <Type subheading noMargin :color="colorCode" class="d-none d-sm-block">Total</Type>
    <Type v-if="data.odd  == 'draw'" bold  style="color: green">
    Draw wins x 8. Max. DRAW bet per player: 5000/fight
    </Type>
    <Type v-else bold heading :color="colorCode">
      <animated-number :value="data.total" :formatValue="$formatNumber" :duration="1000" :delay="2000" />
    </Type>
    <b-container>
    <Type subheading noMargin>Bet</Type>
    <Type bold heading>
      <animated-number :value="currentPoints" :formatValue="$formatNumber" :duration="1000" :delay="2000" />
    </Type>
    </b-container>
  
    <Type v-if="data.odd != 'draw'" subheading noMargin>Payout</Type>
    <Type v-if="data.odd != 'draw'" bold heading>{{ $formatNumber(data.payout) }}</Type>
  
    <!-- <b-button variant="success" pill class="odd-item__button" @click="placeBet">Bet {{ data.label }}</b-button> -->
  </div>
</template>
<script>
export default {
  data () {
    return {
      betplaced: false
    }
  },

  props: {
    data: {
      type: Object,
      required: true
    }
  },

  computed: {
    currentPoints () {
      return this.GET_BETS[this.data.odd].total
    },
    colorCode () {
      switch (this.data.odd) {
        case 'meron':
          return 'play-red'
        case 'wala':
          return 'play-blue'
        case 'draw':
        default:
          return 'play-green'
      }
    }
  },

  methods: {
    placeBet () {
      this.$root.$emit('showPlaySlip', this.data)
    }
  }
}
</script>

<style lang="scss" scoped>
.odd-item {
  position: relative;
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  &__marker {
    padding: 0.875rem;
    margin: 1rem auto;
    text-align: center;
    font-size: 0.875rem;
    font-weight: 700;
    text-transform: uppercase;
    border-radius: 0.5rem;
    box-shadow: 0 0.25rem 0.5rem rgba(0,0,0,0.2);
  }

  &__marker {
    &.play-red {
      background: $bet-red;
      border: 2px solid $bet-red-fade;
    }
    &.play-blue {
      background: $bet-blue;
      border: 2px solid $bet-blue-fade;
    }
    &.play-green {
      background: $bet-green;
      border: 2px solid $bet-green-fade;
    }
  }

  &__button {
    font-size: 0.875rem;
    font-weight: 700;
    text-transform: uppercase;
  }
  .btn-block{
    width: 75%;
  }
}

@media screen and (max-width: 414px) {
  .odd-item {
    text-align: center;
  }
}
</style>