<template>
  <div class="container">
    <div class="w-50 rounded bg-dark m-auto p-3 mt-5 text-light text-center">
      <h1>Login</h1>
      <form @submit.prevent="validation" class="w-75 m-auto mt-5">
        <div>
          <input
            class="form-control"
            type="email"
            placeholder="Email"
            v-model="email"
            required
          />
        </div>
        <div class="mt-2">
          <input
            class="form-control"
            type="password"
            placeholder="Password"
            v-model="password"
            required
          />
        </div>
        <div class="mt-4 text-center">
          <button class="btn btn-danger">Login</button>
          <p class="mt-5">
            You don't have an account?
            <router-link to="signup" class="text-danger"
              >Create now!</router-link
            >
          </p>
        </div>
      </form>
    </div>
    <!--Flash message (alert) -->
    <FlashMessage></FlashMessage>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    validation() {
      this.$api
        .post("members/signin", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          this.$store.commit("setToken", response.data.token);
          this.$store.commit("setMember", response.data.member);
          this.$router.push("/");

          //Show success alert
          this.flashMessage.show({
            status: "success",
            title: "Hi there",
            message: "Welcome back :)",
          });
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

<style lang="scss">
</style>