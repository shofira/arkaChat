<template>
  <div>
    <div class="modal" tabindex="-1" id="modalforgot">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body">
            <h4 class="text-center mb-5"> ArkaChat </h4>
            <p class="small text-muted text-center mt-2">
              Forgot your password? Please, enter your email here!
              <br />
              You'll get message soon to create a new password
            </p>
            <form class="text-center container" >
              <input type="email" class="form-control" placeholder="Email" autofocus required />
              <button type="submit" class="btn btn-block btn-violet mt-4">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalForgot'
}
</script>

<style src="../assets/css/style.css" scoped></style>
