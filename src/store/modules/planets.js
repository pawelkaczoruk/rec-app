import axios from 'axios'

const state = {
  planets: {
    list: [],
    loading: true,
    search: ''
  }
};

const getters = {
  planetsList: state => state.planets.list,
  planetsLoading: state => state.planets.loading
};

const actions = {
  // search for planets
  searchPlanets({dispatch, state, commit}) {
    const apiURL = 'https://swapi.co/api/planets';
    
    commit('setPlanetsLoading', true);
    commit('clearPlanetsList', []);

    state.planets.search === '' ? dispatch('getPlanets', apiURL) 
      : dispatch('getPlanets', `${apiURL}/?search=${state.planets.search}`);
  },

  // get data from API
  getPlanets({dispatch}, apiURL) {
    axios.get(apiURL)
      .then(res => dispatch('addPlanets', res.data))
      .catch(err => alert(err));
  },

  // save data into state
  addPlanets({dispatch, commit}, data) {
    commit('addToPlanetsList', data.results);
    data.next ? dispatch('getPlanets', data.next) : commit('setPlanetsLoading', false);
  },

  // update search state and call action to get data from API
  searchPlanetsUpt({dispatch, commit}, value) { 
    commit('searchPlanetsUpdate', value);
    dispatch('searchPlanets');
  }
};

const mutations = {
  setPlanetsLoading: (state, value) => state.planets.loading = value,
  clearPlanetsList: state => state.planets.list = [],
  addToPlanetsList: (state, item) => state.planets.list.push(...item),
  searchPlanetsUpdate: (state, value) => state.planets.search = value
};

export default {
  state,
  getters,
  actions,
  mutations
}