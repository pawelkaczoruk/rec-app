<template>
  <v-container>
    
    <v-card max-width="600px">
      <v-card-title>
        People
        <v-spacer></v-spacer>
        <v-text-field
          v-model="people.search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="people.headers"
        :items="people.list"
        :search="people.search"
        items-per-page="5"
        :loading="people.loading"
      ></v-data-table>
    </v-card>

    <v-card max-width="600px">
      <v-card-title>
        Planets
        <v-spacer></v-spacer>
        <v-text-field
          v-model="planets.search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="planets.headers"
        :items="planets.list"
        :search="planets.search"
        items-per-page=5
        :loading="planets.loading"
      ></v-data-table>
    </v-card>

  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  name: 'List',
  data() {
    return {
      people: {
        search: '',
        list: [],
        headers: [
          { text: 'Name', value: 'name' },
          { text: 'Height', value: 'height', filterable: false },
          { text: 'Gender', value: 'gender', filterable: false },
          { text: 'Birth Year', value: 'birth_year', filterable: false },
        ],
        loading: true
      },
      planets: {
        search: '',
        list: [],
        headers: [
          { text: 'Name', value: 'name' },
          { text: 'Diameter', value: 'diameter', filterable: false },
          { text: 'Terrain', value: 'terrain', filterable: false },
          { text: 'Population', value: 'population', filterable: false },
        ],
        loading: true
      }
    }
  },
  methods: {
    // get data from api
    getData(apiURL, resource) {
      axios.get(apiURL)
        .then(res => this.addData(res.data, resource))
        .catch(err => alert(err));
    },

    // add data to array
    addData(data, resource) {
      for(let i=0; i<data.results.length; i++) {
        this[resource].list.push(data.results[i]);
      }

      data.next ? this.getData(data.next, resource) : this[resource].loading = false;
    }
  },
  created() {
    const apiURL = 'https://swapi.co/api/';
    this.getData(apiURL+'people', 'people');
    this.getData(apiURL+'planets', 'planets');
  }
}
</script>

<style scoped>

</style>
