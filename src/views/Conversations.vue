<template>
  <div class="container">
    <div v-if="conversations.length == 0" class="screen-center">
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

      <div class="row mt-2">
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