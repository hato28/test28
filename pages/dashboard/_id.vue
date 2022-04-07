<template>
  <HomePage />
</template>
<script>
import HomePage from '~/components/modules/home'
export default {
  name: 'Home',
  middleware: 'routerGuard',
  components: {
    HomePage
  }
}
</script>
