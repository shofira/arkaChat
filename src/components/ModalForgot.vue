<template>
  <div>
    <div class="modal" tabindex="-1" id="modalforgot">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body">
            <h4 class="text-center mb-5">
              <img src="../assets/image/logoBlue.png" alt="logo arkachat">
              ArkaChat
            </h4>
            <p class="small text-muted text-center mt-2">
              Forgot your password? Please, enter your email here!
              <br />
              You'll get message soon to create a new password
            </p>
            <form class="text-center container" @submit.prevent="forgotPassword">
              <input type="email" class="form-control" placeholder="Email" autofocus required v-model="forgotEmail" />
              <button type="submit" class="btn btn-block btn-violet mt-4">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import { mapActions } from 'vuex'

export default {
  name: 'ModalForgot',
  data () {
    return {
      forgotEmail: null
    }
  },
  methods: {
    ...mapActions({
      onForgotPassword: 'auth/onForgotPassword'
    }),
    forgotPassword () {
      const data = {
        email: this.forgotEmail
      }
      this.onForgotPassword(data).then(result => {
        this.alertActivate(result)
        location.reload()
      }).catch(err => this.alertError(err.message))
    },
    alertActivate () {
      Swal.fire(
        'Check your email',
        'Please Check Your Email to reset password',
        'success'
      )
    },
    alertError () {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Send Email Failed!'
      })
    }
  }
}
</script>

<style src="../assets/css/style.css" scoped></style>
