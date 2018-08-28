<template>
  <footer class="page-footer font-big font-weight-bold text-monospace bg-danger fixed-bottom">
    <div id="scrambler">
      <span>Moar scrambling?? Hit meeee!!</span>
      <h3>{{ sequence }}</h3>
    </div>
  </footer>
</template>

<script>
const numberOfMovements = 20;
const movements = ['F','B','R','L','U','D'];

export default {
  name: 'Scrambler',
  data: function(){
    return {
      sequence:""
    }
  },
  methods:{
    generate: function(e){
      this.sequence = " "; //a single space just to compensate the last one that will be inserted in last iteration
      let movementsInserted = 0;
      let lastInsertedMovement = -1;
      while(movementsInserted < numberOfMovements){
          let movementIndex = Math.floor(Math.random() * movements.length);
          if(movementIndex !== lastInsertedMovement){
              if(.5 > Math.random()){
                this.sequence = this.sequence.concat(`2`);
              }
              this.sequence = this.sequence.concat(`${movements[movementIndex]}`);
              if(.5 > Math.random()){
                this.sequence = this.sequence.concat(`'`);
              }
              this.sequence = this.sequence.concat(` `);
              lastInsertedMovement = movementIndex;
              movementsInserted++;
          }
      }
      console.log(this.sequence);
    }
  },
  mounted: function () {
      document.getElementById('scrambler').addEventListener('click',this.generate);
      this.generate();
  }
}
</script>

<style scoped>
#scrambler h3{
  color:white;
  font-size:1.5em;
}
</style>
