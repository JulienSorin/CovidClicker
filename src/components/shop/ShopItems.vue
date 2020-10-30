<template>
  <div id="shop-items-component">
    <h4>Items</h4>
    <b-container>
      <b-row v-for="item in items" :key="item.id">
        <b-col>
          <b-img
            ondragstart="return false;"
            class="shop-img"
            :src="item.img"
            v-on:click="buyItem(item)"
          />
        </b-col>
        <b-col>
          <b-row>
            <b-badge>{{ item.name }}</b-badge>
          </b-row>
          <b-row> Prix: {{ item.price }} </b-row>
        </b-col>
        <b-col> [{{ item.purchased }}] </b-col>
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
      return this.$store.getters.items;
    }
  },
  methods: {
    buyItem: function(item) {
      if (this.$store.getters.covided >= item.price) {
        this.$store.dispatch("buyItem", item);
      }
    }
  }
};
</script>
