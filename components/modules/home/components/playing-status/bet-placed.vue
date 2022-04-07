<template>
  <b-modal
    v-model="showPlacedBet"
    @shown="closingSoon"
    size="sm"
    hide-footer
    hide-header>
    <b-row>
      <b-col
       cols="12"
       md="12"
       sm="12"
       class="text-center">
        <svg
          width="50"
          height="50"
          viewBox="0 0 98 88"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M96.939 12.358L83.968 0.958986C83.57 0.606986 83.041 0.427986 82.519 0.464986C81.99 0.499986 81.496 0.742986 81.146 1.14199L34.1 54.688L17.372 32.547C17.053 32.125 16.578 31.846 16.053 31.774C15.529 31.696 14.994 31.838 14.572 32.159L0.794003 42.567C-0.0869973 43.233 -0.261997 44.487 0.404003 45.368L31.378 86.364C31.74 86.843 32.3 87.135 32.9 87.157C32.924 87.157 32.949 87.157 32.973 87.157C33.547 87.157 34.095 86.911 34.476 86.477L97.12 15.18C97.85 14.351 97.769 13.086 96.939 12.358Z" fill="#026F4B"/>
        </svg>
        <p class="label">Bet Placed!</p>
      </b-col>
    </b-row>
  </b-modal>
</template>
<script>
export default {
  name: 'Bet-Placed',
  data () {
    return {
      showPlacedBet: true,
    }
  },

  methods: {
    closingSoon () {
      setTimeout(() => {
        this.$emit('close')
      }, 1000);
    }
  }
}
</script>
<style scoped>
.label {
  color: #026F4B;
}
</style>