<template>
  <div class="container">
    <b-navbar toggleable type="light" class="navbar">
    <b-navbar-brand href="#">ArkaChat</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item to="/profile"><b-icon-gear class="mr-3"></b-icon-gear> Setting</b-nav-item>
        <b-nav-item><b-icon-person class="mr-3"></b-icon-person> Contacts</b-nav-item>
        <b-nav-item><b-icon-telephone class="mr-3"></b-icon-telephone> Calls</b-nav-item>
        <b-nav-item><b-icon-bookmark class="mr-3"></b-icon-bookmark> Save messages</b-nav-item>
        <b-nav-item><b-icon-person-plus class="mr-3"></b-icon-person-plus> Invite Friends</b-nav-item>
        <b-nav-item><b-icon-question-circle class="mr-3"></b-icon-question-circle> ArkaChat FAQ</b-nav-item>
        <b-nav-item @click="logout()"><b-icon-box-arrow-right class="mr-3"></b-icon-box-arrow-right> Logout</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
    </b-navbar>
    <form>
      <div class="form m-3">
        <button><b-icon icon="search" variant="secondary"></b-icon></button>
        <input class="search-form" placeholder="Type your message" />
        <b-icon-plus class="icon"></b-icon-plus>
      </div>
      <div class="row">
        <a class="btn"> All </a>
        <a class="btn"> Important </a>
        <a class="btn"> Unread </a>
      </div>
    </form>
  </div>
</template>

<style>
.navbar {
  color: #7E98DF;
}
.form {
  display: flex;
}
.form button {
  border: none;
  outline: none;
  background-color: #FAFAFA;
}
.search-form {
  background-color: #FAFAFA;
  border-radius: 20px;
  border: none;
}
.search-form:focus {
  outline: none;
  -webkit-box-shadow: none;
  box-shadow: none;
}
.icon {
  width: 40px;
  height: 40px;
  padding-bottom: 8px;
  color: #7E98DF;
}
.btn {
  margin: auto;
  margin-bottom: 10px;
}
.btn:active, .btn:hover {
  background-color:  #7E98DF;
  color: #fff !important;
  border-radius: 15px;
}
</style>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Navbar',
  data () {
    return {
      id: localStorage.getItem('id')
    }
  },
  methods: {
    ...mapActions({
      onLogout: 'auth/onLogout'
    }),
    logout () {
      this.onLogout(this.id).then((result) => { window.location = '/' })
    }
  }
}
</script>
