<template>
  <div class="container">
    <div class="w-50 rounded bg-dark m-auto p-3 mt-5 text-light text-center">
      <h1>Create account</h1>
      <form @submit.prevent="validation" class="w-75 m-auto mt-5">
        <div class="mt-2">
          <input
            class="form-control"
            type="text"
            placeholder="Full name"
            v-model="fullname"
            required
          />
        </div>
        <div class="mt-2">
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
        <div class="mt-2">
          <input
            class="form-control"
            type="password"
            placeholder="Confirm password"
            v-model="confirmPwd"
            required
          />
        </div>
        <div class="mt-4 text-center">
          <button class="btn btn-danger" :disabled="password != confirmPwd">
            Create Account
          </button>
          <p class="mt-5">
            You already have an account?
            <router-link to="login" class="text-danger">Login now!</router-link>
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
      fullname: "",
      email: "",
      password: "",
      confirmPwd: "",
    };
  },
  methods: {
    validation() {
      this.$api
        .post("members", {
          fullname: this.fullname,
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          //Show success alert
          this.flashMessage.show({
            status: "success",
            title: "Account created successfully",
            message:
              "Greate news! Account created successfully! you can log in now",
          });

          //Redirect to login
          this.$router.push("/login");
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