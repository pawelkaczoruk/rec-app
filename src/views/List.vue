<template>
  <v-container class="pt-0 px-0">
    <v-app-bar dense class="mb-8 indigo darken-2">
      <v-toolbar-title class="white--text">Dive into SW data</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="onLogout()" dark text>Logout</v-btn>
    </v-app-bar>

    <v-row justify="space-around">
      <v-col cols="auto" md="6">
        <v-card>
          <v-card-title>
            People
            <v-spacer></v-spacer>
            <v-form @submit="searchData(people.search, 'people')" class="d-flex">
              <v-text-field
                class="pt-0"
                v-model="people.search"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
              <v-btn 
                type="submit"
                depressed 
                fab 
                small
              >
                <v-icon>mdi-magnify</v-icon>
              </v-btn>
            </v-form>

          </v-card-title>
          <v-data-table
            :headers="people.headers"
            :items="people.list"
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
            <v-form @submit="searchData(planets.search, 'planets')" class="d-flex">
              <v-text-field
                class="pt-0"
                v-model="planets.search"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
              <v-btn
                type="submit"
                depressed 
                fab 
                small
              >
                <v-icon>mdi-magnify</v-icon>
              </v-btn>
            </v-form>

          </v-card-title>
          <v-data-table
            :headers="planets.headers"
            :items="planets.list"
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
import { mapActions } from 'vuex'

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
    ...mapActions(["logout"]),

    // logout from app
    onLogout() {
      this.logout();
      this.$router.push('login');
    },

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
    },

    // search by name
    searchData(value, resource) {
      const apiURL = 'https://swapi.co/api/';

      event.preventDefault();
      this[resource].loading = true;
      if(value === '') {
        this[resource].list = [];
        this.getData(`${apiURL}${resource}`, resource);
      } else {
        axios.get(`${apiURL}${resource}/?search=${value}`)
          .then(res => {
            this[resource].list = res.data.results;
            this[resource].loading = false;
          }).catch(err => alert(err));
      }
    }
  },
  created() {
    const apiURL = 'https://swapi.co/api/';
    this.getData(apiURL+'people', 'people');
    this.getData(apiURL+'planets', 'planets');
  }
}
</script>