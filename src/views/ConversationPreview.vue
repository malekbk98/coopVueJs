<template>
  <div class="container">
    <div v-if="!conversation || conversation.length == 0" class="screen-center">
      <div class="spinner-border text-danger" role="status">
        <span class="sr-only"></span>
      </div>
    </div>
    <div v-else>
      <div class="row">
        <div class="col-8 m-auto">
          <h3 class="text-muted">{{ conversation.topic }}</h3>
        </div>
        <div class="col-4 m-auto">
          <div class="btn-group m-2" role="group">
            <button
              class="btn btn-sm btn-danger"
              v-b-modal.editConvModal
              @click="openEditConvModal()"
            >
              Edit Conversation
            </button>
            <button class="btn btn-sm btn-secondary" @click="deleteConv()">
              Delete Conversation
            </button>
          </div>
          <button
            class="btn btn-sm btn-dark"
            @click="getConversationMessages()"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-arrow-repeat"
              viewBox="0 0 16 16"
            >
              <path
                d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"
              />
              <path
                fill-rule="evenodd"
                d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"
              />
            </svg>
          </button>
        </div>
      </div>
      <h5 class="mt-3">{{ conversation.label }}</h5>
      <div class="row mt-4">
        <div class="col-sm-12 mb-3" v-for="m in messages" :key="m.id">
          <div class="card bg-dark text-light">
            <router-link :to="'/members/' + m.member_id">
              <h5 class="card-header bg-danger text-light">
                {{ getMemberName(m.member_id) }}
              </h5>
            </router-link>
            <div class="card-body">
              <div class="row">
                <p class="text-muted col-10">Sent {{ m.created_at }}</p>
                <div
                  class="btn-group col-2"
                  v-if="m.member_id == $store.state.member.id"
                  role="group"
                >
                  <button
                    class="btn btn-secondary"
                    @click="
                      editMsg = m.message;
                      editMsgId = m.id;
                    "
                    v-b-modal.editMsgModal
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-pencil-square"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                      />
                    </svg>
                  </button>
                  <button class="btn btn-danger" @click="deleteMessage(m.id)">
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
                <p class="card-text" v-html="m.message"></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Add Message -->
      <AddMsg />

      <!-- Edit message modal -->
      <b-modal id="editMsgModal" title="Edit a message" hide-footer>
        <form>
          <div class="mt-2">
            <label>Message</label>
            <textarea
              class="form-control"
              placeholder="Message"
              v-model="editMsg"
              required
            >
            </textarea>
          </div>
          <div class="mt-2">
            <button
              type="button"
              :disabled="!editMsg"
              class="btn btn-danger"
              @click="editMessage()"
            >
              Update
            </button>
          </div>
        </form>
      </b-modal>

      <!-- Edit conversation modal -->
      <b-modal id="editConvModal" title="Edit conversation" hide-footer>
        <form>
          <div>
            <label>Subject</label>
            <input
              class="form-control"
              type="text"
              placeholder="Subject"
              v-model="editTopic"
              required
            />
          </div>
          <div class="mt-2">
            <label>Tags</label>
            <input
              class="form-control"
              type="text"
              placeholder="Tags"
              v-model="editLabel"
              required
            />
          </div>
          <div class="mt-2">
            <button
              type="button"
              :disabled="!editLabel || !editTopic"
              class="btn btn-danger"
              @click="editConv()"
            >
              Update
            </button>
          </div>
        </form>
      </b-modal>
    </div>
    <!--Flash message (alert) -->
    <FlashMessage></FlashMessage>
  </div>
</template>

<script>
import EmptyCom from "../components/EmptyCom.vue";
import AddMsg from "../components/AddMsg.vue";

export default {
  data() {
    return {
      conversation: null,
      members: null,
      messages: [],
      message: "",
      editMsg: "",
      editMsgId: "",
      editTopic: "",
      editLabel: "",
    };
  },
  methods: {
    //Get conversation by id
    getConversationById() {
      this.$api
        .get(`channels/${this.$route.params.id}`)
        .then((response) => {
          this.conversation = response.data;
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

    //Delete conversation by id
    deleteConv() {
      this.$api
        .delete(`channels/${this.$route.params.id}`)
        .then((response) => {
          //return home
          this.$router.push("/");

          //Show success alert
          this.flashMessage.show({
            status: "success",
            title: "Conversation deleted",
            message: "Greate news! this conversation was deleted!",
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

    //Get conversation messages
    getConversationMessages() {
      this.$api
        .get(`channels/${this.$route.params.id}/posts`)
        .then((response) => {
          this.messages = response.data;
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

    //Delete a message
    deleteMessage(id) {
      this.$api
        .delete(`channels/${this.$route.params.id}/posts/${id}`)
        .then((response) => {
          //Show success alert
          this.flashMessage.show({
            status: "success",
            title: "Message deleted",
            message: "Greate news! your message was deleted!",
          });

          //Refresh messages
          this.getConversationMessages();
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

    //Edit a message
    editMessage() {
      this.$api
        .put(`channels/${this.$route.params.id}/posts/${this.editMsgId}`, {
          message: this.editMsg,
        })
        .then((response) => {
          this.editMsgId = "";
          this.editMsg = "";

          //Hide modal
          this.$bvModal.hide("editMsgModal");

          //Show success alert
          this.flashMessage.show({
            status: "success",
            title: "Message edited",
            message: "Greate news! your message was edited!",
          });

          //Refresh messages
          this.getConversationMessages();
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

    //Open edit conversation modal
    openEditConvModal() {
      this.editTopic = this.conversation.topic;
      this.editLabel = this.conversation.label;
    },

    //Edit conversation
    editConv() {
      this.$api
        .put(`channels/${this.$route.params.id}`, {
          topic: this.editTopic,
          label: this.editLabel,
        })
        .then((response) => {
          this.editMsgId = "";
          this.editMsg = "";

          //Show success alert
          this.flashMessage.show({
            status: "success",
            title: "Conversation edited",
            message: "Greate news! your conversation was edited!",
          });

          //Refresh conversation
          this.getConversationById();

          //Hide modal
          this.$bvModal.hide("editConvModal");
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

    //Get member name by id
    getMemberName(id) {
      if (this.members) {
        return this.members.filter((obj) => {
          return obj.id === id;
        })[0].fullname;
      }
    },
  },

  mounted() {
    //Get conversation messages after adding new message
    this.$bus.$on("messageAdded", (msg) => {
      this.getConversationMessages();
    });

    //Get conversation by id
    this.getConversationById();

    //Get conversation messages
    this.getConversationMessages();

    //Get all members (to display member name next to message)
    this.getMembers();
  },

  components: {
    EmptyCom,
    AddMsg,
  },
};
</script>

<style lang="scss">
a {
  text-decoration: none;
  color: black;
}
</style>