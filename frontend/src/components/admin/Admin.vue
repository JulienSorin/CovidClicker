<template>
  <div class="container">
    <h1 class="text-center">
      Admin
      <span>
        <b-dropdown id="dropdown-1" text="Actions" class="m-md-2">
          <b-dropdown-item v-on:click="$refs.itemsModal.openModal('add', null)"
            >Creer un item</b-dropdown-item
          >
          <b-dropdown-item v-on:click="$refs.powersModal.openModal('add', null)"
            >Creer un power</b-dropdown-item
          >
        </b-dropdown>
      </span>
    </h1>

    <br />
    <div class="row">
      <div class="col-xl">
        <h2>Items</h2>
        <div v-for="item in items" :key="item.id">
          <div>
            {{ item.name }}
            <svg
              style="margin-right:3%;"
              v-on:click="$refs.itemsModal.openModal('edit', item)"
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              class="bi bi-pencil-square"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
              />
              <path
                fill-rule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
              />
            </svg>
            <svg
              v-on:click="$refs.itemsModal.openModal('delete', item)"
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              class="bi bi-x-square-fill"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"
              />
            </svg>
          </div>
          <b-img :src="item.img" class="shop-img" /> -> [<span
            v-for="syn in item.synergies"
            :key="syn.id"
            ><b-img :src="syn.img" class="shop-img"/></span
          >]
          <div>
            <b-badge
              >Prix: {{ item.price }} | Bonus par click:
              {{ item.upgradeContaminationPerClick }} | Bonus passif:
              {{ item.contaminationPerSecond }}</b-badge
            >
          </div>
        </div>
      </div>
      <div class="col-xl">
        <h2>Powers</h2>
        <div v-for="power in powers" :key="power.name">
          <span>
            {{ power.name }}
            <svg
              style="margin-right:1%;"
              v-on:click="$refs.powersModal.openModal('edit', power)"
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              class="bi bi-pencil-square"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
              />
              <path
                fill-rule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
              />
            </svg>
            <svg
              v-on:click="$refs.powersModal.openModal('delete', power)"
              style="margin-right:1%;"
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              class="bi bi-x-square-fill"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"
              />
            </svg>
          </span>
          <b-img :src="power.img" class="shop-img" />
          <span>
            {{ power.description }}
          </span>
          <div>
            <b-badge
              >Prix: {{ power.price }} | Mutiplicateur par synergie :
              {{ power.multiplierSyngergy }} | Multiplicateur global :
              {{ power.globalMultiplier }} | Bonus par click :
              {{ power.upgradeContaminationPerClick }} | Multiplicateur du click
              : {{ power.clickMultiplier }}</b-badge
            >
          </div>
        </div>
      </div>
    </div>
    <manage-items-modal
      ref="itemsModal"
      :powers="powers"
      @edit="saveObject"
      @add="addObject"
      @delete="deleteObject"
    />
    <manage-powers-modal
      ref="powersModal"
      :powers="powers"
      @edit="saveObject"
      @add="addObject"
      @delete="deleteObject"
    />
  </div>
</template>

<script>
import axios from "axios";
import ManageItemsModal from "./ManageItemsModal";
import ManagePowersModal from "./ManagePowersModal";
import { v4 as uuidv4 } from "uuid";

export default {
  name: "Admin",
  components: { ManageItemsModal, ManagePowersModal },
  methods: {
    saveObject: function(args) {
      let type = args.type;
      let object = args.object;
      axios
        .put(`http://localhost:3000/objects/${type}/${object.id}`, {
          object: object
        })
        .then(() => {
          this.$store.dispatch("load");
        });
    },
    addObject: function(args) {
      let type = args.type;
      let object = args.object;
      object.id = this.getNewIdAvalaible();
      axios
        .post(`http://localhost:3000/objects/${type}`, {
          object: object
        })
        .then(() => {
          this.$store.dispatch("load");
        });
    },
    deleteObject: function(args) {
      let type = args.type;
      let object = args.object;
      axios
        .delete(`http://localhost:3000/objects/${type}/${object.id}`)
        .then(() => {
          this.$store.dispatch("load");
        });
    },
    getNewIdAvalaible: function() {
      return uuidv4();
    }
  },
  computed: {
    items: function() {
      return this.$store.getters.items;
    },
    powers: function() {
      return this.$store.getters.powers;
    }
  }
};
</script>
