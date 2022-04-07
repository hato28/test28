<template>
  <div class="overflow-x">
    <!-- <table class="results">
      <tr
        v-for="(row, index) in perRowResult"
        :key="`row_${index}`">
        <td
          v-for="(col, key) in row"
          :key="`col_${index}_${key}`">
          <b-avatar
            :class="col"
            text=" "
            size="1.2rem" />
        </td>
      </tr>
    </table> -->
    <div class="contianer p-0">
      <div class="reglahan" ref="reglahanContainer">
        <div v-for="(item,index) in fightTrends" :key="index" :class="`${item ? 'entry '+item :'null'}`">

        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
export default {
  name: 'Match-Results',
  data() {
    return {
      fightTrendsList:[],
      fightTrends:[],
      last_winner:'',
      index:-1
    }
  },
  async mounted() {
    //console.log(this.fightTrends)
    await this.generateFightResult()
    this.scrollToEnd()
  },
  updated(){
    this.scrollToEnd()
  },
  computed: {
    perColumnResult () {
      const results = ['meron', 'wala', 'draw', 'cancelled']
      const columnResult = []
      for (let i = 0; i <= 23; i++) {
        columnResult.push(results[Math.floor(Math.random() * (4 - 1))])
      }
      return columnResult
    },

    perRowResult () {
      const rowResult = []
      let basis = JSON.parse(JSON.stringify(this.perColumnResult))
      for (let i = 0; i <= 5; i++) {
        const columnResult = []
        for (let c = 0; c <= 23; c++) {
          if (i >= 3) {
            columnResult.push(Math.random() < 0.5 ? basis[c] : '')
          } else {
            columnResult.push(basis[c])
          }
        }
        rowResult.push(columnResult)
        // Update basis
        basis = JSON.parse(JSON.stringify(columnResult))
      }
      return rowResult
    }
  },
  watch: {
    GET_FIGHT_RESULTS: {
      handler (val) {
        if (val) this.getResult()
      },
      deep: true,
      immediate: true
    }
  },

  methods: {
    generateRandomResult (row, col) {
      return this.perColumnResult[col]
    },
    async generateFightResult(){
      let response =  await this.API_GET({ url: '/dashboard' })
      this.generateFightTrends(response.data.fightResults)
    },
    getResult () {
      let list = this.GET_FIGHT_RESULTS
      this.fightTrendsList = list
      this.generateFightTrends(list)
    },
    scrollToEnd: function () {
      try{
      var content = this.$refs.reglahanContainer;
      content.scrollLeft = content.scrollWidth
      }
      catch(e){}
    },
    generateFightTrends(list){
    const data = list.map(x=> x.winner)
    const DRAW_OR_CANCEL = ['draw', 'cancelled'];
		const MAX_ROW = 5;
    const e = []
		
		let lastWin;
		let index = -MAX_ROW - 1;
		let row = 0;
		let horiz = 0;
		let stack = 0;

    const addEntry = entry =>{
       if (Object.is(entry, null))
				entry = 'cancelled';
      
      const dorc = DRAW_OR_CANCEL.includes(entry);
			
			if (dorc && index < 0){
				index = 0;
      }else if ((!lastWin && DRAW_OR_CANCEL.includes(e[0]))	|| entry === lastWin || dorc){
				if (row === MAX_ROW - stack) {
					index += MAX_ROW + 1;
					horiz++;
				}
				else {
					index++;
					row++;
				}
			}else {
				if (stack === MAX_ROW){
					index += MAX_ROW + 1;
        }
				else{
					index += MAX_ROW - row - (horiz * MAX_ROW) - horiz + 1;
        }
        stack = 0;
          for (let i = 0; i < MAX_ROW; i++){
              if (e[index + MAX_ROW - i]){
                stack = i + 1;
              }
          }
        row = 0;
        horiz = 0;
				// lastWin = entry;
       
			}
			Vue.set(e, index, entry);
      lastWin = dorc ? lastWin : entry;
    }
    data.forEach(addEntry);
    this.fightTrends = e

    }
  }
}
</script>

<style lang="scss" scoped>
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

.reglahan {
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-orient: vertical;
	-webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
	-ms-flex-wrap: wrap;
    flex-wrap: wrap;
	-ms-flex-line-pack: start;
    align-content: flex-start;
	// height: 192px;
  height: 193px;
	overflow-x: scroll;
	overflow-y: hidden;
	background-size: 32px 32px;
	background-image:
		-o-linear-gradient(left, lightgrey 1px, transparent 1px),
		-o-linear-gradient(top, lightgrey 1px, transparent 1px);
	background-image:
		linear-gradient(to right, lightgrey 1px, transparent 1px),
		linear-gradient(to bottom, lightgrey 1px, transparent 1px);
	background-repeat: repeat;
	background-attachment: local;
	background-color: white;
	line-height: normal;
	text-align: start;
}

.reglahan .entry {
	flex: 1 1;
	-webkit-flex: 1 1 100%;
	width: 30px;
	height: 30px;
	max-width: 30px;
	max-height: 30px;
	margin: 1px;
	border-style: solid;
	border-width: 8px;
	border-radius: 15px;
	-webkit-box-shadow: 1px 2px 2px #888888;
	box-shadow: 1px 2px 2px #888888;
}

.reglahan .entry.meron {
	border-color: #B31013;
}

.reglahan .entry.wala {
	border-color: #0B4592;
}

.reglahan .entry.draw {
	border-color: #28a745;
}

.reglahan .entry.cancelled {
	border-color: #9a9da2;
}

.reglahan .null {
	width: 32px;
	height: 32px;
}

.reglahan .break {
	-ms-flex-preferred-size: 100%;
    flex-basis: 100%;
	width: 0;
}

@media only screen and (min-width: 992px) {
  .reglahan{
    height: 220px;
  }
}
</style>
