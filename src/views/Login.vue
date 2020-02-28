<template>
  <v-container fill-height>
    <v-row
      align="center"
      justify="center"
    >
      <v-form @submit="onLogin()"
        class="text-center ml-4"
        ref="login"
      >
        <h2 class="mb-8 text-center primary--text">Sign in to browse content</h2>
        <h4 
          class="mb-4 text-center red--text"
          v-if="loginStatus == 'error'">Wrong password or username</h4>
        <h4 
          class="mb-4 text-center green--text"
          v-if="loginStatus == 'logged_out'">Successfully logged out</h4>

        <v-text-field
          v-model="auth.login"
          label="Login"
          required
          :rules="rules.login"
          append-icon="mdi-account"
          outlined></v-text-field>

        <v-text-field
          type="password"
          v-model="auth.password"
          label="Password"
          required
          :rules="rules.password"
          append-icon="mdi-lock"
          outlined></v-text-field>

        <v-btn type="submit" class="primary">
          Send
        </v-btn>
      </v-form>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Login',
  data() {
    return {
      auth: {
        login: '',
        password: ''
      },
      rules: {
        login: [ v => v.length >= 1 || 'Login is required' ],
        password: [ v => v.length >= 1 || 'Password is required' ]
      }
    }
  },
  computed: mapGetters([
    'loginStatus',
    'loginToken'
  ]),
  methods: {
    ...mapActions([
      'login',
      'checkUserInfo'
    ]),

    onLogin() {
      event.preventDefault();

      // validate
      if(this.$refs.login.validate()) {
        this.login(this.auth);
      }

      // clean user data
      this.auth = {
        login: '',
        password: ''
      }
    }
  },
  created() {
    this.checkUserInfo();
  },
  watch: {
    loginToken: function() {
      if(this.loginToken) this.$router.push('list');
    }
  }
}
</script>