<template>
  <div class="about">
    <div class="row">
      <!-- Sidebar -->
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
      <form >
        <div class="form">
          <button><b-icon icon="search" variant="secondary"></b-icon></button>
          <input type="text" class="form-control" placeholder="Search here" v-model="keyword" />
        </div>
        <div class="row">
          <a class="btn btn-sort"> All </a>
          <a class="btn btn-sort"> Important </a>
          <a class="btn btn-sort"> Unread </a>
        </div>
      </form>
      <hr>
      <div class="list-contact" v-for="(item, index) in listUsers" :key="index">
        <div v-if="username !== item.username">
          <div class="contact-person form-inline" @click="selectUser(item.username), selectImage(item.image), selectId(item.id)">
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
  </div>

    <!-- Chat Content -->
      <div class="col-sm-8">
        <div class="chat-page">
          <div v-if="userReceiver === null || userReceiverImage === null">
            <p class="text-muted text-empty d-none d-sm-block">Plese select a chat to start messaging</p>
          </div>
          <div v-else>
            <div class="header-info form-inline" v-b-toggle.friend-info>
              <FriendDetail />
              <img :src="`http://localhost:3000/${userReceiverImage}`" alt="photo" class="m-2 image-person">
              <div class="info ml-3">
                <b>{{userReceiver}}</b>
                <div v-if="typing === userReceiver">
                  <p class="small text-violet">{{typing}} is typing</p>
                </div>
                <div v-else>
                  <p class="small text-violet">online</p>
                </div>
              </div>
            </div>
            <div class="chat-content">
              <div v-if="userReceiver">
                <div v-for="(item, index) in privateMessages" :key="index">
                  {{item.message}}
                </div>
              </div>
              <div v-else>
                <div v-for="(item, index) in listMessage" :key="index">
                  {{item.message}}
                </div>
              </div>
            </div>
            <form @submit.prevent="sendMessage()">
              <div class="form m-3">
                <input type="text" class="form-control" placeholder="Type message here ..." v-model="message">
                <button><b-icon icon="plus" variant="secondary"></b-icon></button>
                <button><b-icon icon="emoji-smile" variant="secondary"></b-icon></button>
                <button><b-icon icon="file-image" variant="secondary"></b-icon></button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'
import { url } from '../helper/env'
import { mapActions } from 'vuex'
import FriendDetail from '../components/FriendDetail'

export default {
  name: 'Home',
  data () {
    return {
      id: localStorage.getItem('id'),
      username: localStorage.getItem('username'),
      socket: io(`${url}`),
      message: '',
      userReceiver: null,
      userReceiverImage: null,
      listUsers: [],
      listMessage: [],
      privateMessages: [],
      typing: false,
      keyword: null
    }
  },
  components: {
    FriendDetail
  },
  watch: {
    message (value) {
      value ? this.socket.emit('typing', this.username) : this.socket.emit('stopTyping')
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
      const privateMessage = this.listMessage.filter((e) => e.sender === e.userReceiver || e.sender === e.username)
      this.privateMessages = privateMessage
    },
    selectImage (image) {
      this.userReceiverImage = image
    },
    selectId (iduser) {
      localStorage.setItem('receiver', iduser)
    },
    sendMessage () {
      const msg = `${this.username} : ${this.message}`
      this.listMessage = [...this.listMessage, {
        sender: this.username,
        receiver: this.userReceiver,
        message: msg
      }]

      this.socket.emit('send-message', {
        sender: this.username,
        receiver: this.userReceiver,
        message: msg
      })
      this.message = ''
    }
  },
  mounted () {
    this.socket.on('connection', (data) => {
      this.connections = data
    })
    this.socket.emit('get-all-users', (this.id))
    this.socket.on('list-users', (data) => {
      this.listUsers = data
    })
    this.socket.emit('join-room', {
      user: this.username
    })
    this.socket.on('list-messages', (data) => {
      this.listMessage = [...this.listMessage, data]
      const privateMessage = this.listMessage.filter((e) => e.sender === e.userReceiver || e.sender === e.username)
      this.privateMessages = privateMessage
    })
    this.socket.on('typing', (username) => {
      this.typing = username
    })

    this.socket.on('stopTyping', () => {
      this.typing = false
    })
  }
}
</script>

<style scoped>
.about {
  height: 100vh;
  background-color: #FAFAFA;
}
.text-empty {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.chat-page {
  margin-left: -15px;
  height: 100vh;
}
.header-info {
  padding: 5px;
  background-color: #fff;
}
.text-violet {
  color:  #7E98DF;
}
.chat-content {
  height: 500px;
  border-bottom: 1px solid #ddd;
  background-color:#F6F6F6;
}
input[type="text"] {
  background-color: transparent;
  border: none;
  -webkit-box-shadow: none;
  box-shadow: none;
  position: relative;
  bottom: 0;
}
input[type="text"]:focus {
  background-color: transparent;
  -webkit-box-shadow: none;
  box-shadow: none;
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

/* Sidebar */
.sidebar-page {
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
  .chat-page {
  margin-left: 0px;
  height: 100%;
  }
  .sidebar-page {
    height: 100vh;
  }
  .chat-content {
  height: 430px;
  }
}
</style>
