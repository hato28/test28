import Vue from 'vue';

export default async ({ route, store, redirect, $axios }) => {
  let routeToken = route.query.auth 
  let distributorToken = route.query.distributor_token
  if (routeToken) {
    store.commit('playing-status/SET_SESSION_TIMEOUT', '')
    store.commit('playing-status/SET_SESSION_MINUTE', '')
    store.commit('playing-status/SET_VIDEO_TOAST', true)
    store.commit('common/SET_PAGE_LOADING', true)
    try{
      let ip_response = await $axios.$get(
        'https://jsonip.com/',
      )
      Vue.$cookies.set('ip_address', ip_response.ip);
      Vue.$cookies.set('platform', 'betting-platform')
      }
    catch(e){}
    try {
      if (routeToken == localStorage.getItem('routeToken')) {
        store.commit('common/SET_PAGE_LOADING', false)
        return redirect('/dashboard')
      } else {
        localStorage.removeItem('routeToken');
        localStorage.setItem('routeToken', routeToken);
      }
    } catch (error) {
      console.log(error);
    }
    let response = await store.dispatch('common/API_POST', {
      url: 'https://api-distribution.pitm.live/api/get-server',
      data: { distributor_token: distributorToken }
    })/*
    let response = await store.dispatch('common/API_POST', {
      url: 'https://api-distribution-dev.pitm.live/api/get-server',
      data: { distributor_token: distributorToken }
    })
    /*
    let response = await store.dispatch('common/API_POST', {
      url: 'https://api-distribution-st.pitm.live/api/get-server',
      data: { distributor_token: distributorToken }
    })*/
    $axios.defaults.baseURL = response.data.server.app + '/api'
    Vue.$cookies.set('server', response.data.server.app + '/api');
    Vue.$cookies.set('gcash_server', response.data.server.gcash + '/api');
    Vue.$cookies.set('echo-host', response.data.server.echo);
    Vue.$cookies.set('domain-address', response.data.server.app);
    //console.log($axios.defaults.baseURL)
  
    /**/
   
    store.dispatch('common/API_POST', {
      url: '/validate-redirect-token',
      data: { redirect_token: routeToken }
    }).then(response => {
      store.commit('common/SET_TOKEN', response.data.token)
      return redirect('/dashboard')
    }).catch((error) => {
      store.commit('common/SET_TOKEN', '')
      Echo.disconnect()
      return redirect('/')
    }).finally(() => {
      store.commit('common/SET_PAGE_LOADING', false)
    })
  }
 
  $axios.defaults.baseURL = Vue.$cookies.get('server')
}
