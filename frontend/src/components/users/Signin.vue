<template>
  <div class="d-flex justify-content-center" id="signin">
    <div>
      <b-form @submit="signin">
        <h3>Inscription</h3>

        <div class="form-group">
          <label>Nom d'utilisateur</label>
          <b-form-input
            id="username"
            v-model="connectionData.username"
            class="form-control form-control-lg"
            :state="validatorUsername"
            required
          />
        </div>

        <div class="form-group">
          <label>Mot de passe</label>
          <b-form-input
            id="password"
            v-model="connectionData.password"
            type="password"
            class="form-control form-control-lg"
            :state="validatorPassword"
            required
          />
          <label>Vérification mot de passe</label>
          <b-form-input
            id="confirmPassword"
            v-model="connectionData.password2"
            type="password"
            class="form-control form-control-lg"
            :state="validatorConfirmPassword"
            required
          />

          <label>Role:</label>
          <b-form-select
            v-model="connectionData.role"
            :options="roles"
            required
          ></b-form-select>
        </div>

        <button type="submit" class="btn btn-dark btn-lg btn-block">
          S'inscrire
        </button>
        <div v-if="wrongPassword" class="p-3 mb-2 bg-danger text-white">
          Mauvais nom d'utilisateur / mot de passe
        </div>
        <p class="forgot-password text-right mt-2 mb-4">
          <router-link to="/forgot-password">Forgot password ?</router-link>
        </p>
      </b-form>
      <div id="validator" class="d-flex justify-content-center">
        <ul>
          <li v-if="!validatorUsernameLength">
            Nom d'utilisateur doit être de longueur 4 ou plus.
          </li>
          <li v-if="!validatorUsernameFormat">
            Nom d'utilisateur doit contenir seulement des lettres et chiffres.
          </li>
          <li v-if="!validatorPasswordLength">
            Mot de passe d'au moins 6 caractères.
          </li>
          <li v-if="!validatorPasswordLower">
            Mot de passe doit comporter au moins une minuscule.
          </li>
          <li v-if="!validatorPasswordUpper">
            Mot de passe doit comporter au moins une majuscule.
          </li>
          <li v-if="!validatorPasswordDigit">
            Mot de passe doit comporter au moins un chiffre.
          </li>
          <li v-if="!validatorPasswordSpecial">
            Mot de passe doit comporter au moins un caractère spécial.
          </li>
          <li v-if="!validatorPasswordsEquals">
            Mots de passe différents.
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import sha256 from "js-sha256";

export default {
  name: "Signin",
  data: function() {
    return {
      connectionData: {
        role: "",
        username: "",
        password: "",
        password2: ""
      },
      wrongPassword: false
    };
  },
  computed: {
    roles: function() {
      return this.$store.getters.roles;
    },
    validatorUsername: function() {
      let username = this.connectionData.username;
      if (username === "") return null;
      return this.validatorUsernameLength && this.validatorUsernameFormat;
    },
    validatorPassword: function() {
      if (this.connectionData.password === "") return null;
      return (
        this.validatorPasswordLength &&
        this.validatorPasswordLower &&
        this.validatorPasswordUpper &&
        this.validatorPasswordDigit &&
        this.validatorPasswordSpecial
      );
    },
    validatorConfirmPassword: function() {
      if (this.connectionData.password2 === "") return null;
      return this.validatorPasswordsEquals;
    },
    validatorUsernameLength: function() {
      let username = this.connectionData.username;
      return username.length > 3;
    },
    validatorUsernameFormat: function() {
      let username = this.connectionData.username;
      return /^[0-9a-zA-Z]+$/.test(username);
    },
    validatorPasswordLength: function() {
      let password = this.connectionData.password;
      return password.length >= 6;
    },
    validatorPasswordLower: function() {
      let password = this.connectionData.password;
      return password.match(/[a-z]/) != null;
    },
    validatorPasswordUpper: function() {
      let password = this.connectionData.password;
      return password.match(/[A-Z]/) != null;
    },
    validatorPasswordDigit: function() {
      let password = this.connectionData.password;
      return password.match(/[0-9]/) != null;
    },
    validatorPasswordSpecial: function() {
      let password = this.connectionData.password;
      return password.match(/\W+/) != null;
    },
    validatorPasswordsEquals: function() {
      let password = this.connectionData.password;
      let password2 = this.connectionData.password2;
      return password === password2 && password !== "";
    }
  },
  methods: {
    signin: function(event) {
      event.preventDefault();
      this.wrongPassword = false;
      const username = this.connectionData.username;
      const password = this.connectionData.password;
      const password2 = this.connectionData.password2;
      const hashedPassword = sha256(password);
      const hashedPassword2 = sha256(password2);
      const role = this.connectionData.role;
      axios
        .post("http://localhost:3000/signin", {
          username,
          hashedPassword,
          hashedPassword2,
          role
        })
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
#signin {
  padding: 10%;
}
#error-login {
  background-color: #8a1c30;
  background: white;
}
#validator {
  background-color: ;
}
</style>
