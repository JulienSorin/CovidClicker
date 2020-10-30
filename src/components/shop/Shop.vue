<template>
  <div id="shop-component">
    <h1>Store</h1>
    <div id="shop-powers-area">
      <shop-powers></shop-powers>
    </div>
    <div id="shop-items-area">
      <shop-items></shop-items>
    </div>
  </div>
</template>
<script>
import ShopPowers from "./ShopPowers";
import ShopItems from "./ShopItems";

export default {
  components: {
    ShopPowers,
    ShopItems
  },
  data: function() {
    return {};
  },
  computed: {},
  methods: {}
};
</script>
