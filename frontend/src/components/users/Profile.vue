<template>
  <div class="d-flex justify-content-center" id="login">
    <div class="flex-container">
      <div class="flex-item">Nom d'utilisateur: {{ username }}</div>
      <div class="flex-item">Droits: {{ rights }}</div>
      <div class="flex-item">
        <!--<b-button
          variant="outline-primary"
          v-on:click="$refs.changePasswordModal.openModal()"
          >Changer son mot de passe</b-button
        >-->
      </div>
      <div class="flex-item">
        <b-button variant="danger" v-on:click="openDeleteModal"
          >Supprimer son compte</b-button
        >
      </div>
    </div>
    <!--<change-password-modal @send="changePassword" ref="changePasswordModal" />-->
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Profile",
  components: {
    /*ChangePasswordModal*/
  },
  data: function() {
    return {
      username: this.$store.getters.username,
      rights: "test",
      password: this.$store.getters.hashPassword
    };
  },
  methods: {
    openDeleteModal: function() {
      this.$bvModal
        .msgBoxConfirm("Êtes-vous sûr de vouloir supprimer le compte ?", {
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
            axios
              .delete(
                `http://localhost:3000/user/${this.username}/${this.password}`
              )
              .then(() => {
                this.$store.dispatch("logout");
              });
        });
    }
    /*changePassword: function(passwords) {
      let hashhOld = sha256(passwords.oldPassword);
      let hashNew1 = sha256(passwords.newPassword1);
      let hashNew2 = sha256(passwords.newPassword2);
      console.log(
        hashhOld,
        hashNew1,
        hashNew2,
        this.$store.getters.hashPassword
      );
      if (
        hashhOld === this.$store.getters.hashPassword &&
        hashNew1 === hashNew2
      ) {
        axios
          .put("http://localhost:3000/user", {
            username: this.username,
            oldPassword: hashhOld,
            newPassword: hashNew1
          })
          .then(d => {
            console.log(d);
          });
      }
    }*/
  }
};
</script>
