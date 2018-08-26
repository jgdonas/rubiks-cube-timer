<template>
    <table>
        <thead>Previous results</thead>
        <tbody>
            <tr v-for="time in times" :key="time.datetime" >
                <td>{{time.millis}}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>

export default {
  name: 'Records',
  inject:['times'],
  methods:{},
  mounted: function () {
     
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
