<template>
  <div id="shop-powers-component">
    <h4>Powers</h4>
    <span
      class="powers"
      v-for="power in powers"
      :key="power.id"
      v-on:click="buyPower(power)"
    >
      <b-img
        :id="'power-' + power.id"
        v-b-tooltip.hover
        ondragstart="return false;"
        :src="power.img"
        class="shop-img"
      />
      <b-tooltip :target="'power-' + power.id" triggers="hover">
        {{ power.description }}
      </b-tooltip>
    </span>
  </div>
</template>
<script>
export default {
  components: {},
  data: function() {
    return {};
  },
  computed: {
    powers: function() {
      return this.$store.getters.listPowersNotPurchased;
    }
  },
  methods: {
    buyPower: function(power) {
      if (this.$store.getters.covided >= power.price) {
        this.$store.dispatch("buyPower", power);
      }
    }
  }
};
</script>
