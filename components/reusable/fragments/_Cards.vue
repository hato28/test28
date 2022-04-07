<template>
  <b-card
    body-class="px-0"
    :img-src="image"
    img-alt="Card image"
    img-top>
    <slot />
  </b-card>
</template>
<script>
export default {
  name: 'Card',
  props: {
    image: {
      type: String,
      default: ''
    }
  }
}
</script>