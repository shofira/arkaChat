<template>
  <div class="chatlist-page">
    <Navbar />
    <div class="chatlist p-3">
      <div class="chat-main">
        <div class="chat">
          <b-row>
            <b-col cols="3"><img src="../assets/image/friends.png" alt="photo friends"></b-col>
            <b-col cols="6"><p class="font-weight-bold">Theresa Webb</p></b-col>
            <b-col><p class="small text-muted text-right">15.30</p></b-col>
          </b-row>
          <p class="small text-violet ml-5">Why did you do that?</p>
        </div>
        <hr>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'

export default {
  name: 'ChatList',
  components: {
    Navbar
  }
}
</script>

<style>
.chatlist-page {
  width: 50%;
  background-color: #fff;
}
.chatlist {
  /* border: 1px solid black; */
  height: 500px;
}
.text-violet{
  color: #7E98DF;
}
@media(max-width: 576px) {
  .chatlist-page {
    width: 100%;
  }
}
</style>
