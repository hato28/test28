export default () => ({
  token: '',
  dark: false,
  points: 50000,
  pageLoading: false,
  bets: {
    meron: {
      history: [],
      total: 300
    },
    wala: {
      history: [],
      total: 0
    },
    draw: {
      history: [],
      total: 0
    }
  },
  odds: {
    meron: {
      odd: 'meron',
      label: 'Meron',
      total: 545387.00,
      payout: 265.78,
      addedPoints: 0
    },
    draw: {
      odd: 'draw',
      label: 'Draw',
      total: 197254.00,
      payout: 165.82,
      addedPoints: 0
    },
    wala: {
      odd: 'wala',
      label: 'Wala',
      total: 298725.00,
      payout: 192.92,
      addedPoints: 0
    }
  }
})
