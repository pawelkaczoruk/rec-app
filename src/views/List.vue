<template>
  <v-container>
    
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  name: 'List',
  data() {
    return {
      people: [],
      planets: []
    }
  },
  created() {
    // get data from swapi
    axios.get('https://swapi.co/api/people/')
      .then(res => this.people = res.data)
      .catch(() => {alert('There was unexpected error. Please try to reload page')});
    axios.get('https://swapi.co/api/planets/')
      .then(res => this.planets = res.data)
      .catch(() => {alert('There was unexpected error. Please try to reload page')});
  }
}
</script>

<style scoped>

</style>
