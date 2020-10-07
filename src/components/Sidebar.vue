<template>
  <div class="sidebar-page col-sm-4">
    <div class="container mt-2">
      <b-row>
        <b-col>
          <router-link to="/home">
          <h4 class="font-weight-bold text-violet mt-2">Arkachat</h4>
          </router-link>
        </b-col>
        <b-col class="text-right text-violet">
          <b-dropdown variant="violet">
            <template v-slot:button-content>
              <b-icon-justify-left class="icon"></b-icon-justify-left>
            </template>
            <b-dropdown-item to="/profile"><b-icon-gear class="mr-3"></b-icon-gear> Setting</b-dropdown-item>
            <b-dropdown-item><b-icon-person class="mr-3"></b-icon-person> Contacts</b-dropdown-item>
            <b-dropdown-item><b-icon-telephone class="mr-3"></b-icon-telephone> Calls</b-dropdown-item>
            <b-dropdown-item><b-icon-bookmark class="mr-3"></b-icon-bookmark> Save messages</b-dropdown-item>
            <b-dropdown-item><b-icon-person-plus class="mr-3"></b-icon-person-plus> Invite Friends</b-dropdown-item>
            <b-dropdown-item><b-icon-question-circle class="mr-3"></b-icon-question-circle> ArkaChat FAQ</b-dropdown-item>
            <b-dropdown-item @click="logout"><b-icon-box-arrow-right class="mr-3"></b-icon-box-arrow-right> Logout</b-dropdown-item>
          </b-dropdown>
        </b-col>
      </b-row>
      <form>
        <div class="form">
          <button><b-icon icon="search" variant="secondary"></b-icon></button>
          <input type="text" class="form-control" placeholder="Search here" />
        </div>
        <div class="row">
          <a class="btn btn-sort"> All </a>
          <a class="btn btn-sort"> Important </a>
          <a class="btn btn-sort"> Unread </a>
        </div>
      </form>
      <hr>
      <div class="list-contact" v-for="(item, index) in listUsers" :key="index">
        <div class="contact-person form-inline" @click="selectUser(item.username)">
        <img :src="`http://localhost:3000/${item.image}`" alt="photo" class="pl-2 image-person">
          <div class="info ml-3 pt-2">
            <b>{{item.username}}</b>
            <p class="small text-violet mt-2">Ngantuk banget asli</p>
          </div>
        </div>
        <hr>
      </div>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'
import { url } from '../helper/env'
import { mapActions } from 'vuex'

export default {
  name: 'Sidebar',
  data () {
    return {
      id: localStorage.getItem('id'),
      message: '',
      socket: io(`${url}`),
      listUsers: [],
      userReceiver: null
    }
  },
  methods: {
    ...mapActions({
      onLogout: 'auth/onLogout'
    }),
    logout () {
      this.onLogout(this.id).then((result) => { window.location = '/' })
    },
    selectUser (user) {
      this.userReceiver = user
    }
  },
  mounted () {
    this.socket.emit('get-all-users', (this.id))
    this.socket.on('list-users', (data) => {
      this.listUsers = data
    })
  }
}
</script>

<style scoped>
.sidebar-page {
  /* height: 100%; */
  background-color: #fff;
  border: 1px solid #ddd;
}
.form {
  display: flex;
  background-color: #f3efef;
  border-radius: 20px;
  margin: 10px 0;
}
.form button {
  border: none;
  outline: none;
  background-color: transparent;
}
input[type="text"] {
  background: transparent;
  border: none;
  -webkit-box-shadow: none;
  box-shadow: none;
}
input[type="text"]:focus {
  -webkit-box-shadow: none;
  box-shadow: none;
  background: transparent;
}
.icon {
  width: 40px;
  height: 40px;
  margin-top: -6px;
  color: #7E98DF;
}
.text-violet {
  color:  #7E98DF;
}
.btn-sort {
  margin: auto;
}
.btn-sort:active, .btn-sort:hover {
  background-color:  #7E98DF;
  color: #fff !important;
  border-radius: 15px;
}
.btn-violet {
  -webkit-box-shadow: none;
  box-shadow: none;
  border: none;
}
.btn-violet:focus {
  -webkit-box-shadow: none;
  box-shadow: none;
  border: none;
}
.dropdown-violet {
  background-color: #7E98DF;
}
.contact-person {
  cursor: pointer;
}
.image-person {
  height: 60px;
  border-radius: 20px;
}
@media(max-width: 576px) {
  .sidebar-page {
    height: 100vh;
  }
}
</style>
