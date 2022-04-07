<template>
<div>
  <b-nav-item
    @click="showModalLogin = true"
    class="wpit-nav-item">
    Login
  </b-nav-item>
  <b-modal
    v-model="showModalLogin"
    title="Login account"
    hide-footer
    @hidden="resetModal">
    <b-overlay
      id="overlay-background"
      :show="loading"
      rounded="sm">
      <b-row>
        <b-col
          cols="12"
          md="12"
          sm="12">
          <label for="username">Username</label>
          <b-form-input
            v-model="form.username.value"
            :class="{'required-field': form.username.isEmpty}"
            @input="validationKey(form.username)"
            id="username" />
          <p class="required-label">{{ form.username.msg }}</p>
        </b-col>
        <b-col
          cols="12"
          md="12"
          sm="12">
          <label for="password">Password</label>
          <b-form-input
            type="password"
            v-model="form.password.value"
            :class="{'required-field': form.password.isEmpty}"
            @input="validationKey(form.password)"
            id="password" />
          <p class="required-label">{{ form.password.msg }}</p>
        </b-col>
        <b-col
          cols="12"
          md="12"
          sm="12"
          class="mt-2">
          <b-btn
            block
            :disabled="isBtnEnabled"
            @click="validateLogin">
            Login
          </b-btn>
        </b-col>
      </b-row>
    </b-overlay>
  </b-modal>
</div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  name: 'Login-Modal',
  data () {
    return {
      loading: false,
      showModalLogin: false,
      form: {
        username: this.inputRules('', true, false, [3]),
        password: this.inputRules('', true)
      }
    }
  },

  methods: {
    ...mapMutations({
      SET_TOKEN: 'common/SET_TOKEN'
    }),
  
    async validateLogin () {
      try {
        this.loading = true
        let response = await this.API_POST({
          url: '/auth',
          data: {
            username: this.form.username.value,
            password: this.form.password.value
          }
        })
        this.SET_TOKEN(response.data.token)
        this.showModalLogin = false
        this.$swal({
          icon: 'success',
          title: 'Your Token',
          text: response.data.token,
        })
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: 'ERROR',
          text: error.data.message
        })
      } finally { this.loading = false }
    },

    resetModal () {
      this.form = {
        username: this.inputRules('', true),
        password: this.inputRules('', true)
      }
    }
  }
}
</script>