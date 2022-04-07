import Echo from 'laravel-echo'
window.io = require('socket.io-client')
const LaraEcho = window.Echo = new Echo({
  broadcaster: 'socket.io',
  //host: 'https://staging-wpit-echo.dsg.technology:443',
  //host: 'https://echo.wpc2039.live:443',
  transports: ['websocket'],
  auth: {
    'headers': {
      'X-CSRF-TOKEN': 'PsbhdXwDvydELPLjfE88v9AD0iJYTLOUf6opwmBv'
    }
  },
  authEndpoint: '/broadcasting/auth',
  csrfToken: null,
  //hostname: 'staging-wpit-echo.dsg.technology',
  //hostname: 'echo.wpc2039.live',
  key: null,
  namespace: 'App.Events',
  path: '/socket.io',
  port: '443',
  secure: true
})
export default LaraEcho
