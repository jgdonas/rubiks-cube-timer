<template>
    <div class="progress fixed-top" style="height: 20px;">
        <div class="progress-bar" role="progressbar" v-bind:style="{ width: progress + '%' }" v-bind:aria-valuenow="progress" aria-valuemin="0" aria-valuemax="100"></div>
    </div>
</template>

<script>

import {mapState, mapGetters} from 'vuex';

const TIME_BETWEEN_CHECKS = 1; //mills
const SPACE = 32;

export default {
  name: 'Progress',
  data: function(){
      return{
          progress:0,
          started:false,
          timer:undefined,
          startTime:0
      }
  },
  computed:{
    ...mapState(['times']),
    ...mapGetters(['bestTime'])
  },
  methods:{
      start: function(){
          this.started = true;
          this.progress = 0;
          this.startTime = Date.now();
          if(this.times.length > 0 && this.bestTime !== 0){
              this.timer = setInterval(this.incrementProgress,TIME_BETWEEN_CHECKS);
          }
      },
      stop: function(){
          clearInterval(this.timer);
          this.started = false;
      },
      incrementProgress: function(){
          let elapsedTimeFromStart = Date.now() -  this.startTime;
          this.progress = elapsedTimeFromStart * 100 / this.bestTime; 
      },
      keymon: function(event){
        if(SPACE === event.keyCode){

            if(this.started){
                this.stop();
            }else{
                this.start();  
            }
        }
      }
  },
  created: function () {
    window.addEventListener('keyup', this.keymon);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.progress{
    border-radius: 0 !important;
}

.progress-bar{
    -webkit-transition:ease;
    transition: ease;
}
</style>