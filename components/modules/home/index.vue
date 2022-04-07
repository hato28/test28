<template>
<b-container fluid>
  <b-row>
    <PlayingStatus />
  </b-row>
</b-container>
</template>
<script>
import Subscribe from './components/subscribe'
import FightSchedule from './components/fight-schedule'
import PlayingStatus from './components/playing-status/index.vue'
export default {
  name: 'Home',
  components: {
    Subscribe,
    PlayingStatus,
    FightSchedule
  }
}
</script>