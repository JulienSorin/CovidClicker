<template>
  <div class="w-100" id="navbar">
    <b-navbar
      toggleable="lg"
      type="dark"
      style="color: #940000; background-color: #111"
    >
      <b-container>
        <b-navbar-brand href="/">
          Covid Clicker
        </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav v-if="isLogged" class="ml-auto">
            <b-nav-item-dropdown right>
              <!-- Variabiliser en fonction de l'utilisateur / privilèges -->
              <template slot="button-content">
                <em>{{ username }}</em>
              </template>
              <b-dropdown-item to="/profile">Mon profil</b-dropdown-item>
              <b-dropdown-item to="/admin" v-if="isAdmin"
                >Admin</b-dropdown-item
              >
              <b-dropdown-item v-on:click="logout"
                >Se déconnecter</b-dropdown-item
              >
            </b-nav-item-dropdown>
          </b-navbar-nav>
          <b-navbar-nav v-else class="ml-auto">
            <b-nav-item to="/login">
              Se connecter
            </b-nav-item>
            <b-nav-item to="/signin">
              S'inscrire
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
        <b-button v-on:click="save" v-if="isLogged">Sauvegarder</b-button>
      </b-container>
    </b-navbar>
  </div>
</template>
<script>
export default {
  name: "Navbar",
  computed: {
    isLogged: function() {
      return this.$store.getters.isLogged;
    },
    username: function() {
      return this.$store.getters.username;
    },
    isAdmin: function() {
      return this.$store.getters.isAdmin;
    }
  },
  methods: {
    logout: function() {
      this.$store.dispatch("logout");
      this.$router.push("/login");
    },
    save: function() {
      this.$store.dispatch("save");
    }
  }
};
</script>
