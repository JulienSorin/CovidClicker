<template>
  <div class="h-100 w-100">
    <navbar />
    <router-view />
  </div>
</template>
<script>
import Navbar from "@/components/navbar/Navbar";

export default {
  name: "App",
  components: {
    Navbar
  },
  created: function() {
    this.$store.dispatch("load");
    this.$store.dispatch("loadUserData");
  }
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.area {
  background-color: grey;
}

html,
body {
  height: 100%;
}

.shop-img {
  height: 40px;
  width: 40px;
  border: 1px solid;
}

.units-items {
  border: 1px solid;
}

img {
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  user-select: none;
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  user-drag: none;
}

#navbar {
  height: 5%;
  background-color: #34a4eb;
}
</style>
