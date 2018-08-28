<template>
    <div class="table-hover table-responsive h-50 ">
        <h3>Your records  <span class="badge badge-pill  badge-success">{{this.times.length}}</span></h3>
        <b-btn id="info" variant="outline-info">Info</b-btn>
        <b-tooltip target="info" placement="auto">
            All you have to do to is click on the timer or hit your space bar before you start solvint it and do it again when you are done! <br>
            Your records will be automatically stored. If you want to remove any of them, just double click on it!<br>
            You can keep them as long as you use the same browser, no problem with reloading your tab or closing your browser.
        </b-tooltip>
        <div id="recordsTable">
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Record</th>
                        <th scope="col">Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(time,index) in times" :key="time.id" @dblclick="removeTime(time.id)">
                        <td>{{ index + 1 }}</td>
                        <td><h5><span class="badge badge-success">{{ time.formatedTime }}</span></h5></td>
                        <td>{{ time.date }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  name: 'Records',
  methods:{
      removeTime: function(timeId){
         this.$store.commit('removeTime', timeId);
      }
  },
  computed: {
      ...mapState(['times'])
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
th{
    font-weight: 600;
}

#recordsTable{
    max-width: 400px;
    margin:auto;
    margin-top:15px;
}
</style>
