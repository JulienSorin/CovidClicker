import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    intervalLoop: 10,
    inactivePercentGain: 10,
    username: localStorage.username != undefined ? localStorage.username : "",
    password: localStorage.password != undefined ? localStorage.password : "",
    role: "",
    playerValues: {
      covided: 0,
      covidedPerClick: 1,
      covidedPerSecond: 0,
      itemsPurchased: [],
      powersPurchased: []
    },
    powers: [],
    items: [],
    roles: ["admin", "user"]
  },
  mutations: {
    save: function(state) {
      axios.post("http://localhost:3000/save", {
        username: state.username,
        password: state.password,
        playerValues: state.playerValues
      });
    },
    loadUserData: function(state) {
      if (state.username != "") {
        axios
          .get("http://localhost:3000/save", {
            params: {
              username: state.username,
              password: state.password
            }
          })
          .then(d => {
            let data = d.data;
            state.playerValues = data.playerValues;
            state.role = data.role;

            let lastTime = new Date(data.updatedAt);
            let now = new Date();
            let delta = (now - lastTime) / 1000;
            let gain = Math.ceil(
              delta *
                state.playerValues.covidedPerSecond *
                (state.inactivePercentGain / 100)
            );
            state.covided += gain;
          });
      }
    },
    load: function(state) {
      axios.get("http://localhost:3000/objects").then(d => {
        let data = d.data;
        state.powers = data.powers;
        state.items = data.items;
        state.powers.sort((a, b) => {
          return a.price - b.price;
        });
        state.items.sort((a, b) => {
          return a.price - b.price;
        });
      });
    },
    login: function(state, logs) {
      state.username = logs.username;
      state.password = logs.password;
      localStorage.username = logs.username;
      localStorage.password = logs.password;
    },
    logout: function(state) {
      state.username = "";
      state.password = "";
      localStorage.removeItem("username");
      localStorage.removeItem("password");
    },
    clickOnCovid: function(state) {
      state.playerValues.covided += state.playerValues.covidedPerClick;
    },
    buyItem: function(state, item) {
      state.playerValues.covided -= item.price;
      let log = state.playerValues.itemsPurchased.find(t => {
        return t.item.id == item.id;
      });
      if (log !== undefined) {
        log.number++;
      } else {
        state.playerValues.itemsPurchased.push({ item: item, number: 1 });
      }
    },
    buyPower: function(state, power) {
      state.playerValues.covided -= power.price;
      let log = state.playerValues.powersPurchased.find(t => {
        return t.power.id == power.id;
      });
      if (log === undefined) {
        state.playerValues.powersPurchased.push(power);
      }
    },
    contamination: function(state) {
      state.playerValues.covided +=
        (state.playerValues.covidedPerSecond / 1000) * state.intervalLoop;
    },
    updatePlayerValues: function(state) {
      let sumCovidPerSecond = 0;
      let sumCovidPerClick = 1;

      // calcul effet items
      state.playerValues.itemsPurchased.forEach(log => {
        let item = log.item;
        let number = log.number;

        let value = item.contaminationPerSecond * number;
        if (item.synergies !== undefined) {
          item.synergies.forEach(synergy => {
            let logSyn = state.playerValues.powersPurchased.find(power => {
              return power.id == synergy.id;
            });
            if (logSyn !== undefined) {
              value *= synergy.multiplierSyngergy;
            }
          });
        }
        sumCovidPerSecond += value;
        sumCovidPerClick += item.upgradeContaminationPerClick;
      });

      //calcul effet powers
      state.playerValues.powersPurchased.forEach(power => {
        sumCovidPerSecond *= power.globalMultiplier;
        sumCovidPerClick *= power.clickMultiplier;
      });

      state.playerValues.covidedPerSecond = sumCovidPerSecond;
      state.playerValues.covidedPerClick = sumCovidPerClick;
    }
  },
  actions: {
    clickOnCovid: function(context) {
      context.commit("clickOnCovid");
    },
    buyItem: function(context, item) {
      context.commit("buyItem", item);
      context.commit("updatePlayerValues");
    },
    buyPower: function(context, power) {
      context.commit("buyPower", power);
      context.commit("updatePlayerValues");
    },
    contamination: function(context) {
      context.commit("contamination");
    },
    login: function(context, logs) {
      context.commit("login", logs);
      context.commit("loadUserData");
      context.commit("save");
    },
    logout: function(context) {
      context.commit("logout");
    },
    load: function(context) {
      context.commit("load");
    },
    save: function(context) {
      context.commit("save");
    },
    loadUserData: function(context) {
      context.commit("loadUserData");
    }
  },
  getters: {
    hashPassword: state => {
      return state.password;
    },
    username: state => {
      return state.username;
    },
    covided: state => {
      return state.playerValues.covided;
    },
    powers: state => {
      return state.powers;
    },
    items: state => {
      return state.items;
    },
    playerValues: state => {
      return state.playerValues;
    },
    intervalLoop: state => {
      return state.intervalLoop;
    },
    isLogged: state => {
      return state.username != "";
    },
    itemsPurchased: state => {
      return state.playerValues.itemsPurchased;
    },
    powersPurchased: state => {
      return state.playerValues.powersPurchased;
    },
    numberOfItemPurchased: state => item => {
      let log = state.playerValues.itemsPurchased.find(i => {
        return i.item === item;
      });
      if (log === undefined) return 0;
      return log.number;
    },
    listPowersNotPurchased: state => {
      return state.powers.filter(
        e => state.playerValues.powersPurchased.find(t => t === e) === undefined
      );
    },
    getItem: state => id => {
      return state.items.find(i => i.id === id);
    },
    roles: state => {
      return state.roles;
    },
    isAdmin: state => {
      return state.role === "admin";
    },
    inactivePercentGain: state => {
      return state.inactivePercentGain;
    }
  }
});
