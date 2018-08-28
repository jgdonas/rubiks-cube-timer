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

export default {
  name: 'app',
  components: {
    Progress,
    Timer,
    Records,
    Scrambler
  }
}
</script>

<style>

html,body{height:100%;}

body{
  margin:0px;
  padding-top: 20px;
}

#app {
  height:100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>