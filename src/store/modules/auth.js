const state = {
  users: [
    {
      login: 'johndoe',
      password: 'pass1'
    },
    {
      login: 'swFanNo1',
      password: 'lordofStars'
    },
    {
      login: 'lucy_123',
      password: 'qwerty123'
    }
  ],
  status: '',
  token: '',
  user: {}
};

const getters = {
  loginStatus: state => state.status
};

const actions = {
  login({state, commit}, user) {
    let logged = false;
    const users = state.users;

    for(let i=0; i<users.length; i++) {
      if(users[i].login === user.login && users[i].password === user.password) {
        commit('auth_success', user);
        logged = !logged;
        break;
      }
    }
    if(!logged) commit('auth_error');
  },
  logout({commit}) {
    commit('logout')
  }
};

const mutations = {
  auth_success: (state, user) => {
    state.status = 'success'
    state.token = Math.floor(Math.random()*1000000)
    state.user = user
  },
  auth_error: state => state.status = 'error',
  logout: state => {
    state.status = ''
    state.token = ''
    state.user = {}
  }
  
};

export default {
  state,
  getters,
  actions,
  mutations
}