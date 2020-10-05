<template>
  <div class="home">
    <b-row>
      <b-col cols="4"><ChartList /></b-col>
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
