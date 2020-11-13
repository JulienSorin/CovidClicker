<template>
  <div class="d-flex justify-content-center" id="login">
    <div>
      <b-form @submit="login">
        <h3>Connexion</h3>

        <div class="form-group">
          <label>Nom d'utilisateur</label>
          <b-form-input
            v-model="connectionData.username"
            class="form-control form-control-lg"
          />
        </div>

        <div class="form-group">
          <label>Mot de passe</label>
          <b-form-input
            v-model="connectionData.password"
            type="password"
            class="form-control form-control-lg"
          />
        </div>

        <button type="submit" class="btn btn-dark btn-lg btn-block">
          Se connecter
        </button>
        <div v-if="wrongPassword" class="p-3 mb-2 bg-danger text-white">
          Mauvais nom d'utilisateur / mot de passe
        </div>
        <p class="forgot-password text-right mt-2 mb-4">
          <router-link to="/forgot-password">Forgot password ?</router-link>
        </p>
      </b-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import sha256 from "js-sha256";

export default {
  name: "Login",
  data: function() {
    return {
      connectionData: {
        username: "",
        password: ""
      },
      wrongPassword: false
    };
  },
  methods: {
    login: function(event) {
      event.preventDefault();
      this.wrongPassword = false;
      const username = this.connectionData.username;
      const password = this.connectionData.password;
      const hashedPassword = sha256(password);
      axios
        .post("http://localhost:3000/login", { username, hashedPassword })
        .then(() => {
          this.$store.dispatch("login", {
            username: this.connectionData.username,
            password: sha256(this.connectionData.password)
          });
          this.$router.push("/");
        })
        .catch(() => {
          this.wrongPassword = true;
        });
    }
  }
};
</script>
<style>
#login {
  padding: 10%;
}
#error-login {
  background-color: #8a1c30;
  background: white;
}
</style>
