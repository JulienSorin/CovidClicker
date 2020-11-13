import Vue from "vue";
import VueRouter from "vue-router";
import Store from "../store";
import Game from "../views/Game.vue";
import Admin from "../views/Admin.vue";
import Profile from "../views/Profile.vue";
import Login from "../views/Login.vue";
import Signin from "../views/Signin.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Game",
    component: Game,
    beforeEnter(to, from, next) {
      if (Store.getters.isLogged) next();
      else next("/login");
    }
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    beforeEnter(to, from, next) {
      if (Store.getters.isLogged) next();
      else next("/login");
    }
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    beforeEnter(to, from, next) {
      if (Store.getters.isLogged) next();
      else next("/login");
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin
  }
];

const router = new VueRouter({
  routes
});

export default router;
