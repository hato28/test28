<template>
    <b-modal
    v-model="showVideoError"
    size="sm"
    hide-footer
    hide-header>
    <b-row class="text-center p-3 justify-content-center">
      <b-col
        cols="12"
        md="12"
        sm="12">
        <div>
          <div class="video-error-title">To view Pitmasters live video, and prevent black screen, please install Chrome browser and change your default browser to Chrome.</div>
        </div>
      </b-col>

      <div class="instructions-container my-4">
        <div class="px-4">
        <div class="instructions-header mb-3">How to change default browser</div>
       
        <ul class="list-group">
            <li class="list-group-item">1. On your Android, open Settings.</li>
            <li class="list-group-item">2. Tap Apps & Notifications.</li>
            <li class="list-group-item">3. At the bottom, tap Advanced.</li>
            <li class="list-group-item">4. Tap Default apps.</li>
            <li class="list-group-item">5. Tap Browser App Chrome.</li>
        </ul>
      </div>

      
      </div>

      <div class="session-btn w-100">
        <b-button @click="showVideoError = false" variant="primary">OKAY</b-button>
      </div>
    </b-row>
  </b-modal>
</template>
<script>
export default {
  name: 'VideoError',
  props:{
    displayModal:Boolean
  },
  data () {
    return {
      showVideoError: false,
    }
  },
  watch:{
    displayModal:function(data){
      this.showVideoError = true
    },
  },
  }
</script>

<style>
.video-error-title{
    font-size: 14px;
    font-weight: bold;
    color: #000000;
}

.instructions-container{
    background: #F0F7FF;
    padding: 14px 0;
}

.instructions-header{
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    color:#000000
}
.list-group-item{
    border:none;
    padding: 0;
    margin-bottom: 4px;
    text-align: left;
    background: transparent;
    font-size: 12px;
    color: #000000
}
</style>