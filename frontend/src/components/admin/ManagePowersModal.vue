<template>
  <div>
    <b-modal id="modal-power" :title="modalData.title" @ok="actionPower">
      <b-form>
        <span>Nom:</span>
        <b-form-input v-model="subjectPower.name" />
        <span>Image:</span>
        <b-form-input
          v-model="subjectPower.img"
          v-on:blur="previewImgPowerEnable"
          v-on:focus="previewImgPowerDisable"
        />
        <div v-if="previewImgPowerEnabled">
          Preview:
          <img class="shop-img" :src="subjectPower.img" />
        </div>
        <span>Description:</span>
        <b-form-input v-model="subjectPower.description" />
        <span>Prix:</span>
        <b-form-input
          min="0"
          type="number"
          v-model.number="subjectPower.price"
        />
        <span>Multiplicateur synergique:</span>
        <b-form-input
          min="1"
          type="number"
          v-model.number="subjectPower.multiplierSyngergy"
        />
        <span>Bonus contamination par click:</span>
        <b-form-input
          min="0"
          type="number"
          v-model.number="subjectPower.upgradeContaminationPerClick"
        />
        <span>Multiplicateur global:</span>
        <b-form-input
          min="1"
          type="number"
          v-model.number="subjectPower.globalMultiplier"
        />
        <span>Multiplicateur de click:</span>
        <b-form-input
          min="1"
          type="number"
          v-model.number="subjectPower.clickMultiplier"
        />
      </b-form>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "ManagePowersModal",
  props: ["powers"],
  data: function() {
    return {
      subjectPower: {},
      previewImgPowerEnabled: false,
      type: "powers",
      modalInfos: {
        title: {
          edit: "Editer un power",
          add: "Créer un power"
        }
      },
      modalData: {
        title: "",
        mode: ""
      }
    };
  },
  methods: {
    openModal(mode, power) {
      this.subjectPower = {};
      this.previewImgPowerEnabled = false;
      if (power) {
        let editPower = JSON.parse(JSON.stringify(power));
        this.subjectPower = editPower;
        this.previewImgPowerEnabled = true;
      }
      if (mode !== "delete") {
        this.modalData.mode = mode;
        this.modalData.title = this.modalInfos.title[mode];
        this.$bvModal.show("modal-power");
      } else {
        this.$bvModal
          .msgBoxConfirm("Êtes-vous sûr de vouloir supprimer le power ?", {
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
                object: this.subjectPower
              });
          });
      }
    },
    actionPower: function() {
      this.$emit(this.modalData.mode, {
        type: this.type,
        object: this.subjectPower
      });
    },
    previewImgPowerEnable: function() {
      this.previewImgPowerEnabled = true;
    },
    previewImgPowerDisable: function() {
      this.previewImgPowerEnabled = false;
    }
  }
};
</script>
