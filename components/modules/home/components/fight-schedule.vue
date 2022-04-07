<template>
  <b-col
    cols="12"
    sm="12"
    md="12"
    lg="12"
    class="mb-4 px-0">
    <Cards>
      <b-row class='mx-0'>
        <!--
        <b-col
          cols="12"
          md="12"
          sm="12">
          <h4>Upcoming Events</h4>
        </b-col>
        <b-col
          cols="12"
          md="12"
          sm="12"
          class="mt-2">
          <b-carousel
            id="carousel-1"
            v-model="carousel.slide"
            class="wpit-layout__carousel"
            :interval="6000"
            controls
            indicators
            background="#ababab"
            img-width="340"
            img-height="450"
            style="text-shadow: 1px 1px 2px #333;"
            @sliding-start="sliding = true"
            @sliding-end="sliding = false">
            <b-carousel-slide
              v-for="(s, si) in carousel.slides"
              :key="`slide${si}`"
              :caption="s.title"
              :text="s.content"
              :img-src="s.image"
            ></b-carousel-slide>
          </b-carousel>
        </b-col>
        -->
        <b-col
          cols="12"
          md="12"
          sm="12"
          class="mt-3 mb-3">
          <h5>Fight Schedule</h5>
          <h6 style="font-weight: normal">Fight schedules may change anytime.</h6>
        </b-col>
        <b-col
          cols="12"
          md="12"
          sm="12"
          class="fight-list">
          <List
            :hasMedia="false"
            :items="fightSchedule.data" />
        </b-col>
        <b-col
          cols="12"
          md="12"
          sm="12"
          class="text-center">
          <b-button-group class="fight-pagination">
            <b-button size="sm" @click="prevFightList" :disabled="canPrev">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
              </svg>
            </b-button>
            <b-button
              size="sm"
              disabled
              style="font-size: 9pt">
              {{`${fightSchedule.current_page} of ${fightSchedule.last_page}`}}
            </b-button>
            <b-button size="sm" @click="nextFightList" :disabled="canNext">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
              </svg>
            </b-button>
          </b-button-group>
        </b-col>
      </b-row>
    </Cards>
  </b-col>
</template>
<script>
export default {
  name: 'Right-Content',
  data () {
    return {
      //domain: 'https://api.wpc2039.live',
      fightSchedule: [],
      itemsPerPage: 5,
      pages: 1,
      canNext: false,
      canPrev: false,
      carousel: {
        slide: 0,
        sliding: false,
        slides: [
          {
            title: 'HERITAGE CUP',
            content: 'National Stag Derby 2021 6.5 Million Guaranteed Prize',
            image: '/slide1.png'
          },
          {
            title: 'DERBY CUP',
            content: 'Derby 2021 with 6.5 Million Guaranteed Prize',
            image: '/slide2.png'
          },
          {
            title: 'TUPADA 2021',
            content: 'Tupada 2021 with 2 Million Guaranteed Prize',
            image: '/slide3.png'
          }
        ]
      }
    }
  },

  mounted() {
    this.fetchFightSchedule(this.pages);
  },

  methods: {
    async fetchFightSchedule(page) {
      try {
        let response = await this.API_GET_PARAMS ({
          url: '/arena/fight-schedule',
          param: {
            items_per_page: this.itemsPerPage,
            page: page
          }
        })

        let data = response.data.arena;

        this.fightSchedule = data;

        this.checkCurrentPage();
      } catch (e) {
        console.log("error: ", e)
      }
    },

    nextFightList() {
      if (this.pages < this.fightSchedule.last_page) {
        this.pages = this.pages + 1;
        this.fetchFightSchedule(this.pages);
      }
    },

    prevFightList() {
      if (this.pages > 1) {
        this.pages = this.pages - 1;
        this.fetchFightSchedule(this.pages);
      }
    },

    checkCurrentPage() {
      // Check current_page match to 1 = disable prev button
      this.pages == 1 ? this.canPrev = true : this.canPrev = false

      // Check current_page match to last_page = disable next button
      this.pages == this.fightSchedule.last_page ? this.canNext = true : this.canNext = false
    }
  }
}
</script>
<style scoped>
h5{
  color: #2E3B59;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
}
h6{
  color: #2E3B59;
  font-size: .6em;
}
p{
  font-size: 12px !important;
}
.fight-pagination >>> button {
  background-color: white;
  border-color: white;
  color: #000000;
  widows: 40px;
}
.btn-sm{
  padding: 0 4px;
}
.fight-list{
  padding-left: 10px;
  color: #2E3B59;
}
</style>
