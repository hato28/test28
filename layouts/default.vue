<template>
<div>
  <Navigator v-if="GET_TOKEN"/>
  <Middleware />
  <Nuxt
    v-if="!GET_LOADING && GET_TOKEN"
    class="mt-2"/>
  <Footer v-if="GET_TOKEN"/>
</div>
</template>
<script>
import Navigator from './components/Navigator'
import Footer from './components/Footer'
import Middleware from './components/Middleware'
import { mapGetters } from 'vuex'
export default {
  name: 'Application',
  components: {
    Navigator,
    Footer,
    Middleware
  },

  computed: {
    ...mapGetters({
      GET_TOKEN: 'common/GET_TOKEN',
      GET_LOADING: 'common/GET_LOADING'
    })
  }
}
</script>
<style>
body {
  background-color: #EDF3FB;
  color: #2E3B59;
}
.required-field {
  border: 1px solid #dc3545;
  margin-bottom: 2px;
}
.required-label {
  color: #dc3545;
  font-size: 12px;
}
.page-loading {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  text-align: center;
}
</style>
