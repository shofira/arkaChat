<template>
  <div>
    <div class="row">
      <div class="col-sm-3 mr-5">
        <h3>Telegram</h3>
      </div>
      <div class="col-sm-1">
        <b-dropdown class="dropdown" >
          <template v-slot:button-content>
            <b-icon icon="text-left"></b-icon>
          </template>
          <b-dropdown-item href="#"> <b-icon-gear class="mr-3"></b-icon-gear> Setting</b-dropdown-item>
          <b-dropdown-item href="#"> <b-icon-person class="mr-3"></b-icon-person> Contacts</b-dropdown-item>
          <b-dropdown-item href="#"> <b-icon-telephone class="mr-3"></b-icon-telephone> Calls</b-dropdown-item>
          <b-dropdown-item href="#"> <b-icon-bookmark class="mr-3"></b-icon-bookmark> Save messages</b-dropdown-item>
          <b-dropdown-item href="#"> <b-icon-person-plus class="mr-3"></b-icon-person-plus> Invite Friends</b-dropdown-item>
          <b-dropdown-item href="#"> <b-icon-question-circle class="mr-3"></b-icon-question-circle> ArkaChat FAQ</b-dropdown-item>
          <b-dropdown-item href="#" @click="logout()"> <b-icon-box-arrow-right class="mr-3"></b-icon-box-arrow-right> Logout</b-dropdown-item>
        </b-dropdown>
      </div>
    </div>
  </div>
</template>

<style>
.dropdown {
  background: #7E98DF;
  border-radius: 35px 10px 35px 35px;
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
