<template>
  <div class="h-100">
    <div class="h-100">
      <b-row class="h-100">
        <b-col class="area" id="clicker-area" fluid="xl">
          <clicker></clicker>
        </b-col>
        <b-col class="area" id="units-area" fluid="xl">
          <units></units>
        </b-col>
        <b-col class="area" id="shop-area" fluid="xl">
          <shop></shop>
        </b-col>
      </b-row>
    </div>
  </div>
</template>
<script>
import Clicker from "../components/clicker/Clicker";
import Shop from "../components/shop/Shop";
import Units from "../components/units/Units";

export default {
  name: "GameView",
  components: {
    Clicker,
    Shop,
    Units
  },
  data: function() {
    return {
      covidedLoop: undefined
    };
  },
  computed: {},
  methods: {
    passiveContamination: function() {
      this.$store.dispatch("contamination");
    }
  },
  created: function() {
    this.covidedLoop = setInterval(
      this.passiveContamination,
      this.$store.getters.intervalLoop
    );
  }
};
</script>
