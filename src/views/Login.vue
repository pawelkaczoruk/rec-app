<template>
  <v-container fill-height>
    <v-row
      align="center"
      justify="center"
    >
      <v-form 
        class="text-center ml-4"
        ref="login"
      >
        <h2 class="mb-8 text-center primary--text">Sign in to browse content</h2>

        <v-text-field
          type=""
          v-model="auth.login"
          label="Login"
          required
          :rules="rules.login"
          append-icon="mdi-account"
          outlined></v-text-field>

        <v-text-field
          type=""
          v-model="auth.password"
          label="Password"
          required
          :rules="rules.password"
          append-icon="mdi-lock"
          outlined></v-text-field>

        <v-btn class="primary" @click="onLogin()">
          Send
        </v-btn>          
      </v-form>
    </v-row>
  </v-container>
</template>

<script>
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
  methods: {
    onLogin() {
      // validate
      this.$refs.login.validate()
    }
  }
}
</script>

<style scoped>

</style>
