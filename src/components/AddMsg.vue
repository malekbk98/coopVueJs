<template>
  <form>
    <div class="mt-2">
      <textarea
        class="form-control"
        placeholder="Add new message"
        v-model="message"
        required
      >
      </textarea>
    </div>
    <div class="mt-2">
      <button
        type="button"
        :disabled="!message"
        class="btn btn-danger"
        @click="addMessage"
      >
        Send
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-send"
          viewBox="0 0 16 16"
        >
          <path
            d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"
          />
        </svg>
      </button>
    </div>
  </form>
</template>
      
<script>
export default {
  name: "AddMsg",
  data() {
    return {
      message: "",
    };
  },
  methods: {
    //Add a message
    addMessage() {
      this.$api
        .post(`channels/${this.$route.params.id}/posts`, {
          message: this.message,
          member_id: this.$store.state.member,
        })
        .then((response) => {
          this.message = "";
          this.$bus.$emit("messageAdded");

          //Show success alert
          this.flashMessage.show({
            status: "success",
            title: "Message added",
            message: "Greate news! your message is added successfully!",
          });
        })
        .catch((error) => {
          //Show error alert
          this.flashMessage.show({
            status: "error",
            title: "Something went wrong :(",
            message: error.response,
          });
        });
    },
  },
};
</script>
