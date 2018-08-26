<template>
    <progress max="100" v-bind:value="progress" v-bind:class="progressClass">
        <div class="progress-bar">
            <span v-bind:style="{ width: progress + '%' }">{{progress}}%</span>
        </div>
        <span>{{progress}}</span>
    </progress>    
</template>

<script>
//{bestTime > 0 ? active : inactive }
const TIME_BETWEEN_CHECKS = 10; //mills
const SPACE = 32;

export default {
  name: 'Progress',
  inject:['times'],
  data: function(){
      return{
          progress:0,
          bestTime:0,
          started:false,
          timer:undefined,
          elapsedTimeFromStart:0
      }
  },
  computed:{
    progressClass: function(){
        return{
            active: this.bestTime !== 0,
            inactive: this.bestTime === 0
        }
    }
  },
  methods:{
      start: function(){
          this.started = true;
          this.progress = 0;
          this.elapsedTimeFromStart = 0;
          if(this.bestTime > 0){
              this.timer = setInterval(this.incrementProgress,TIME_BETWEEN_CHECKS);
          }
      },
      stop: function(){
          clearInterval(this.timer);
          this.started = false;
          this.getBestTime();
      },
      incrementProgress: function(){
          this.elapsedTimeFromStart += TIME_BETWEEN_CHECKS;
          this.progress = this.elapsedTimeFromStart * 100 / this.bestTime; 
      },
      getBestTime: function(){
          if(this.times.length > 0){
            this.bestTime = this.times[0].totalMillis;
            for(var i = 1; i< this.times.length; i++){
                if(this.times[i].totalMillis < this.bestTime){
                    this.bestTime = this.times[i].totalMillis;
                }
            }
          }
          
      },
      keymon: function(event){
        console.info("key stroke detected from progress bar");
        if(SPACE === event.keyCode){
            if(this.started){
                this.stop();
            }else{
                this.start();  
            }
        }
      }
  },
  mounted: function () {
     
  },
  created: function () {
    window.addEventListener('keyup', this.keymon);
    this.getBestTime();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

progress.active{
    display:block
}

progress.inactive{
    display:none
}
    
progress[value] {
	border: none;
	/* dimensions */
	width: 100%; height: 20px;

	background-color: whiteSmoke;
	box-shadow: 0 2px 3px rgba(0,0,0,.5) inset;
}

/*
Webkit browsers provide two pseudo classes that can be use to style HTML5 progress element.
-webkit-progress-bar -> To style the progress element container
-webkit-progress-value -> To style the progress element value.
*/
progress[value]::-webkit-progress-bar {
	background-color: whiteSmoke;
	box-shadow: 0 2px 3px rgba(0,0,0,.5) inset;
}

progress[value]::-webkit-progress-value {
	position: relative;
	background-size: 35px 20px, 100% 100%, 100% 100%;
	/* Let's animate this */
	animation: animate-stripes 5s linear infinite;
}

@keyframes animate-stripes { 100% { background-position: -100px 0; } }

/* Let's spice up things little bit by using pseudo elements. */
progress[value]::-webkit-progress-value:after {
	/* Only webkit/blink browsers understand pseudo elements on pseudo classes. A rare phenomenon! */
	content: '';
	position: absolute;
	width:5px; height:5px;
	top:7px; right:7px;
	background-color: white;
}

/* Firefox provides a single pseudo class to style the progress element value and not for container. -moz-progress-bar */
progress[value]::-moz-progress-bar {
	/* Gradient background with Stripes */
	background-image:
	-moz-linear-gradient( 135deg,
													 transparent,
													 transparent 33%,
													 rgba(0,0,0,.1) 33%,
													 rgba(0,0,0,.1) 66%,
													 transparent 66%),
    -moz-linear-gradient( top,
														rgba(255, 255, 255, .25),
														rgba(0,0,0,.2)),
    -moz-linear-gradient( left, #09c, #f44);
	
	background-size: 35px 20px, 100% 100%, 100% 100%;
	
	/* Firefox doesn't support CSS3 keyframe animations on progress element. Hence, we did not include animate-stripes in this code block */
}

/* Fallback technique styles */
.progress-bar {
	background-color: whiteSmoke;
	box-shadow: 0 2px 3px rgba(0,0,0,.5) inset;
	/* Dimensions should be similar to the parent progress element. */
	width: 100%; height:20px;
}
</style>