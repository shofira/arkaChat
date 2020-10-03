<template>
  <div class="login-page">
    <div class="col-sm-4 login p-4">
      <div class="container">
        <h4 class="text-center m-2">Login</h4>
        <p class="small">Hi, Welcome Back</p>
        <form>
          <label class="small text-muted">Email</label>
          <input type="email" class="form-control mb-3" autofocus required />
          <label class="small text-muted">Password</label>
          <input type="password" class="form-control" required />
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

<script>
import ModalForgot from '../components/ModalForgot'

export default {
  name: 'Login',
  components: {
    ModalForgot
  }
}
</script>

<style src="../assets/css/style.css" scoped></style>
