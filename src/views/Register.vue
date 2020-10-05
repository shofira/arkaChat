<template>
  <div class="login-page">
    <div class="col-sm-4 login p-4">
      <div class="container">
        <b-row>
          <b-col cols="2"><router-link to="/login">
          <img src="../assets/image/back.png" class="mt-3">
          </router-link></b-col>
          <b-col cols="8"><h4 class="text-center m-2"> Register</h4></b-col>
        </b-row>
        <p class="small mt-2">Let's create your account</p>
        <form @submit.prevent="register">
          <label class="small text-muted">Name</label>
          <input type="text" class="form-control mb-3" autofocus required v-model="registerName" />
          <label class="small text-muted">Email</label>
          <input type="email" class="form-control mb-3" required v-model="registerEmail" />
          <label class="small text-muted">Password</label>
          <input type="password" class="form-control" required v-model="registerPass" />
          <button type="submit" class="btn btn-violet btn-block mt-4">Register</button>
          <p class="text-muted text-center m-3">Register with</p>
        </form>
          <button class="btn btn-outline-violet btn-block mb-2">
            <img src="../assets/image/google.png" alt="google" class="mr-2 img-fluid"> Google
          </button>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import { mapActions } from 'vuex'

export default {
  name: 'Register',
  data () {
    return {
      registerName: '',
      registerEmail: '',
      registerPass: ''
    }
  },
  methods: {
    ...mapActions({
      onRegister: 'auth/onRegister'
    }),
    register () {
      const data = {
        name: this.registerName,
        email: this.registerEmail,
        password: this.registerPass
      }
      this.onRegister(data).then(result => {
        this.alertActivate()
        window.location = '/login'
      }).catch(err => this.alertError(err))
    },
    alertActivate () {
      Swal.fire(
        'Your Registration Success',
        'Please Check Your Email to activate',
        'success'
      )
    },
    alertError () {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!'
      })
    }
  }
}
</script>

<style src="../assets/css/style.css" scoped></style>
