<template>
  <div>
    {{minutes}}:{{seconds}}.{{millis}}
  </div>
</template>

<script>
const SPACE = 32;

export default {
  name: 'Timer',
  inject:['times'],
  data: function(){
    return {
      time: undefined,
      timer: undefined,
      started:false,
      minutes: "00",
      seconds: "00",
      millis: "000"
    }
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
      this.millis = elapsedTime % 1000;
      elapsedTime -= this.millis;
      elapsedTime /= 1000; //seconds
      this.seconds = elapsedTime % 60;
      elapsedTime -= this.seconds;
      this.minutes = (elapsedTime % 3600) / 60;
      this.formatTime();
    },
    formatTime : function(){
      this.seconds = (this.seconds).toString().padStart(2,'0');
      this.minutes = (this.minutes).toString().padStart(2,'0');
      this.millis = (this.millis).toString().padEnd(3,'0');
    },
    registerNewTime: function(){
      let data = {
        record:`${this.minutes}:${this.seconds}.${this.millis}`, 
        totalMillis: parseInt(this.minutes) * 60000 + parseInt(this.seconds) * 1000 + parseInt(this.millis),
        datetime:new Date()
      }
      this.times.push(data);
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

</style>
