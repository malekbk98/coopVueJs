<template>
  <div class="container">
    <div v-if="members.length == 0" class="screen-center">
      <div class="spinner-border text-danger" role="status">
        <span class="sr-only"></span>
      </div>
    </div>
    <div v-else>
      <h1 class="mt-3">Members</h1>
      <div class="row mt-5">
        <div class="col-sm-3 mb-3" v-for="m in members" :key="m.id">
          <div class="card">
            <div class="card-body text-center bg-dark text-light">
              <img :src="avatar(m)" />

              <h5 class="card-title">
                {{ m.fullname }}
              </h5>
              <p class="card-text">
                {{ m.email }}
              </p>
              <router-link
                :to="'/members/' + m.id"
                class="btn btn-danger btn-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-person-badge-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm4.5 0a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zM8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm5 2.755C12.146 12.825 10.623 12 8 12s-4.146.826-5 1.755V14a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-.245z"
                  />
                </svg>
              </router-link>
              <button
                class="btn btn-danger btn-sm m-2"
                @click="deleteMember(m.id)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-trash-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--Flash message (alert) -->
    <FlashMessage></FlashMessage>
  </div>
</template>

<script>
export default {
  data() {
    return {
      members: [],
      subject: "",
      tags: "",
    };
  },
  methods: {
    //Get all members
    getMembers() {
      this.$api
        .get("members")
        .then((response) => {
          this.members = response.data;
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

    //delete Member
    deleteMember(id) {
      this.$api
        .delete(`members/${id}`)
        .then((response) => {
          //Refresh members list
          this.getMembers();

          //Show success alert
          this.flashMessage.show({
            status: "success",
            title: "Member deleted",
            message: "Greate news! member deleted successfully",
          });

          //Refresh messages
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

  mounted() {
    //Call function to get all members after loading
    this.getMembers();
  },
};
</script>

<style lang="scss">
a {
  text-decoration: none;
  color: black;
}
</style>