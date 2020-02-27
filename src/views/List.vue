<template>
  <v-container class="pt-0 px-0">
    <v-app-bar dense class="mb-8 indigo darken-2">
      <v-toolbar-title class="white--text">UserNickname1</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn dark text>Logout</v-btn>
    </v-app-bar>

    <v-row justify="space-around">
      <v-col cols="auto" md="6">
        <v-card>
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
            :options="people.options"
            :loading="people.loading"
          ></v-data-table>
        </v-card>
      </v-col>

      <v-col cols="auto" md="6">
        <v-card>
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
            :options="planets.options"
            :loading="planets.loading"
          ></v-data-table>
        </v-card>
      </v-col>

    </v-row>
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
        options: { itemsPerPage: 5 },
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
        options: { itemsPerPage: 5 },
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
