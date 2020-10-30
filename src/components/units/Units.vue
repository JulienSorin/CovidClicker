<template>
  <div class="units-component">
    <h1>Units</h1>
    <b-container>
      <b-row class="units-items" v-for="item in items" :key="item.id">
        <div class="w-100">{{ item.name }}</div>
        <div>
          <span v-for="n in item.purchased > 8 ? 8 : item.purchased" :key="n">
            <img class="shop-img" :src="item.img" v-on:click="buyItem(item)" />
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
    items: function() {
      return this.$store.getters.items.filter(i => i.purchased > 0);
    }
  },
  method: {}
};
</script>
