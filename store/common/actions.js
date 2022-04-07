import Vue from 'vue'

export default {
  /**
  * API GET Method
  * @param { string } url
  */

  API_GET ({ dispatch }, { url }) {
    return new Promise(async (resolve, reject) => {
      try {
        let headers = await dispatch('SET_HEADERS')
        let response = await this.$axios.$get(url, headers)
        resolve(response)
      } catch (error) { reject(error.response) }
    })
  },

  API_GET_PARAMS ({ dispatch }, { url, param }) {
    return new Promise(async (resolve, reject) => {
      try {
        let headers = await dispatch('SET_HEADERS')
        let response = await this.$axios.$get(url, {
          params: param, headers: headers.headers
        })

        resolve(response)
      } catch (error) { reject(error.response) }
    })
  },
  /**
  * API POST Method
  * @param { Array, Object } data
  * @param { String } url
  */
  API_POST ({ dispatch }, { url, data }) {
    return new Promise(async (resolve, reject) => {
      try {
        data = data || {}
        let headers = await dispatch('SET_HEADERS')
        let response = await this.$axios.$post(url, data, headers)
        resolve(response)
      } catch (error) { reject(error.response) }
    })
  },

  /**
  * API DELETE Method
  * @param { String } url
  */
  API_DELETE ({ dispatch }, { url }) {
    return new Promise(async (resolve, reject) => {
      try {
        let headers = await dispatch('SET_HEADERS')
        let response = await this.$axios.$delete(url, headers)
        resolve(response)
      } catch (error) { reject(error.response) }
    })
  },

  /**
  * API PUT Method
  * @param { Array, Object } data
  * @param { String } url
  */
  API_PUT ({ dispatch }, { url, data }) {
    return new Promise(async (resolve, reject) => {
      try {
        data = data || {}
        let headers = await dispatch('SET_HEADERS')
        let response = await this.$axios.$put(url, data, headers)
        resolve(response)
      } catch (error) { reject(error.response) }

    })
  },

  SET_HEADERS ({ getters }) {
    return new Promise( async (resolve) => {
      if (getters.GET_TOKEN) {
        resolve({ headers: 
                  { Authorization: `Bearer ${getters.GET_TOKEN}`,
                    'mini-app-version': process.env.miniAppVersion,
                    'ip-address': Vue.$cookies.get('ip_address'),
                    'platform': Vue.$cookies.get('platform') }})
      } else resolve({ headers: {'mini-app-version': process.env.miniAppVersion,
                                'ip-address': Vue.$cookies.get('ip_address'),
                                'platform': Vue.$cookies.get('platform') }})
    })
  }
}
