<template>
  <div>
    <b-modal id="modal-change-password" title="Changer mot de passe" @ok="send">
      <div>
        <b>VERSION ENCORE EN TEST : PAS DE VERIFICATION DE SEMANTIQUE</b>
      </div>
      <b-form>
        <span>Ancien mot de passe:</span>
        <b-form-input type="password" v-model="oldPassword" />
        <span>Nouveau mot de passe:</span>
        <b-form-input type="password" v-model="newPassword" />
        <span>Confirmation:</span>
        <b-form-input type="password" v-model="newPassword2" />
      </b-form>
    </b-modal>
  </div>
</template>
<script>
export default {
  name: "ChangePasswordModal",
  data: function() {
    return {
      oldPassword: "",
      newPassword: "",
      newPassword2: ""
    };
  },
  methods: {
    openModal: function() {
      this.$bvModal.show("modal-change-password");
    },
    send: function() {
      this.$emit("send", {
        oldPassword: this.oldPassword,
        newPassword1: this.newPassword,
        newPassword2: this.newPassword2
      });
    }
  }
};
</script>
