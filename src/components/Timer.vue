<template>
  <div id="timer" class="container-fluid">
      <span class="minutes align-middle">{{formattedTime.minutes}}:</span>
      <span class="seconds align-middle">{{formattedTime.seconds}}</span>
      <span class="millis align-middle">.{{formattedTime.millis}}</span>
  </div>
</template>

<script>

import TimeRecord from './../classes/TimeRecord'
import {mapState} from 'vuex';

const SPACE = 32;

export default {
  name: 'Timer',
  data: function(){
    return {
      time: undefined,
      timer: undefined,
      started:false,
      formattedTime:{
        minutes: "00",
        seconds: "00",
        millis: "000"
      }
    }
  },
  computed: {
    ...mapState(['times'])
  },
  methods:{
    start: function(){
      this.started = true;
      this.time = Date.now();
      this.timer = setInterval(this.showCurrentTime,1);
    },
    stop: function(){
      this.registerNewTime();
      this.started = false;
      clearInterval(this.timer);
      this.timer = undefined;
    },
    showCurrentTime: function(){
      let elapsedTime = Date.now() - this.time; //milliseconds
      this.formattedTime = TimeRecord.formatTime(elapsedTime);
    },
    registerNewTime: function(){
      let timeInMillis  = parseInt(this.formattedTime.minutes) * 60000 + parseInt(this.formattedTime.seconds) * 1000 + parseInt(this.formattedTime.millis);
      let timeRecord = new TimeRecord(timeInMillis);
      this.$store.commit('addTime', timeRecord);
    },
    keymonitor: function(event){
      console.info("key stroke detected");
      if(SPACE === event.keyCode){
        
        if(this.started){
          this.stop();
          console.info("Timer stopped");
        }else{
          this.start();
          console.info("Timer started");
        }
      }
    }
  },
  created: function () {
    window.addEventListener('keyup', this.keymonitor)
  },
  mounted: function(){
    console.info("Component mounted");
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.millis{
  font-size: 6vw;
}

.seconds, .minutes{
  font-size: 12vw;
}

</style>
