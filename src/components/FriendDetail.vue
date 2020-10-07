<template>
  <div>
    <b-sidebar id="friend-info" bg-variant="white" right no-header shadow>
      <div class="p-3">
        <div class="text-center">
          <img :src="`http://localhost:3000/${detailUser.image}`" alt="photo profile" class="profile-image mt-3">
          <p class="font-weight-bold m-3">{{ detailUser.name }}</p>
        </div>
        <b>Info personal</b>
          <p class="small text-muted mt-3">Phone number</p>
          <p class="small">0{{ detailUser.phoneNumber }}</p>
          <hr>
          <p class="small text-muted">Username</p>
          <b class="small">@{{ detailUser.username }}</b>
          <hr>
          <p class="small text-muted mt-3">Email</p>
          <p class="small">{{ detailUser.email }}</p>
          <hr>
          <p class="small text-muted">Bio</p>
          <b class="small">{{ detailUser.bio }}</b>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'FriendsDetail',
  data () {
    return {
      id: localStorage.getItem('receiver')
    }
  },
  computed: {
    ...mapGetters({
      detailUser: 'user/getDetail'
    })
  },
  methods: {
    ...mapActions({
      onDetail: 'user/onDetail'
    })
  },
  mounted () {
    this.onDetail(this.id)
  }
}
</script>

<style>
.profile-image {
  width: 35%;
  height: 20%;
  border-radius: 20px;
}
.text-violet {
  color:  #7E98DF;
}
</style>
