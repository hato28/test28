<template>
  <div>
    <div
      v-if="GET_LOADING"
      class="page-loading">
      <b-spinner />
    </div>
    <div
      v-if="!GET_TOKEN && !GET_LOADING"
      class="error-page">
      <b-img class="logo" src="~/assets/icons/pitmasterslogo.png"></b-img>
      <h1>403</h1>
      <h3>Access Denied</h3>
      <p>
        Sorry, you do not have permission to access this page.
        Please login via Pitmasters mini app in GCash to enter the site.
      </p>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Unauthorized',
  computed: {
    ...mapGetters({
      GET_TOKEN: 'common/GET_TOKEN',
      GET_LOADING: 'common/GET_LOADING'
    })
  }
}
</script>
<style scoped>
.error-page {
  background: #fff;
  text-align: center;
  padding: 2rem;
  color: #000;
  height: 100vh;
}
.logo {
  height: 6rem;
}

.error-page h1 {
  color: #2E3B59;
  font-size: 4rem;
  font-weight: 700;
  margin: 0;
}

.error-page h3 {
  margin-bottom: 1.5rem;
  font-weight: 700;
}
</style>
