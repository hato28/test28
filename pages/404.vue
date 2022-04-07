<template>
  <Forbidden />
</template>
<script>
import Forbidden from '~/components/modules/forbidden';

export default {
  name: 'Error',
  middleware: 'routerGuard',
  components: {
    Forbidden
  }
}
</script>
