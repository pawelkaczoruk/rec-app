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
            <v-form @submit="onSearch('people')" class="d-flex">
              <v-text-field
                class="pt-0"
                v-model="people.search"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
              <v-btn 
                :disabled="peopleLoading"
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
            :items="peopleList"
            :options="people.options"
            :loading="peopleLoading"
          ></v-data-table>
        </v-card>
      </v-col>

      <v-col cols="auto" md="6">
        <v-card>
          <v-card-title>
            Planets
            <v-spacer></v-spacer>
            <v-form @submit="onSearch('planets')" class="d-flex">
              <v-text-field
                class="pt-0"
                v-model="planets.search"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
              <v-btn
              :disabled="planetsLoading"
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
            :items="planetsList"
            :options="planets.options"
            :loading="planetsLoading"
          ></v-data-table>
        </v-card>
      </v-col> 

    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'List',
  data() {
    return {
      people: {
        search: '',
        headers: [
          { text: 'Name', value: 'name' },
          { text: 'Height', value: 'height', filterable: false },
          { text: 'Gender', value: 'gender', filterable: false },
          { text: 'Birth Year', value: 'birth_year', filterable: false },
        ],
        options: { itemsPerPage: 5 }
      },
      planets: {
        search: '',
        headers: [
          { text: 'Name', value: 'name' },
          { text: 'Diameter', value: 'diameter', filterable: false },
          { text: 'Terrain', value: 'terrain', filterable: false },
          { text: 'Population', value: 'population', filterable: false },
        ],
        options: { itemsPerPage: 5 }
      }
    }
  },
  computed: mapGetters([
    'peopleList', 
    'peopleLoading', 
    'planetsList', 
    'planetsLoading',
    'loginStatus'
  ]),
  methods: {
    ...mapActions([
      'logout', 
      'searchPeople', 
      'searchPeopleUpt',
      'clearPeople',
      'searchPlanets', 
      'searchPlanetsUpt',
      'clearPlanets'
    ]),

    // logout from app
    onLogout() {
      this.logout();
      this.clearPeople();
      this.clearPlanets();
      this.$router.push('login');
    },

    // call search action
    onSearch(resource) {
      event.preventDefault();
      if(resource === 'people') this.searchPeopleUpt(this.people.search);
      else if(resource === 'planets') this.searchPlanetsUpt(this.planets.search);
    }

  },
  created() {
    // call search action if user is logged in
    if(this.loginStatus) {
      this.searchPeople();
      this.searchPlanets();      
    } else this.$router.push('login');
  }
}
</script>