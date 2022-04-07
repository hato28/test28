<template>
  <h1 class="manrope" :style="{ 'font-size': size }"><span>PLAY</span>.ONL/NE</h1>
</template>
<script>
export default {
  props: {
    size: {
      type: String,
      default: '1.75rem'
    }
  }
}
</script>
<style lang="scss" scoped>
h1 {
  font-weight: 600;
  text-transform: uppercase;
  margin: 0;
  & > span {
    font-weight: 800;
  }
}
</style>