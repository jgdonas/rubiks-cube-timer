<template>
    <div class="table-hover table-responsive h-50 ">
        <h3>Your records</h3>
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
                    <tr v-for="(time,index) in times" :key="time.id" >
                        <td>{{ index + 1 }}</td>
                        <td>{{ time.formatedTime }}</td>
                        <td>{{ time.date.toLocaleString() }}</td>
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
  methods:{},
  computed: {
      ...mapState(['times'])
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#recordsTable{
    max-width: 400px;
    margin:auto;
}
</style>
