<template>
  <b-navbar type="dark" variant="dark" class="p-3">
    <b-navbar-brand href="/">COOP</b-navbar-brand>

    <!-- v-if="this.$route.name"used to prevent loading error in the console-->
    <b-navbar-nav class="navbar-nav ms-auto" v-if="this.$store.state.token">
      <b-nav-item
        v-if="this.$route.name"
        :active="this.$route.name.includes('Conversation')"
        :to="'/'"
        >Conversations</b-nav-item
      >
      <b-nav-item
        v-if="this.$route.name"
        :active="this.$route.name.includes('Members')"
        :to="'/members'"
        >Members</b-nav-item
      >
      <b-nav-item-dropdown :text="$store.state.member.fullname" right>
        <b-dropdown-item @click="logout()">Logout</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </b-navbar>
</template>
<script>
export default {
  name: "NavBar",
  props: {
    msg: String,
  },
  methods: {
    logout() {
      this.$api
        .delete("members/signout")
        .then((response) => {
          this.$router.push("/login");
          this.$store.commit("setToken", null);
          this.$store.commit("setMember", null);
        })
        .catch((error) => {
          //Show error alert
          this.flashMessage.show({
            status: "error",
            title: "Something went wrong :(",
            message: error.response.data.message,
          });
        });
    },
  },
};
</script>

