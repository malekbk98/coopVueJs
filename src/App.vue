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
    if (!this.$store.state.token) {
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
