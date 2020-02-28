import axios from 'axios'

const state = {
  people: {
    list: [],
    loading: true,
    search: ''
  }
};

const getters = {
  peopleList: state => state.people.list,
  peopleLoading: state => state.people.loading
};

const actions = {
  // search for people
  searchPeople({dispatch, state, commit}) {
    const apiURL = 'https://swapi.co/api/people';
    
    commit('setPeopleLoading', true);
    commit('clearPeopleList', []);

    state.people.search === '' ? dispatch('getPeople', apiURL) 
      : dispatch('getPeople', `${apiURL}/?search=${state.people.search}`);
  },

  // get data from API
  getPeople({dispatch}, apiURL) {
    axios.get(apiURL)
      .then(res => dispatch('addPeople', res.data))
      .catch(err => alert(err));
  },

  // save data into state
  addPeople({dispatch, commit}, data) {
    commit('addToPeopleList', data.results);
    data.next ? dispatch('getPeople', data.next) : commit('setPeopleLoading', false);
  },

  // update search state and call action to get data from API
  searchPeopleUpt({dispatch, commit}, value) { 
    commit('searchPeopleUpdate', value);
    dispatch('searchPeople');
  }
};

const mutations = {
  setPeopleLoading: (state, value) => state.people.loading = value,
  clearPeopleList: state => state.people.list = [],
  addToPeopleList: (state, item) => state.people.list.push(...item),
  searchPeopleUpdate: (state, value) => state.people.search = value
};

export default {
  state,
  getters,
  actions,
  mutations
}