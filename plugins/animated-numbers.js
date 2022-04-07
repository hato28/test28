import Vue from 'vue'
import AnimatedNumber from 'animated-number-vue'

const vueAnimatedNumber = {
  install(Vue, options) {
    Vue.component('animated-number', AnimatedNumber)
  }
}

Vue.use(vueAnimatedNumber)
export default vueAnimatedNumber