<template>
  <div id="clicker-composent">
    <h1>State</h1>
    <div>{{ covided }} Covided</div>
    <div>Contanimation par seconde : {{ covidedPerSecond }}</div>
    <div>
      Pourcentage de gain en étant déconnecté : {{ inactivePercentGain }}%
    </div>
    <div>
      <img
        ondragstart="return false;"
        width="100%"
        v-on:click="clickOnCovid"
        src="https://www.sciencesetavenir.fr/assets/img/2020/02/24/cover-r4x3w1000-5e5404d5027c6-23312-lores.jpg"
      />
    </div>
  </div>
</template>
<script>
export default {
  data: function() {
    return {};
  },
  methods: {
    clickOnCovid: function() {
      this.$store.dispatch("clickOnCovid");
    }
  },
  computed: {
    covided: function() {
      return Math.ceil(this.$store.getters.covided);
    },
    covidedPerSecond: function() {
      return this.$store.getters.playerValues.covidedPerSecond;
    },
    inactivePercentGain: function() {
      return this.$store.getters.inactivePercentGain;
    }
  }
};
</script>
