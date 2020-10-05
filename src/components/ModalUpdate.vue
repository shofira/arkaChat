<template>
  <div>
    <div class="modal" tabindex="-1" id="modalUpdate">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body">
            <h4 class="text-center mb-3">
              <img src="../assets/image/logoBlue.png" alt="logo arkachat"> ArkaChat
            </h4>
            <p class="small text-muted text-center mt-2">
              Update Your personal info here
            </p>
            <form class="container" @submit.prevent="update">
              <label class="small"> Name </label>
              <input type="text" class="form-control" v-model="detailUser.name" />
              <label class="small"> Username </label>
              <input type="text" class="form-control" v-model="detailUser.username" />
              <label class="small"> Phone Number </label>
              <input type="number" class="form-control" v-model="detailUser.phoneNumber" />
              <label class="small"> Bio </label>
              <input type="text" class="form-control" v-model="detailUser.bio" />
              <button type="submit" class="btn btn-block btn-violet mt-4">Update</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style src="../assets/css/style.css" scoped></style>

<script>
import Swal from 'sweetalert2'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ModalUpdate',
  data () {
    return {
      id: localStorage.getItem('id')
    }
  },
  computed: {
    ...mapGetters({
      detailUser: 'user/getDetail'
    })
  },
  methods: {
    ...mapActions({
      onDetail: 'user/onDetail',
      onUpdate: 'user/onUpdate'
    }),

    update () {
      const data = {
        id: this.id,
        name: this.detailUser.name,
        username: this.detailUser.username,
        phoneNumber: this.detailUser.phoneNumber,
        bio: this.detailUser.bio
      }

      this.onUpdate(data).then((response) => {
        this.alertSuccess(response)
        window.location = '/profile'
      }).catch((err) => this.alertError(err))
    },
    alertSuccess () {
      Swal.fire({
        icon: 'success',
        title: 'Your Personal Info Updated'
      })
    },
    alertError () {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!'
      })
    }
  },
  mounted () {
    this.onDetail(this.id)
  }
}
</script>
