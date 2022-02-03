<template>
  <div id="app">
    <NavBar />
    <router-view />
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
export default {
  mounted() {
    //Check if user logged in
    if (this.$store.state.member) {
      this.$api
        .get("members/" + this.$store.state.member.id + "/signedin")
        .then()
        .catch(() => {
          this.$store.commit("setToken", null);
          this.$store.commit("setMember", null);
          this.$router.push("/login");
        });
    } else {
      this.$router.push("/login");
    }
  },
  components: {
    NavBar,
  },
};
</script>


<style lang="scss">
.screen-center {
  display: block;
  position: fixed;
  z-index: 1031; /* High z-index so it is on top of the page */
  top: 50%;
  right: 50%; /* or: left: 50%; */
}
</style>
