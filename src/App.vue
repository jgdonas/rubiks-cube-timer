<template>
  <div id="app">
    <Progress/>
    <Timer/>
    <Records/>
    <Scrambler/> 
  </div>
</template>

<script>
import Progress from './components/Progress.vue'
import Timer from './components/Timer.vue'
import Records from './components/Records.vue'
import Scrambler from './components/Scrambler.vue'

const times = [];

export default {
  name: 'app',
  components: {
    Progress,
    Timer,
    Records,
    Scrambler
  },
  provide:{
      times
  }
}
</script>

<style>

body{
  margin:0px;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
