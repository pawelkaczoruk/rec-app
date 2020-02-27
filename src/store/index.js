import Vuex from 'vuex'
import Vue from 'vue'
import auth from './modules/auth'
import people from './modules/people'
import planets from './modules/planets'


Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    auth,
    people,
    planets
  }
});

export default store;