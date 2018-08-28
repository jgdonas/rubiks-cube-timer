<template>
    <div class="progress fixed-top" style="height: 20px;">
        <div class="progress-bar" role="progressbar" v-bind:style="{ width: computeProgress() + '%' }" v-bind:aria-valuenow="computeProgress" aria-valuemin="0" aria-valuemax="100"></div>
    </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex';

const SPACE = 32;

export default {
  name: 'Progress',
  computed:{
    ...mapState(['currentRecord']),
    ...mapGetters(['bestTime'])
  },
  methods:{
      computeProgress: function(){
          return this.currentRecord * 100 / this.bestTime;
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.progress{
    border-radius: 0 !important;
}

.progress-bar{
    -webkit-transition:cubic-bezier(0.19, 1, 0.22, 1);
    transition: cubic-bezier(0.19, 1, 0.22, 1);;
}
</style>