<template>
 <b-row class="mx-0">
  <b-col
    cols="3"
    sm="3"
    md="3"
    v-for="(item, index) in fightTotalHistory"
    :key="index"
    class="text-center px-0">
    <b-avatar
      v-if="item.variant"
      :variant="item.variant"
      :text="item.value"
      :class="item.class" />
    <b-avatar
      v-else
      :text="item.value" />
    <p class="history-label">{{ item.title }}</p>
  </b-col>
  <b-col
    cols="12"
    sm="12"
    md="12"
    class="px-0">
    <div class="overflow-x">
      <table class="results">
        <tr
          v-for="(row, index) in fightHistoryList"
          :key="index">
          <td
            v-for="(col, key) in row"
            :key="key">
            <div
              :style="`background-color: ${
                col.name === 'meron'
                  ? '#B31013;'
                  : col.name === 'wala'
                    ? '#0B4592;'
                    : col.name === 'draw'
                      ? '#28a745;'
                      : col.name === null
                        ? '#9a9da2;'
                        : ''
              }`"
              class="tiktak">
              {{ col.fight_number }}
            </div>
          </td>
        </tr>
      </table>
  </div>
  </b-col>
</b-row>
</template>
<script>
export default {
  name: 'Match-Results',
  data () {
    return {
      fightHistoryList: [],
      isInitial: true
    }
  },
  created() {
    //console.log(this.GET_FIGHT_RESULTS)
    this.setFightHistory()
  },
  computed: {
    fightTotalHistory () {
      let meron = 0
      let wala = 0
      let draw = 0
      let cancelled = 0
      //console.log(this.fightHistoryList,'fight his list')
      this.fightHistoryList.map(items => {
        items.map(values => {
          if (values.name === 'meron') meron++
          if (values.name === 'wala') wala++
          if (values.name === 'draw') draw++
          if (values.name === null) cancelled++
        })
      })
      return [
        { title: 'MERON', value: meron.toString(), variant: 'danger',class:"avatar-meron" },
        { title: 'WALA', value: wala.toString(), variant: 'primary',class:"avatar-wala" },
        { title: 'DRAW', value: draw.toString(), variant: 'success',class:"avatar-draw" },
        { title: 'CANCELLED', value: cancelled.toString(), variant: 'secondary',class:"avatar-cancelled" },
      ]
    }
  },

  watch: {
    GET_FIGHT_RESULTS: {
      handler (val) {
        if (val) this.setFightHistory()
      },
      deep: true
    }
  },

  methods: {
    setFightHistory () {
      let rowLen = 6
      let colLen = 512
      let incrementBy = 6
      this.fightHistoryList = []
      for (let index = 0; index < rowLen; index++) {
        let column = []
        for (let key = 0; key < colLen; key+=incrementBy) {
          let colValue = key ? index + 1 + key : index + 1
          let betName = this.getResult(colValue-1),
              fight_number = ''
          if(betName != ''){
            fight_number = this.getFightNumber(colValue-1)
          }
          if (!key) {
            column.push({
              name: betName,
              value: colValue.toString(),
              fight_number:fight_number
            })
          } else {
            column.push({
              name: betName,
              value: colValue.toString(),
              fight_number:fight_number
            })
          }
        }
        this.fightHistoryList.push(column)
      }
    },
    getResult (index) {
      let winner = this.GET_FIGHT_RESULTS[index]
      return winner ? winner.winner : ''
    },
    getFightNumber(index){
      let winner = this.GET_FIGHT_RESULTS[index]
      return winner.fight_number
    }
  }
}
</script>

<style lang="scss" scoped>
.history-label {
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
}
.tiktak {
  border-radius: 50%;
  color: #fff;
  font-size: 10px;
  // width: 20px;
  // height: 20px;
  // padding-top: 2px;
  width: 30px;
  height: 30px;
  padding-top: 7px;
  font-weight: 400;
}
table {
  width: 100%;
  & > tr {
    vertical-align: center;
    & > td {
      border: 1px solid $grey;
      text-align: center;
      padding: 0.2rem;

      & .b-avatar {
        background-color: transparent;
        &.meron { background-color: $bet-red; }
        &.wala { background-color: $bet-blue; }
        &.draw { background-color: $bet-green; }
        &.cancelled { background-color: $grey; }
      }
    }
  }
}

.overflow-x {
  overflow-x: auto;
}

.avatar-meron{background-color:#B31013;}
.avatar-wala{background-color:#0B4592;}
.avatar-draw{background-color:#28a745;}
.avatar-cancelled{background-color:#9a9da2;}
</style>
