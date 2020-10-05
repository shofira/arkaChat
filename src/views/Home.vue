<template>
  <div class="home">
    <b-row>
      <b-col><ChartList /></b-col>
      <b-col class="d-none d-sm-block chat-right">
        <p class="text-muted">Please select a chat to start messaging</p>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import ChartList from '../components/ChatList'

export default {
  name: 'Home',
  components: {
    ChartList
  }
}
</script>

<style>
.home {
  overflow: hidden;
}
.chat-right {
  margin: auto;
}
</style>
