<template>
  <div class="units-component">
    <h1>Units</h1>
    <b-container>
      <b-row class="units-items" v-for="log in purchased" :key="log.item.id">
        <div class="w-100">{{ log.item.name }}</div>
        <div>
          <span v-for="n in log.number > 8 ? 8 : log.number" :key="n">
            <img class="shop-img" :src="log.item.img" />
          </span>
        </div>
      </b-row>
    </b-container>
  </div>
</template>
<script>
export default {
  components: {},
  data: function() {
    return {};
  },
  computed: {
    purchased: function() {
      return this.$store.getters.itemsPurchased;
    }
  },
  method: {}
};
</script>
