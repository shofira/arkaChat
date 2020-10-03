<template>
  <div class="login-page">
    <div class="col-sm-4 login p-4">
      <div class="container">
        <b-row>
          <b-col cols="2"><router-link to="/login">
          <img src="../assets/image/back.png" class="mt-3">
          </router-link></b-col>
          <b-col cols="8"><h4 class="text-center m-2">Reset Password</h4></b-col>
        </b-row>
        <p class="small mt-4 text-muted text-center">Please set a secure password that contains both uppercase and lowercase as well as number and symbols. This is for your own safety</p>
        <form>
          <label class="small text-muted">New Password</label>
          <input type="password" class="form-control mb-3" />
          <label class="small text-muted">Confirm Password</label>
          <input type="password" class="form-control" />
          <button type="submit" class="btn btn-violet btn-block mt-4">Reset Password</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ForgotPassword'
}
</script>

<style src="../assets/css/style.css" scoped></style>
