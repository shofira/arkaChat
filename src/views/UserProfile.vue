<template>
  <div class="user-page">
    <b-row>
      <b-col class="col-sm-4 card-user">
        <b-row class="m-3">
          <b-col cols="2"><router-link to="/home">
          <img src="../assets/image/back.png" class="mt-2">
          </router-link></b-col>
          <b-col cols="8">
            <h5 class="text-center text-violet"> @{{ detailUser.username }} </h5>
          </b-col>
        </b-row>
        <form enctype="multipart/form-data" @change.prevent="update">
          <div class="text-center">
            <img :src="`http://3.83.166.46:3000/${detailUser.image}`" alt="photo profile" class="profile-image">
            <h5 class="font-weight-bold mt-3">{{ detailUser.name }}</h5>
            <p class="text-muted">@{{ detailUser.username }}</p>
            <label class="custom-file-upload">
              <input type="file" @change="upload($event)"/>
              Select Photo
            </label>
          </div>
        </form>

        <div class="ml-4 mr-3">
          <b>Account</b>
          <p class="small text-violet setting" data-toggle="modal" data-target="#modalUpdate">
            tap to change
          </p>
          <ModalUpdate />
          <p class="small">{{ detailUser.phoneNumber }}</p>
          <p class="small text-muted">Phone number</p>
          <hr>
          <b class="small">@{{ detailUser.username }}</b>
          <p class="small text-muted">Username</p>
          <hr>
          <b class="small">{{ detailUser.bio }}</b>
          <p class="small text-muted">Bio</p>
          <b>Settings</b>
          <p class="setting"> <b-icon-bell class="mr-2"></b-icon-bell> Notification and Sounds</p>
          <p class="setting"> <b-icon-lock class="mr-2"></b-icon-lock> Private and Security</p>
          <p class="setting"> <b-icon-graph-up class="mr-2"></b-icon-graph-up> Data and Storage</p>
          <p class="setting"> <b-icon-chat-square-text class="mr-2"></b-icon-chat-square-text> Chat Setting</p>
          <p class="setting"> <b-icon-laptop class="mr-2"></b-icon-laptop> Devices</p>
        </div>
      </b-col>
      <b-col class=" d-none d-sm-block bg-info">adsf</b-col>
    </b-row>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import { mapGetters, mapActions } from 'vuex'
import ModalUpdate from '../components/ModalUpdate'

export default {
  name: 'UserProfile',
  data () {
    return {
      id: localStorage.getItem('id')
    }
  },
  components: {
    ModalUpdate
  },
  computed: {
    ...mapGetters({
      detailUser: 'user/getDetail'
    })
  },
  methods: {
    ...mapActions({
      onDetail: 'user/onDetail',
      onUpdate: 'user/updateImage'
    }),
    upload (event) {
      this.image = event.target.files[0]
    },
    update () {
      const data = {
        id: this.id,
        image: this.image
      }

      this.onUpdate(data).then((response) => {
        if (response.data.message === 'Max size upload is 2mb!') {
          this.alertSize()
        } else if (response.data.message === 'File must be jpg or jpeg and max size 2mb') {
          this.alertValidation()
        } else {
          this.alertSuccess()
          window.location = '/profile'
        }
      }).catch((err) => this.alertError(err))
    },
    alertSuccess () {
      Swal.fire({
        icon: 'success',
        title: 'Image Updated'
      })
    },
    alertSize () {
      Swal.fire({
        icon: 'error',
        title: 'Image size is too big!',
        text: 'Please upload another one with size < 5mb'
      })
    },
    alertValidation () {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Image type must be JPG or JPEG'
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

<style scoped>
.user-page {
  overflow: hidden;
}
.card-user {
  height: 100%;
}
.text-violet {
  color:  #7E98DF;
}
.profile-image {
  width: 20%;
  height: 5%;
  border-radius: 30px;
}
input[type="file"] {
  display: none;
  border-radius: 10px;
  font-weight: bold;
  padding: 8px;
  margin: 20px auto;
}
.custom-file-upload {
  border: 1px solid #ccc;
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
  background-color: #FFFFFF;
  border: 1px solid #7E98DF;
  box-sizing: border-box;
  border-radius: 10px;
  color: #7E98DF;
  margin-bottom: 15px;
}
.setting {
  cursor: pointer;
  margin: 15px 0;
}
</style>
