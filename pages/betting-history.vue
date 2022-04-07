<template>
  <BettingHistory />
</template>
<script>
import BettingHistory from '~/components/modules/betting-history'
export default {
  name: 'Betting-History',
  middleware: 'routerGuard',
  components: {
    BettingHistory
  }
}
</script>
