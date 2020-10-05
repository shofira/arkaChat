<template>
  <div class="login-page">
    <div class="col-sm-4 login p-4">
      <div class="container">
        <h4 class="text-center m-2">Login</h4>
        <p class="small">Hi, Welcome Back</p>
        <form @submit.prevent="login">
          <label class="small text-muted">Email</label>
          <input type="email" class="form-control mb-3" autofocus required v-model="form.loginEmail" />
          <label class="small text-muted">Password</label>
          <input type="password" class="form-control" required v-model="form.loginPass" />
          <p class="small text-violet text-right mt-3" data-toggle="modal" data-target="#modalforgot">Forgot Password ?</p>
          <ModalForgot />
          <button type="submit" class="btn btn-violet btn-block">Login</button>
        </form>
          <p class="text-muted text-center m-3">Login with</p>
          <button class="btn btn-outline-violet btn-block">
            <img src="../assets/image/google.png" alt="google" class="mr-2 img-fluid"> Google
          </button>
          <p class="small text-muted text-center mt-3">Dont have an account ? <router-link to="/register">Sign Up</router-link></p>
      </div>
    </div>
  </div>
</template>

<style src="../assets/css/style.css" scoped></style>

<script>
import Swal from 'sweetalert2'
import { mapActions } from 'vuex'
import ModalForgot from '../components/ModalForgot'

export default {
  name: 'Login',
  data () {
    return {
      form: {
        loginEmail: null,
        loginPass: null
      }
    }
  },
  components: {
    ModalForgot
  },
  methods: {
    ...mapActions({
      onLogin: 'auth/onLogin'
    }),
    login () {
      this.onLogin(this.form).then(result => {
        console.log(result)
        if (result === "Cannot read property 'password' of undefined") {
          this.alertExist()
          localStorage.removeItem('id')
          localStorage.removeItem('token')
          localStorage.removeItem('refreshToken')
        } else if (result === 'Need Activation') {
          this.alertActivate()
          localStorage.removeItem('id')
          localStorage.removeItem('token')
          localStorage.removeItem('refreshToken')
        } else if (result === 'Incorrect password! Please try again') {
          this.alertMatch()
          localStorage.removeItem('id')
          localStorage.removeItem('token')
          localStorage.removeItem('refreshToken')
        } else {
          window.location = '/home'
        }
      }).catch(err => this.alertError(err.message))
    },
    alertExist () {
      Swal.fire({
        icon: 'error',
        title: 'Username Doesnt Exist!',
        text: 'Please check your personal info or create a new one'
      })
    },
    alertActivate () {
      Swal.fire({
        icon: 'warning',
        title: 'This Account need to verified!',
        text: 'Please check your email account to activate'
      })
    },
    alertMatch () {
      Swal.fire({
        icon: 'question',
        title: 'Username and Password Doesnt Match!'
      })
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
