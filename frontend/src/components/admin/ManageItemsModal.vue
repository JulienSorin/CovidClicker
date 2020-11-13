<template>
  <div>
    <b-modal id="modal-item" :title="modalData.title" @ok="actionItem">
      <b-form>
        <span>Nom:</span>
        <b-form-input v-model="subjectItem.name" />
        <span>Image:</span>
        <b-form-input
          v-model="subjectItem.img"
          v-on:blur="previewImgItemEnable"
          v-on:focus="previewImgItemDisable"
        />
        <div v-if="previewImgItemEnabled">
          Preview:
          <img class="shop-img" :src="subjectItem.img" />
        </div>
        <span>Prix:</span>
        <b-form-input
          min="0"
          type="number"
          v-model.number="subjectItem.price"
        />
        <span>Bonus contamination par seconde:</span>
        <b-form-input
          min="0"
          type="number"
          v-model.number="subjectItem.contaminationPerSecond"
        />
        <span>Bonus contamination par click:</span>
        <b-form-input
          min="0"
          type="number"
          v-model.number="subjectItem.upgradeContaminationPerClick"
        />
        <span>Synergie: </span>
        <multiselect
          v-model="subjectItem.synergies"
          :options="powers"
          :multiple="true"
          :close-on-select="false"
          label="name"
          track-by="name"
        ></multiselect>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "ManageItemsModal",
  props: ["powers"],
  data: function() {
    return {
      subjectItem: {},
      previewImgItemEnabled: false,
      type: "items",
      modalInfos: {
        title: {
          edit: "Editer un item",
          add: "Créer un item"
        }
      },
      modalData: {
        title: "",
        mode: ""
      }
    };
  },
  methods: {
    openModal(mode, item) {
      this.subjectItem = {};
      this.previewImgItemEnabled = false;
      if (item) {
        let editItem = JSON.parse(JSON.stringify(item));
        this.subjectItem = editItem;
        this.previewImgItemEnabled = true;
      }
      if (mode !== "delete") {
        this.modalData.mode = mode;
        this.modalData.title = this.modalInfos.title[mode];
        this.$bvModal.show("modal-item");
      } else {
        this.$bvModal
          .msgBoxConfirm("Êtes-vous sûr de vouloir supprimer l'item ?", {
            title: "Suppression",
            size: "sm",
            buttonSize: "sm",
            okVariant: "danger",
            okTitle: "YES",
            cancelTitle: "NO",
            footerClass: "p-2",
            hideHeaderClose: false,
            centered: true
          })
          .then(value => {
            if (value)
              this.$emit("delete", {
                type: this.type,
                object: this.subjectItem
              });
          });
      }
    },
    actionItem: function() {
      this.$emit(this.modalData.mode, {
        type: this.type,
        object: this.subjectItem
      });
    },
    previewImgItemEnable: function() {
      this.previewImgItemEnabled = true;
    },
    previewImgItemDisable: function() {
      this.previewImgItemEnabled = false;
    }
  }
};
</script>
