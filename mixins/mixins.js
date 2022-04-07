/* eslint-disable */
import { mapGetters, mapActions, mapMutations } from 'vuex'
export const Mixins = {
  data () {
    return {

    }
  },

  computed: {
    ...mapGetters({
      GET_MODE: 'common/GET_MODE',
      GET_POINTS: 'common/GET_POINTS',
      GET_BETS: 'common/GET_BETS',
      GET_ODDS: 'common/GET_ODDS',
      GET_USER: 'common/GET_USER',
      GET_CURRENT_POINTS: 'playing-status/GET_CURRENT_POINTS',
      GET_CURRENT_FIGHT: 'playing-status/GET_CURRENT_FIGHT',
      GET_BETTING_INFO: 'playing-status/GET_BETTING_INFO',
      GET_ARENA_INFO: 'playing-status/GET_ARENA_INFO',
      GET_ARENA_UPDATE: 'playing-status/GET_ARENA_UPDATE',
      GET_BET_AMOUNT: 'playing-status/GET_BET_AMOUNT',
      GET_FIGHT_RESULTS: 'playing-status/GET_FIGHT_RESULTS',
      GET_WIN_STREAK: 'playing-status/GET_WIN_STREAK',
      GET_WIN_MODAL: 'playing-status/GET_WIN_MODAL',
    }),

    /**
     * Form Validation checker
     * Will enable the form button ounce all fields are validated
     * Will apply to all forms
     * Dev: Jay
     */
    isBtnEnabled () {
      let disabled = false
      Object.keys(this.form).forEach(index => {
        let item = this.form[index]
        if (item.required && !item.value) {
          disabled = true
        }
        let minMax = item.lenMax
        if (item.required && minMax.length) {
          let valLen = item.value.length
          if (valLen < minMax[0]) disabled = true
        }
        if (item.required && item.value && item.email) {
          if (!this.isEmail(item.value)) disabled = true
        }
      })
      return disabled
    }
  },

  methods: {
    /**
     * Axios api methods
     * @folder store/common/actions
     */
    ...mapActions({
      API_GET: 'common/API_GET',
      API_GET_PARAMS: 'common/API_GET_PARAMS',
      API_POST: 'common/API_POST',
      API_PUT: 'common/API_PUT',
      API_DELETE: 'common/API_DELETE',
    }),

    ...mapMutations({
      SET_TOKEN: 'common/SET_TOKEN',
      SET_PAGE_LOADING: 'common/SET_PAGE_LOADING',
      SET_CURRENT_POINST: 'playing-status/SET_CURRENT_POINST',
      SET_CURRENT_FIGHT: 'playing-status/SET_CURRENT_FIGHT',
      SET_ONLOAD_FIGHT: 'playing-status/SET_ONLOAD_FIGHT',
      SET_ARENA_INFO: 'playing-status/SET_ARENA_INFO',
      SET_BETTING_INFO: 'playing-status/SET_BETTING_INFO',
      SET_ONLOAD_BETTING_INFO: 'playing-status/SET_ONLOAD_BETTING_INFO',
      SET_BET_AMOUNT: 'playing-status/SET_BET_AMOUNT',
      SET_WIN_STREAK: 'playing-status/SET_WIN_STREAK',
      SET_WIN_MODAL: 'playing-status/SET_WIN_MODAL',
      SET_SESSION_TIMEOUT: 'playing-status/SET_SESSION_TIMEOUT',
      SET_SESSION_MINUTE: 'playing-status/SET_SESSION_MINUTE',
      SET_VIDEO_TOAST: 'playing-status/SET_VIDEO_TOAST',
    }),

    destroyToken (error) {
      if (error.status === 401) {
        this.SET_TOKEN('')
        this.SET_SESSION_TIMEOUT('')
        this.SET_SESSION_MINUTE('')
        // localStorage.removeItem('defaultTimeCount');
        Echo.disconnect()
        this.goTo('/404')
      }
    },

    goTo (route) {
      this.$router.push(route)
    },

    integerOnly(event) {
      var key = window.event ? event.keyCode : event.which;
      if (event.keyCode === 8 || event.keyCode === 46 || key < 48 || key > 57) {
        event.preventDefault();
      }
    },

    currencyFormat (value) {
      value = value.toString();
      let dIndex = value.indexOf('.');
      if(dIndex > -1){
          value = value.slice(0,dIndex+3);
      }
      var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'PHP'
      })
      
      let total = formatter.format(value)
      let formattedValue = total.replace('PHP','').replace('₱','')
      // return total.split('PHP')[1]
      return formattedValue
    },

    /**
     * Form validation
     * @param { string } value
     * @param { boolean } required value required
     * @param { boolean } email check if the value is email format
     * @param { array } lenMax min and max length value
     * @param { string } isUrl check if the value is url format
     * Dev: Jay
     */
    inputRules(value = null, required = false, email = false, lenMax = [], isUrl = false) {
      return {
        value: value,
        required: required,
        email: email,
        lenMax: lenMax,
        isUrl: isUrl
      }
    },

    /**
     * Form validation
     * @param { Object } values
     * @param { String } field
     * Will validate the form according to  field
     * via Keypress
     * Dev: Jay
     */
    validationKey (values) {
      const isRequired = values.required
      const isEmail = values.email
      const lenMax = values.lenMax
      const isUrl = values.isUrl
      let value = values.value
      if (!value && isRequired) {
        values.isEmpty = true
        values.msg = `This field is required`
      } else if (isEmail && value) {
        if (!this.isEmail(value)) {
          values.isEmpty = true
          values.msg = 'Invalid email'
        } else {
          values.isEmpty = false
          values.msg = ''
        }
      } else if (lenMax.length && value) {
        let min = lenMax[0],
          max = lenMax[1],
          val = value.length
        if (val < min) {
          values.isEmpty = true
          values.msg = `Must be at least ${min} characters`
        } else if (val > max) {
          values.isEmpty = true
          values.msg = `Character not greater than ${max}`
        } else {
          values.isEmpty = false
          values.msg = ''
        }
      } else if (typeof value === 'object' && isRequired) {
        if (!value.length) {
          values.isEmpty = true
          values.msg = `This field is required`
        } else {
          values.isEmpty = false
          values.msg = ''
        }
      } else if (isUrl && value) {
        if (!this.isUrl(value)) {
          values.isEmpty = true
          values.msg = 'Invalid URL format'
        } else {
          values.isEmpty = false
          values.msg = ''
        }
      } else {
        values.msg = ''
        values.isEmpty = false
      }
    },

    isEmail(value) {
      const pattern = /^(([^<>()[\]\\.,:\s@"]+(\.[^<>()[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (!pattern.test(value)) return false
      return true
    },

    isUrl(str) {
      var pattern = new RegExp(
        "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[&a-z\\d%_.~+=-]*)?" + // query string
          "(\\#[-a-z\\d_]*)?$",
        "i"
      )
      return !!pattern.test(str)
    }
  }
}
