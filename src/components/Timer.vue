<template>
  <div id="timer" class="container-fluid" @click="summonChronos">
      <span class="minutes align-middle">{{formattedTime.minutes}}:</span>
      <span class="seconds align-middle">{{formattedTime.seconds}}</span>
      <span class="millis align-middle">.{{formattedTime.millis}}</span>
  </div>
</template>

<script>
import TimeRecord from './../classes/TimeRecord'
import {mapState} from 'vuex';

const SPACE = 32;
const MILLIS_BETWEEN_CHRONO_UPDATES = 5;
const MILLIS_BETWEEN_RECORD_EMITS = 100;

export default {
  name: 'Timer',
  data: function(){
    return {
      elapsedTime:0,
      time: undefined,
      timers: [],
      started:false,
      formattedTime:{
        minutes: "00",
        seconds: "00",
        millis: "000"
      }
    }
  },
  computed: {
    ...mapState(['currentRecord','times'])
  },
  methods:{
    start: function(){
      this.started = true;
      this.startTime = Date.now();
      this.timers.push(setInterval(this.showCurrentTime,MILLIS_BETWEEN_CHRONO_UPDATES));
      this.timers.push(setInterval(this.emitCurrentRecord,MILLIS_BETWEEN_RECORD_EMITS));
    },
    stop: function(){
      this.registerNewTime();
      this.started = false;
      this.clearIntervals();
      this.timer = undefined;
    },
    clearIntervals: function(){
      for(var timer of this.timers){
        clearInterval(timer);
      }
    },
    showCurrentTime: function(){
      this.elapsedTime = Date.now() - this.startTime; //milliseconds
      this.formattedTime = TimeRecord.formatTime(this.elapsedTime);
    },
    emitCurrentRecord: function(){
      this.$store.commit('setCurrentRecord',this.elapsedTime);
    },
    registerNewTime: function(){
      let timeRecord = new TimeRecord(this.elapsedTime);
      this.$store.commit('addTime', timeRecord);
    },
    summonChronos: function(){
      if(this.started){
          this.stop();
          console.info("Timer stopped");
        }else{
          this.start();
          console.info("Timer started");
        }
    },
    keymonitor: function(event){
      console.info("key stroke detected");
      if(SPACE === event.keyCode){
        this.summonChronos();
      }
    }
  },
  created: function () {
    window.addEventListener('keyup', this.keymonitor)
  }
}
</script>

<style scoped>
.millis{
  font-size: 6vw;
}

.seconds, .minutes{
  font-size: 12vw;
}
</style>
