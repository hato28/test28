<template>
  <b-modal
    v-model="show"
    @shown="$emit('close')"
    size="sm"
    hide-footer
    hide-header>
    <slot />
  </b-modal>
</template>
<script>
export default {
  name: 'Bet-Placed',
  data () {
    return {
      show: true,
    }
  }
}
</script>
<style>
.modal-dialog {
  top: 13% !important;
}
</style>