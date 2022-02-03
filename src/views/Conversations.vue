<template>
  <div class="container">
    <div v-if="!conversations" class="screen-center">
      <div class="spinner-border text-danger" role="status">
        <span class="sr-only"></span>
      </div>
    </div>
    <div v-else>
      <div class="row">
        <div class="col-9 m-auto">
          <h1>Conversations</h1>
        </div>
        <div class="col-3 m-auto">
          <button class="btn btn-secondary pull-right" v-b-modal.addModal>
            Add a conversation
          </button>
        </div>
      </div>

      <div class="row mt-2" v-if="conversations.length > 0">
        <div class="col-sm-3" v-for="c in conversations" :key="c.id">
          <div class="card">
            <div class="card-body text-center bg-dark text-light">
              <h5 class="card-title">
                {{ c.topic }}
              </h5>
              <p class="card-text">
                {{ c.label }}
              </p>
              <router-link :to="'/conversation/' + c.id" class="btn btn-danger">
                Check messages</router-link
              >
            </div>
          </div>
        </div>
      </div>

      <!--No conversations found-->
      <template v-else>
        <div class="text-center text-danger mt-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="70"
            height="70"
            fill="currentColor"
            class="bi bi-inbox-fill"
            viewBox="0 0 16 16"
          >
            <path
              d="M4.98 4a.5.5 0 0 0-.39.188L1.54 8H6a.5.5 0 0 1 .5.5 1.5 1.5 0 1 0 3 0A.5.5 0 0 1 10 8h4.46l-3.05-3.812A.5.5 0 0 0 11.02 4H4.98zm-1.17-.437A1.5 1.5 0 0 1 4.98 3h6.04a1.5 1.5 0 0 1 1.17.563l3.7 4.625a.5.5 0 0 1 .106.374l-.39 3.124A1.5 1.5 0 0 1 14.117 13H1.883a1.5 1.5 0 0 1-1.489-1.314l-.39-3.124a.5.5 0 0 1 .106-.374l3.7-4.625z"
            />
          </svg>
          <p class="text-muted">No conversations found</p>
        </div>
      </template>

      <!-- Modal -->
      <b-modal id="addModal" title="Add a new conversation" hide-footer>
        <form>
          <div>
            <label>Subject</label>
            <input
              class="form-control"
              type="text"
              placeholder="Subject"
              v-model="subject"
              required
            />
          </div>
          <div class="mt-2">
            <label>Tags</label>
            <input
              class="form-control"
              type="text"
              placeholder="Tags"
              v-model="tags"
              required
            />
          </div>
          <div class="mt-2 text-right">
            <button class="btn btn-danger" @click="addConversation">Add</button>
          </div>
        </form>
      </b-modal>
    </div>

    <!--Flash message (alert) -->
    <FlashMessage></FlashMessage>
  </div>
</template>

<script>
export default {
  data() {
    return {
      conversations: [],
      subject: "",
      tags: "",
    };
  },
  methods: {
    //Add a conversation
    addConversation() {
      this.$api
        .post("channels", {
          topic: this.subject,
          label: this.tags,
        })
        .then((response) => {
          //Refresh conversations
          this.getConversations();

          //Hide modal
          this.$bvModal.hide("addModal");

          //Show success alert
          this.flashMessage.show({
            status: "success",
            title: "Conversation added",
            message: "Greate news! your new conversation added!",
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

    //Get all conversations
    getConversations() {
      this.$api
        .get("channels")
        .then((response) => {
          console.log("All Conversations loaded!");
          this.conversations = response.data;
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
  },

  mounted() {
    //Call function to get all conversation after loading
    this.getConversations();
  },
};
</script>

<style lang="scss">
a {
  text-decoration: none;
  color: black;
}
</style>