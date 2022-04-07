export default function ({ $axios }, inject) {
  inject('formatNumber', (number) => {
    return parseInt(number).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  })
}