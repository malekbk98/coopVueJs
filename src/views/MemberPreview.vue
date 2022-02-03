<template>
  <div class="container">
    <div v-if="!member || !messages" class="screen-center">
      <div class="spinner-border text-danger" role="status">
        <span class="sr-only"></span>
      </div>
    </div>
    <div v-else>
      <div
        class="text-center mt-3 bg-danger text-light w-50 m-auto p-3 rounded"
      >
        <img :src="avatar(member[0])" />
        <h1>{{ member[0].fullname }}</h1>
        <h5 class="text-dark">{{ member[0].email }}</h5>
        <p class="text-dark">Joined: {{ member[0].created_at }}</p>
      </div>
      <div class="row mt-4">
        <h1>Messages</h1>

        <!--Display found messages-->
        <template v-if="messages[0] && messages[0].length > 0">
          <div class="col-sm-12 mb-3" v-for="m in messages[0]" :key="m.id">
            <div class="card bg-dark text-light">
              <router-link :to="'/conversation/' + m.channel_id">
                <h5 class="card-header bg-danger text-light">
                  Conversation: {{ getConversationName(m.channel_id) }}
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
                      v-b-modal.editModal
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
        </template>

        <!--No messages found-->
        <EmptyCom v-else msg="messages" />
      </div>

      <!-- Modal -->
      <b-modal id="editModal" title="Edit a message" hide-footer>
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
            <button class="btn btn-danger" @click="editMessage()">
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
export default {
  data() {
    return {
      member: null,
      messages: [],
      conversations: null,
      editMsg: "",
      editMsgId: "",
    };
  },
  methods: {
    //Get member by id
    getMemberById() {
      this.$api
        .get(`members`)
        .then((response) => {
          this.member = response.data.filter((obj) => {
            return obj.id === this.$route.params.id;
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
          this.conversations = response.data;
          //Get conversation messages
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

    //Get conversation messages
    getConversationMessages() {
      this.messages = [];
      //Loop all conversations
      this.conversations.forEach((conv) => {
        //Get message of current conversation
        this.$api
          .get(`channels/${conv.id}/posts`)
          .then((response) => {
            //Filter result messages (get messages where member_id equal to memeber id)
            this.messages.push(
              response.data.filter((obj) => {
                return obj.member_id === this.$route.params.id;
              })
            );
          })
          .catch((error) => {
            //Show error alert
            this.flashMessage.show({
              status: "error",
              title: "Something went wrong :(",
              message: error.response.data.message,
            });
          });
      });
    },

    //Get conversation name by id
    getConversationName(id) {
      return this.conversations.filter((obj) => {
        return obj.id === id;
      })[0].topic;
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
          //Show success alert
          this.flashMessage.show({
            status: "success",
            title: "Message edited",
            message: "Greate news! your message was edited!",
          });

          //Refresh messages
          this.getConversationMessages();

          this.editMsgId = "";
          this.editMsg = "";

          //Hide modal
          this.$bvModal.hide("editModal");
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
    //Get member by id
    this.getMemberById();

    //Get all conversations
    this.getConversations();
  },
  components: {
    EmptyCom,
  },
};
</script>
