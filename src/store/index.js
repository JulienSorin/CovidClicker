import Vue from "vue";
import Vuex from "vuex";

import Items from "../objects/items";
import Powers from "../objects/powers";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    covided: 0,
    intervalLoop: 10,
    playerValues: {
      covidedPerClick: 1,
      covidedPerSecond: 0
    },
    powers: Powers.Powers,
    items: Items.Items
  },
  mutations: {
    clickOnCovid: function(state) {
      state.covided += state.playerValues.covidedPerClick;
    },
    buyItem: function(state, item) {
      state.covided -= item.price;
      item.purchased++;
      //state.playerValues.covidedPerSecond += item.contaminationPerSecond;
      //state.playerValues.covidedPerClick += item.upgradeContaminationPerClick;
    },
    buyPower: function(state, power) {
      state.covided -= power.price;
      power.purchased = true;
      // add effect here
      // TODO: --
    },
    contamination: function(state) {
      state.covided +=
        (state.playerValues.covidedPerSecond / 1000) * state.intervalLoop;
    },
    updatePlayerValues: function(state) {
      let sumCovidPerSecond = 0;
      let sumCovidPerClick = 1;
      state.items.forEach(item => {
        if (item.purchased > 0) {
          let value = item.contaminationPerSecond * item.purchased;
          if (item.synergies != undefined) {
            item.synergies.forEach(synergy => {
              if (synergy.purchased) {
                value = value * synergy.multiplierSyngergy;
              }
            });
          }
          sumCovidPerSecond += value;
          sumCovidPerClick += item.upgradeContaminationPerClick;
        }
      });

      state.powers.forEach(power => {
        if (power.purchased) {
          sumCovidPerSecond *= power.globalMultiplier;
          sumCovidPerClick *= power.clickMultiplier;
        }
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
    }
  },
  getters: {
    covided: state => {
      return state.covided;
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
    }
  }
});
