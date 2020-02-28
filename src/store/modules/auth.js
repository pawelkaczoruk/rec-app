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
  user: {},
  login: ''
};

const getters = {
  loginStatus: state => state.status,
  loginToken: state => state.token,
};

const actions = {
  // check if user was logged in
  checkUserInfo({commit}) {
    commit('localData');
  },

  // check if user is registered generate token, update store and local storage
  login({state, commit}, user) {
    let logged = false;
    const users = state.users;

    for(let i=0; i<users.length; i++) {
      if(users[i].login === user.login && users[i].password === user.password) {
        const token = Math.floor(Math.random()*1000000);

        commit('auth_success', user);
        commit('setToken', token);
        localStorage.setItem('token', token);
        localStorage.setItem('login', user.login);
        logged = !logged;
        break;
      }
    }
    if(!logged) commit('auth_error');
  },

  // clear token and login from local storage and update store
  logout({commit}) {
    commit('logout');
    localStorage.removeItem('token');
    localStorage.removeItem('login');
  }
};

const mutations = {
  setToken: (state, token) => {
    state.token = token
  },
  auth_success: (state, user) => {
    state.status = ''
    state.user = user
    state.login = user.login
  },
  auth_error: state => state.status = 'error',
  logout: state => {
    state.status = 'logged_out'
    state.token = ''
    state.user = {}
  },
  localData: state => {
    state.token = localStorage.getItem('token') || ''
    state.login = localStorage.getItem('login') || ''
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}