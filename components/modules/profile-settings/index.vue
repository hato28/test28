<!--<template>
  <div class="profile-settings-container">
    <div class="profile-content">
    <NuxtLink class="back-home" to="/Dashboard">HOME</NuxtLink><span class="mx-2 gray-txt">/</span><span class="gray-txt">EDIT PROFILE</span>

    <div class="profile-data">
      <p class="pt-3 title-txt mb-0">Profile</p>
      <p class="warning-txt text-secondary">Set your username and avatar.</p>
       <span class="profile-txt ">USERNAME</span>
       <div class="username-input">
          <b-form-input v-model="username"></b-form-input>
       </div>
      <div v-if="uploadError.hasOwnProperty('codename')" align="center">
        <span style="color: red">{{uploadError.codename[0]}}</span>
      </div> 
       <span class="profile-txt ">Pick a Avatar</span>
       <div class="avatar-container">
         <!-- <b-avatar :src={image.pathShort}></b-avatar> 
         <div class="avatar-button-container">
           <b-avatar class="ml-1 mt-1" button variant="outline-primary"
           v-on:click ="selected_avatar = `${image.pathLong}`, 
           item.imageUrl=null, item.image=null, item.file=null, isDisabled=false, avatar_type='default'" 
           v-for="(image, index) in images" :key="index" 
           :src="`${image.pathLong}`">
           </b-avatar>
          </div>
       </div>
       <div id="preview">
        <img v-if="item.imageUrl && uploadError==''" :src="item.image" />
       </div>
      <div id="preview" style="padding-bottom: 10px" v-if="item.imageUrl && uploadError == ''">
       <p>Uploaded Image</p>
        <b-avatar  v-if="item.imageUrl" :src="item.imageUrl"></b-avatar>
      </div>
      <div v-if="uploadError != ''" align="center">
        <span style="color: red">{{uploadError.message}}</span>
      </div>  
     <div v-if="uploadError.hasOwnProperty('image')" align="center" style="padding-bottom: 10px">
        <span style="color: red">{{uploadError.image[0]}}</span>
      </div> 
    </div>
      <!-- <div v-if="uploadError != ''" align="center">
        <span style="color: red">{{uploadError.message}}</span>
      </div>  
      <div style="padding-bottom: 20px">
        <input type="file" ref="file" accept="image/png, image/jpeg" @change="fileUpload" style="display: none">
        <b-button @click="$refs.file.click(), uploadError=''" variant="outline-primary" class="upload-button">UPLOAD PHOTO</b-button>
      </div>
      <div style="padding-bottom: 20px;">
        <b-overlay
          :show="busy"
          rounded
          opacity="0.6"
          spinner-small
          spinner-variant="primary"
          @hidden="onHidden"
        >
        <b-button ref="saveChanges" :disabled="busy || isDisabled" @click="saveChanges" variant="primary" class="upload-button">SAVE CHANGES</b-button>
        </b-overlay>
      </div> 
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
import axios from "axios"
import Vue from 'vue';
export default {
  name: 'Profile-Settings',
  data () {
    return {
      uploadError: '',
      busy: false,
      username:'',
      images: [],
      selected_avatar:'',
      avatar_type:'default',
      imageFile: '',
      isDisabled: false,
      prevName: '',
      item:{
        image: null,
        imageUrl: null,
        file:null
      }
    }
  },
  mounted() {
    this.importAll(require.context('~/assets/avatar/', true, /\.png$/));
    this.getProfile()
},
  methods: {
    importAll(r) {
      r.keys().forEach(key => (this.images.push({ pathLong: r(key), pathShort: key.toString().replace(/^.{2}/g, '~/assets/avatar/') })));
    },

    goToHome(){
      this.$router.push({
          path: '/',
        });
    },
    fileUpload(e){
      const file = e.target.files[0]
      this.imageFile = e.target.files[0]
      this.image = file
      this.item.image = this.image.name
      this.item.imageUrl = URL.createObjectURL(file)
      this.selected_avatar = this.item.image
      this.item.file = file
      this.avatar_type = 'custom'
      if (file['size'] > 1000000){
        console.log(file['size'])
        this.uploadError = {
          'message' : "File must be less than 1mb"
        }
        this.isDisabled = true
        this.item.file = null
        this.item.image = null
      }else{ 
        this.isDisabled = false
      }

    },
    async saveChanges(){
      if(this.item.image == null){
        try {
          const token = JSON.parse(localStorage.getItem('vuex'))
          const formData = new FormData()
            formData.append('default_path', this.selected_avatar)
            formData.append('', this.selected_avatar)
            formData.append('codename', this.username)
            formData.append('avatar_type', this.avatar_type)
            axios.post(`${Vue.$cookies.get('server')}/avatar/update`, formData, {
            headers:{
              Authorization: `Bearer ${token.common.token}`,
              'mini-app-version': process.env.miniAppVersion
            }
            }).then((response) => {
              window.location.replace('/dashboard')
              
            }).catch(error => {
              this.uploadError = error.response.data.errors
             // console.log(this.uploadError.codename[0])
            })
        } catch(error) {
          console.log(error)
        }

      }else{
        this.busy = true
        const token = JSON.parse(localStorage.getItem('vuex'))
        const formData = new FormData()
          formData.append('image', this.item.file, this.item.image)
          formData.append('codename', this.username)
          formData.append('avatar_type', this.avatar_type)
          axios.post(`${Vue.$cookies.get('server')}/avatar/update`, formData, {
            headers:{
              Authorization: `Bearer ${token.common.token}`,
              'mini-app-version': process.env.miniAppVersion
            }
          }).then((response) => {
            window.location.replace('/dashboard')
            this.busy = false
        }).catch(err => {
          this.uploadError = err.response.data.errors
          console.log("error", err.response.data)
        })
      }
    },
    async getProfile(){
      try{
        let response =  await this.API_GET ({ 
          url:'/avatar/get-details'
        })
        this.username = response.data.username
        this.prevName = response.data.username
        this.selected_avatar = response.data.avatar_location
      }catch (error){
        console.log(error)
      }
    },
    onHidden() {
        // Return focus to the button once hidden
        this.$refs.saveChanges.focus()
      },
  }
}
</script>
<style scoped>
.profile-settings-container{
  background-color: white;
}

.back-home{
  color:#3851FF;
  font-size:13px;
  font-weight: bold;
}

.gray-txt{
  color:#707070;
  font-size:13px;
  font-weight: bold;
}

.title-txt{
  color:#2E3B59;
  font-size:13px;
  font-weight: bold;
}

.warning-txt {
    font-size: 9px;
  }
.profile-content{
  margin-left: 10px;
}
.profile-txt{
  font-size:11px;
  font-weight: bold;
}
.username-input{
  width: 95%;
}
.avatar-container{
  display: grid;
  padding-right: 10px;
}

.avatar-button-container{
  width: 80%;
  padding-bottom: 20px
}
.upload-button{
  width: 95%;
}
</style>-->